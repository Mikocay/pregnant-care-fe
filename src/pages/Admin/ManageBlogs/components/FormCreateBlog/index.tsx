import { useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Input, Form, Modal, message, Typography } from 'antd'
import TiptapEditor from '@/components/Tiptap'

const { Title, Paragraph } = Typography

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
})

const FormCreateBlog = () => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const editorRef = useRef<{ getHTML: () => string,  getImages: () => string} | null>(null)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const title = watch('title')
  const description = watch('description')

  // ✅ Lưu blog
  const handleSave = async (data: any) => {
    try {
      const content = editorRef.current?.getHTML() || ''
      console.log({ ...data, content })
      const imageMetadataJSON = editorRef.current?.getImages()
      console.log('Image metadata:', imageMetadataJSON)
    
      // Get just the image types
    //   const imageTypes = editorRef.current.getImageTypes()
    // console.log('Image types:', imageTypes)
      message.success('Blog post saved successfully')
    } catch (error) {
      message.error('Error saving blog post')
      console.error('Error saving blog post:', error)
    }
  }

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(handleSave)}>
        {/* ✅ Title */}
        <Form.Item label="Title" validateStatus={errors.title ? 'error' : ''} help={errors.title?.message}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Enter blog title" />}
          />
        </Form.Item>

        {/* ✅ Description */}
        <Form.Item
          label="Description"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea {...field} placeholder="Enter description" />}
          />
        </Form.Item>

        {/* ✅ Tiptap Editor */}
        <Form.Item label="Content">
          <TiptapEditor ref={editorRef} />
        </Form.Item>

        {/* ✅ Buttons */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Blog
          </Button>
          <Button type="default" onClick={() => setPreviewVisible(true)} style={{ marginLeft: '10px' }}>
            Preview Blog
          </Button>
        </Form.Item>
      </Form>

      {/* ✅ Preview Modal */}
      <Modal
        title="Preview Blog"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
      >
        <Title level={2}>{title}</Title>
        <Paragraph>{description}</Paragraph>
        <Paragraph>
          <div dangerouslySetInnerHTML={{ __html: editorRef.current?.getHTML() || '' }} />
        </Paragraph>
      </Modal>
    </>
  )
}

export default FormCreateBlog
