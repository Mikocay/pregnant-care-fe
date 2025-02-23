import React, { useState } from 'react'
import { 
  BoldOutlined, ItalicOutlined, StrikethroughOutlined, UnderlineOutlined, 
  LinkOutlined, PictureOutlined, HighlightOutlined, AlignLeftOutlined, 
  AlignCenterOutlined, AlignRightOutlined, DownOutlined, UnorderedListOutlined, 
  UploadOutlined 
} from '@ant-design/icons'
import { Editor } from '@tiptap/react'
import { Dropdown, Menu, Divider, Button, Modal, Input, Upload } from 'antd'
import MenuButton from './MenuButton'

type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface FloatingMenuProps {
  editor: Editor | null;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ editor }) => {
  const [linkModalVisible, setLinkModalVisible] = useState(false)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [link, setLink] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  if (!editor) {
    return null
  }

  const headingMenu = (
    <Menu onClick={({ key }) => editor.chain().focus().toggleHeading({ level: parseInt(key) as Level }).run()}>
      <Menu.Item key="1">Heading 1</Menu.Item>
      <Menu.Item key="2">Heading 2</Menu.Item>
      <Menu.Item key="3">Heading 3</Menu.Item>
      <Menu.Item key="4">Heading 4</Menu.Item>
      <Menu.Item key="5">Heading 5</Menu.Item>
      <Menu.Item key="6">Heading 6</Menu.Item>
    </Menu>
  )

  const handleLinkOk = () => {
    editor.chain().focus().setLink({ href: link }).run()
    setLinkModalVisible(false)
    setLink('')
  }

  const handleImageOk = () => {
    editor.chain().focus().setImage({ src: imageUrl }).run()
    setImageModalVisible(false)
    setImageUrl('')
  }

  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
      <Dropdown overlay={headingMenu}>
        <Button>
          Headings <DownOutlined />
        </Button>
      </Dropdown>
      <Divider type="vertical" />
      <MenuButton
        tooltipTitle='Bullet Lists'
        icon={<UnorderedListOutlined />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        type={editor.isActive('bulletList') ? 'primary' : 'default'} tooltipProps={{}} />

      <MenuButton
        tooltipTitle="Bold"
        icon={<BoldOutlined />}
        onClick={() => editor.chain().focus().toggleBold().run()}
        type={editor.isActive('bold') ? 'primary' : 'default'} tooltipProps={{}} />
      <MenuButton
        tooltipTitle="Italic"
        icon={<ItalicOutlined />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type={editor.isActive('italic') ? 'primary' : 'default'} tooltipProps={{}} />
      <MenuButton
        tooltipTitle="Strikethrough"
        icon={<StrikethroughOutlined />}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        type={editor.isActive('strike') ? 'primary' : 'default'} tooltipProps={{}} />
      <MenuButton
        tooltipTitle="Underline"
        icon={<UnderlineOutlined />}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        type={editor.isActive('underline') ? 'primary' : 'default'} tooltipProps={{}} />
      <MenuButton
        tooltipTitle="Highlight"
        icon={<HighlightOutlined />}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        type={editor.isActive('highlight') ? 'primary' : 'default'} tooltipProps={{}} />
      <Divider type="vertical" />
      <MenuButton
        tooltipTitle="Align Left"
        icon={<AlignLeftOutlined />}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        type={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'} tooltipProps={{}} />
      <MenuButton
        tooltipTitle="Align Center"
        icon={<AlignCenterOutlined />}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        type={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'} tooltipProps={{}} />
      <MenuButton
        tooltipTitle="Align Right"
        icon={<AlignRightOutlined />}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        type={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'} tooltipProps={{}} />
      <Divider type="vertical" />
      <MenuButton
        tooltipTitle="Link"
        icon={<LinkOutlined />}
        onClick={() => setLinkModalVisible(true)}
        type={editor.isActive('link') ? 'primary' : 'default'} tooltipProps={{}} />
      <MenuButton
        tooltipTitle="Image"
        icon={<PictureOutlined />}
        onClick={() => setImageModalVisible(true)} tooltipProps={{}} />

      {/* Link Modal */}
      <Modal
        title="Insert Link"
        visible={linkModalVisible}
        onOk={handleLinkOk}
        onCancel={() => setLinkModalVisible(false)}
      >
        <Input
          placeholder="Enter URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </Modal>

      {/* Image Modal */}
      <Modal
        title="Insert Image"
        visible={imageModalVisible}
        onOk={handleImageOk}
        onCancel={() => setImageModalVisible(false)}
      >
        <Upload
          beforeUpload={(file) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              setImageUrl(e.target?.result as string)
            }
            reader.readAsDataURL(file)
            return false
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            style={{ 
              marginTop: '10px', 
              maxWidth: '100%', 
              maxHeight: '200px', // Limit height
              width: 'auto', 
              height: 'auto',
              display: 'block', 
              marginLeft: 'auto', 
              marginRight: 'auto'
            }} 
          />
        )}
      </Modal>
    </div>
  )
}

export default FloatingMenu
