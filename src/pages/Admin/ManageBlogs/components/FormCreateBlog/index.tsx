import { useState, useRef } from 'react'
import TiptapEditor from '@/components/Tiptap'
import { Button, Input, Form, Modal, message } from 'antd'
const FormCreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false)
  const editorRef = useRef<{ getHTML: () => string } | null>(null)

  const handleSave = async () => {
    try {
      const content = editorRef.current ? editorRef.current.getHTML() : ''
      console.log(content)
      message.success('Blog post saved successfully')
    } catch (error) {
      message.error('Error saving blog post')
      console.error('Error saving blog post:', error)
    }
  }

  const handlePreview = () => {
    setPreviewVisible(true)
  }

  return (
    <>
      <Form>
        <Form.Item label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <TiptapEditor ref={editorRef} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSave}>
            Save Blog
          </Button>
          <Button type="default" onClick={handlePreview} style={{ marginLeft: '10px' }}>
            Preview Blog
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Preview Blog"
        visible={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
      >
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: editorRef.current?.getHTML() || '' }} />
      </Modal>
    </>
  )
}

export default FormCreateBlog