import { useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Input, Form, Modal, message, Typography, InputNumber, DatePicker, Upload } from 'antd'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import TiptapEditor from '@/components/Tiptap'
import { useCreateBlog } from './hooks/useCreateBlog'
import { s3Service } from '@/services/s3.service'
import dayjs from 'dayjs'

const { Title, Paragraph } = Typography

const schema = yup.object({
  heading: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  feature_image_url: yup.string().required('Feature image URL is required'),
  week: yup.number().required('Week is required').min(1).max(42),
  published_date: yup.date().required('Published date is required')
})

// Interface to match the required payload
interface ICreateBlogPayload {
  heading: string;
  content: {}; // Using Record<string, any> for the JSON object
  description: string;
  feature_image_url: string;
  week: number;
  published_date: number; // timestamp in seconds
}

const FormCreateBlog = () => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [featureImageUrl, setFeatureImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const editorRef = useRef<{ getHTML: () => string, getImages: () => string, getJSON: () => any } | null>(null)

  // Use the hook at the component level
  const { mutate: createBlog, isPending: isCreatingBlog } = useCreateBlog();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      published_date: new Date(), // Set default to today
      week: 1
    }
  })

  const title = watch('heading')
  const description = watch('description')

  // Handle feature image upload
  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      
      const response = await s3Service.uploadImage(file);
      const imageUrl = response.data.url;
      
      setFeatureImageUrl(imageUrl);
      setValue('feature_image_url', imageUrl); // Update the form value
      
      message.success('Feature image uploaded successfully');
      return imageUrl;
    } catch (error) {
      message.error('Failed to upload feature image');
      console.error('Error uploading image:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // ✅ Save blog
  const handleSave = async (data: any) => {
    try {
      const contentJSON = editorRef.current?.getJSON() || {}
      
      // Get timestamp in seconds for published_date
      const publishedTimestamp = Math.floor(new Date(data.published_date).getTime() / 1000);
      
      // Create payload according to interface
      const payload: ICreateBlogPayload = {
        heading: data.heading,
        content: contentJSON,
        description: data.description,
        feature_image_url: data.feature_image_url || featureImageUrl,
        week: Number(data.week),
        published_date: publishedTimestamp
      }
      
      // Call the createBlog mutation (from the hook)
      createBlog(payload, {
        onSuccess: () => {
          message.success('Blog post saved successfully');
        },
        onError: (error) => {
          message.error('Error saving blog post');
          console.error('Error saving blog post:', error);
        }
      });
      
    } catch (error) {
      message.error('Error preparing blog data');
      console.error('Error in handleSave:', error);
    }
  }

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(handleSave)}>
        {/* ✅ Title */}
        <Form.Item label="Title" validateStatus={errors.heading ? 'error' : ''} help={errors.heading?.message}>
          <Controller
            name="heading"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Enter blog title" />}
          />
        </Form.Item>

        {/* ✅ Week */}
        <Form.Item label="Pregnancy Week" validateStatus={errors.week ? 'error' : ''} help={errors.week?.message}>
          <Controller
            name="week"
            control={control}
            render={({ field }) => <InputNumber min={1} max={42} style={{ width: '100%' }} {...field} />}
          />
        </Form.Item>

        {/* ✅ Published Date */}
        <Form.Item label="Published Date" validateStatus={errors.published_date ? 'error' : ''} help={errors.published_date?.message}>
          <Controller
            name="published_date"
            control={control}
            render={({ field }) => (
              <DatePicker 
                style={{ width: '100%' }} 
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toDate() : null)}
              />
            )}
          />
        </Form.Item>

        {/* ✅ Feature Image */}
        <Form.Item label="Feature Image" validateStatus={errors.feature_image_url ? 'error' : ''} help={errors.feature_image_url?.message}>
          <div style={{ marginBottom: '10px' }}>
            <Upload
              beforeUpload={(file) => {
                handleImageUpload(file);
                return false; // Prevent auto upload
              }}
              showUploadList={false}
              disabled={uploading}
            >
              <Button icon={uploading ? <LoadingOutlined /> : <UploadOutlined />} loading={uploading}>
                Upload Feature Image
              </Button>
            </Upload>
          </div>
          
          <Controller
            name="feature_image_url"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Or enter image URL manually" 
                value={field.value || featureImageUrl}
                onChange={(e) => {
                  field.onChange(e);
                  if (!e.target.value) {
                    setFeatureImageUrl('');
                  }
                }}
              />
            )}
          />
          
          {/* Preview uploaded image */}
          {(featureImageUrl || watch('feature_image_url')) && (
            <div style={{ marginTop: '10px' }}>
              <img 
                src={featureImageUrl || watch('feature_image_url')} 
                alt="Feature" 
                style={{ maxWidth: '100%', maxHeight: '200px' }} 
              />
            </div>
          )}
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
            render={({ field }) => <Input.TextArea {...field} placeholder="Enter description" rows={4} />}
          />
        </Form.Item>

        {/* ✅ Tiptap Editor */}
        <Form.Item label="Content">
          <TiptapEditor ref={editorRef} />
        </Form.Item>

        {/* ✅ Buttons */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isCreatingBlog}>
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
        width={800}
      >
        <Title level={2}>{title}</Title>
        <Paragraph>{description}</Paragraph>
        <div style={{ marginBottom: '20px' }}>
          {(featureImageUrl || watch('feature_image_url')) && (
            <img 
              src={featureImageUrl || watch('feature_image_url')} 
              alt="Feature" 
              style={{ maxWidth: '100%' }} 
            />
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: editorRef.current?.getHTML() || '' }} />
      </Modal>
    </>
  )
}

export default FormCreateBlog