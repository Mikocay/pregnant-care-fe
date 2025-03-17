import { useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import FileHandler from '@tiptap-pro/extension-file-handler'
import FloatingMenu from './components/FloatingMenu'
import { Card, message } from 'antd'
import BulletList from '@tiptap/extension-bullet-list'
import { s3Service } from '@/services/s3.service'
import { getFileBinaryString } from '@/utils/bin'

interface ImageMetaData {
  id: string;
  type: string;
  url: string;
  s3Url?: string;
  file: File; // Store the original file object
}

const TiptapEditor = forwardRef((_props, ref) => {
  const [imageMetadata, setImageMetadata] = useState<ImageMetaData[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = useCallback(async (file: File, tempUrl: string, id: string) => {
    try {

      setIsUploading(true);

      // Upload the file to S3 (now using multipart/form-data)
      const response = await s3Service.uploadImage(file);
      const s3Url = response.data.url;

      // Update the image metadata with both the local and S3 URLs
      setImageMetadata(prevMetaData => [
        ...prevMetaData,
        {
          id: id,
          type: file.type,
          url: tempUrl,
          s3Url: s3Url,
          file: file,
        }
      ]);

      // Return the S3 URL so the FloatingMenu can update the image
      return s3Url;
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Failed to upload image to storage');
      return tempUrl; // Fall back to local URL if S3 upload fails
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link,
      Image,
      Highlight,
      Underline,
      BulletList,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: async (currentEditor, files, pos) => {
          setIsUploading(true);
          for (const file of files) {
            try {
              const reader = new FileReader();
              reader.readAsDataURL(file);

              // create a promis to get the data url
              const dataUrlPromise = new Promise<string>((resolve) => {
                reader.onload = () => {
                  resolve(reader.result as string);
                }
              });

              // get the data url
              const dataUrl = await dataUrlPromise;

              // Generate a unique ID for this image
              const imageId = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

              // Insert a temporary image using the data URL
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: dataUrl,
                  alt: `Image ${imageId} (uploading...)`,
                },
              }).focus().run();

              const response = await s3Service.uploadImage(file);
              const s3Url = response.data.url;

              // Find and update the image using Tiptap's commands
              // This replaces the problematic querySelectorAll approach
              currentEditor.chain().focus().command(({ tr, state }) => {
                // Find image with the specific alt text
                let foundPos = -1;
                state.doc.descendants((node, pos) => {
                  if (node.type.name === 'image' && node.attrs.alt === `Image ${imageId} (uploading...)`) {
                    foundPos = pos;
                    return false; // stop searching
                  }
                  return true; // continue searching
                });

                if (foundPos >= 0) {
                  // Update the image attributes
                  tr.setNodeMarkup(foundPos, undefined, {
                    ...state.doc.nodeAt(foundPos)?.attrs,
                    src: s3Url,
                    alt: `Image ${imageId}`
                  });
                  return true;
                }
                return false;
              }).run();

              // Store metadata about this image
              setImageMetadata(prevMetaData => [
                ...prevMetaData,
                {
                  id: imageId,
                  type: file.type,
                  url: dataUrl,
                  s3Url: s3Url,
                  file: file,
                }
              ]);

            } catch (error) {
              console.error('Error uploading image:', error);
              message.error('Failed to upload image to storage');
            }
          }
        },
        onPaste: async (currentEditor, files) => {
          setIsUploading(true);
          for (const file of files) {
            try {
              const reader = new FileReader();
              reader.readAsDataURL(file);

              // Create a promise to get the data URL
              const dataUrlPromise = new Promise<string>((resolve) => {
                reader.onload = () => {
                  resolve(reader.result as string);
                }
              });

              const dataUrl = await dataUrlPromise;
              const imageId = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

              // Insert temporary image
              currentEditor.chain().focus().insertContent({
                type: 'image',
                attrs: {
                  src: dataUrl,
                  alt: `Image ${imageId} (uploading...)`,
                },
              }).run();

              // Upload to S3
              const response = await s3Service.uploadImage(file);
              const s3Url = response.data.url;

              // Update image using proper ProseMirror methods
              currentEditor.chain().focus().command(({ tr, state }) => {
                let foundPos = -1;
                state.doc.descendants((node, pos) => {
                  if (node.type.name === 'image' && node.attrs.alt === `Image ${imageId} (uploading...)`) {
                    foundPos = pos;
                    return false;
                  }
                  return true;
                });

                if (foundPos >= 0) {
                  tr.setNodeMarkup(foundPos, undefined, {
                    ...state.doc.nodeAt(foundPos)?.attrs,
                    src: s3Url,
                    alt: `Image ${imageId}`
                  });
                  return true;
                }
                return false;
              }).run();

              // Store metadata
              setImageMetadata(prevMetaData => [
                ...prevMetaData,
                {
                  id: imageId,
                  type: file.type,
                  url: dataUrl,
                  s3Url: s3Url,
                  file: file,
                }
              ]);
            } catch (error) {
              console.error('Error uploading image:', error);
              message.error('Failed to upload image to storage');
            }
          }
          setIsUploading(false);
        }
      }),
    ],
    content: `<p></p>`,
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML(),
    getImageFiles: () => imageMetadata.map(img => img.file),
    // Get image metadata including files
    getImages: () => imageMetadata,

    getImageTypes: () => imageMetadata.map(img => img.type),
  }), [editor, imageMetadata])

  if (!editor) {
    return null
  }

  return (
    <Card
      title={<FloatingMenu editor={editor} onImageUpload={handleImageUpload} isUploading={isUploading} />}
      style={{ width: '100%', height: '100%' }}
    >
      <EditorContent editor={editor} style={{ outline: 'none' }} />
    </Card>
  )
})

export default TiptapEditor