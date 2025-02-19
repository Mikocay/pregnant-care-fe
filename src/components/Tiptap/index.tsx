import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import { Container, EditorContainer, MenuContainer } from './styles'
import FloatingMenu from './components/FloatingMenu'
import { Card } from 'antd'

const TiptapEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link,
      Image,
      Highlight,
      Underline,
    ],
    content: '<p>This is your placeholder...</p>',
  })

  if (!editor) {
    return null
  }

  return (
    <Card
      title={<FloatingMenu editor={editor} />}
      style={{ width: '100%', height: '100%' }}
    >
        <EditorContent editor={editor} style={{ height: '100%', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }} />
    </Card>
  )
}

export default TiptapEditor