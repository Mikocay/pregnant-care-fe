import {
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import ImageExtension from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import FileHandler from '@tiptap-pro/extension-file-handler';
import FloatingMenu from './components/FloatingMenu';
import { Card, message } from 'antd';
import BulletList from '@tiptap/extension-bullet-list';
import { s3Service } from '@/services/s3.service';

// Add these CSS styles to ensure images are visible
const editorStyles = `
  .ProseMirror {
    min-height: 200px;
  }
  
  .ProseMirror img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 10px 0;
    border-radius: 4px;
  }
  
  .ProseMirror .image-loading {
    opacity: 0.7;
    filter: blur(2px);
  }
`;

interface ImageMetaData {
  id: string;
  type: string;
  url: string;
  s3Url?: string;
  file: File;
}

const TiptapEditor = forwardRef((_props, ref) => {
  const [imageMetadata, setImageMetadata] = useState<ImageMetaData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [debug, setDebug] = useState<{ url: string; loaded: boolean }[]>([]);

  // Debug function to check if images are loading
  const testImageUrl = useCallback((url: string | undefined) => {
    // Check if URL is valid before trying to load it
    if (!url) {
      console.error('❌ Cannot test undefined URL');
      setDebug((prev) => [...prev, { url: '', loaded: false }]);
      return;
    }

    const img = new window.Image();
    img.onload = () => {
      console.log(`✅ Image loaded successfully: ${url}`);
      setDebug((prev) => [...prev, { url, loaded: true }]);
    };
    img.onerror = (e) => {
      console.error(`❌ Image failed to load: ${url}`, e);
      setDebug((prev) => [...prev, { url, loaded: false }]);
    };
    img.src = url;
  }, []);

  const handleImageUpload = useCallback(
    async (file: File, tempUrl: string, id: string) => {
      try {
        setIsUploading(true);

        // Upload the file to S3
        const response = await s3Service.uploadImage(file);
        const s3Url = response.data.url;
        // Store metadata
        setImageMetadata((prevMetaData) => [
          ...prevMetaData,
          {
            id: id,
            type: file.type,
            url: tempUrl,
            s3Url: s3Url,
            file: file,
          },
        ]);

        return s3Url;
      } catch (error) {
        console.error('Error uploading image:', error);
        message.error('Failed to upload image to storage');
        return tempUrl;
      } finally {
        setIsUploading(false);
      }
    },
    [testImageUrl],
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link,
      Image.configure({
        inline: false, // Changed to block display
        allowBase64: true,
        HTMLAttributes: {
          // Add default attributes for all images
          class: 'tiptap-image',
          loading: 'lazy',
        },
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'tiptap-image',
          loading: 'lazy',
        },
      }),
      Highlight,
      Underline,
      BulletList,
      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp',
        ],
        onDrop: async (currentEditor, files, pos) => {
          setIsUploading(true);
          for (const file of files) {
            try {
              const reader = new FileReader();
              reader.readAsDataURL(file);

              const dataUrlPromise = new Promise<string>((resolve) => {
                reader.onload = () => resolve(reader.result as string);
              });

              const dataUrl = await dataUrlPromise;
              const imageId = `img-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 9)}`;

              // Insert with a special class for styling during upload
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: dataUrl,
                    alt: `Image ${imageId} (uploading...)`,
                    class: 'image-loading tiptap-image',
                  },
                })
                .focus()
                .run();

              // Upload to S3
              const response = await s3Service.uploadImage(file);
              const s3Url = response.data.url;

              testImageUrl(s3Url);

              // Use HTML insertion as a fallback if direct DOM manipulation doesn't work
              const tempHtml = currentEditor.getHTML();
              const updatedHtml = tempHtml.replace(
                new RegExp(
                  `src="${dataUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
                  'g',
                ),
                `src="${s3Url}"`,
              );

              currentEditor.commands.setContent(updatedHtml);

              // Store metadata
              setImageMetadata((prevMetaData) => [
                ...prevMetaData,
                {
                  id: imageId,
                  type: file.type,
                  url: dataUrl,
                  s3Url: s3Url,
                  file: file,
                },
              ]);
            } catch (error) {
              console.error('Error uploading image:', error);
              message.error('Failed to upload image to storage');
            }
          }
          setIsUploading(false);
        },
        onPaste: async (currentEditor, files) => {
          // Similar implementation as onDrop with the HTML replacement strategy
          setIsUploading(true);
          for (const file of files) {
            try {
              const reader = new FileReader();
              reader.readAsDataURL(file);

              const dataUrlPromise = new Promise<string>((resolve) => {
                reader.onload = () => resolve(reader.result as string);
              });

              const dataUrl = await dataUrlPromise;
              const imageId = `img-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 9)}`;

              currentEditor
                .chain()
                .focus()
                .insertContent({
                  type: 'image',
                  attrs: {
                    src: dataUrl,
                    alt: `Image ${imageId} (uploading...)`,
                    class: 'image-loading tiptap-image',
                  },
                })
                .run();

              const response = await s3Service.uploadImage(file);
              const s3Url = response.data.url;

              testImageUrl(s3Url);

              // Use HTML replacement approach
              const tempHtml = currentEditor.getHTML();
              const updatedHtml = tempHtml.replace(
                new RegExp(
                  `src="${dataUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
                  'g',
                ),
                `src="${s3Url}"`,
              );

              currentEditor.commands.setContent(updatedHtml);

              setImageMetadata((prevMetaData) => [
                ...prevMetaData,
                {
                  id: imageId,
                  type: file.type,
                  url: dataUrl,
                  s3Url: s3Url,
                  file: file,
                },
              ]);
            } catch (error) {
              console.error('Error uploading image:', error);
              message.error('Failed to upload image to storage');
            }
          }
          setIsUploading(false);
        },
      }),
    ],
    content: `<p></p>`,
  });

  useImperativeHandle(
    ref,
    () => ({
      getHTML: () => editor?.getHTML(),
      getJSON: () => editor?.getJSON(),
      getImageFiles: () => imageMetadata.map((img) => img.file),
      getImages: () => imageMetadata,
      getImageTypes: () => imageMetadata.map((img) => img.type),
      isUploading: () => isUploading,
    }),
    [editor, imageMetadata, isUploading],
  );

  if (!editor) {
    return null;
  }

  return (
    <Card
      title={
        <FloatingMenu
          editor={editor}
          onImageUpload={handleImageUpload}
          isUploading={isUploading}
        />
      }
      style={{ width: '100%', height: '100%' }}
    >
      <style>{editorStyles}</style>
      <EditorContent editor={editor} style={{ outline: 'none' }} />
    </Card>
  );
});

export default TiptapEditor;
