import { useImperativeHandle, forwardRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import FileHandler from '@tiptap-pro/extension-file-handler'
import FloatingMenu from './components/FloatingMenu'
import { Card } from 'antd'
import BulletList from '@tiptap/extension-bullet-list'

const TiptapEditor = forwardRef((_props, ref) => {
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
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              // Upload the file to the server and get the URL
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: reader.result,
                },
              }).focus().run()
            }
          });
        },
        onPaste: (currentEditor, files) => {
          files.forEach((file) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              // Upload the file to the server and get the URL
              currentEditor.chain().insertContent({
                type: 'image',
                attrs: {
                  src: reader.result,
                },
              }).focus().run()
            }
          })
        }
      }),
    ],
    content: `
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>`,
  })

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML(),
  }), [editor])

  if (!editor) {
    return null
  }

  return (
    <Card
      title={<FloatingMenu editor={editor} />}
      style={{ width: '100%', height: '100%' }}
    >
      <EditorContent editor={editor} style={{ outline: 'none' }} />
    </Card>
  )
})

export default TiptapEditor