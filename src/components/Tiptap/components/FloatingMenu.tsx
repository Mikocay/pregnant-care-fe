import React from 'react'
import { BoldOutlined, ItalicOutlined, StrikethroughOutlined, UnderlineOutlined, LinkOutlined, PictureOutlined, HighlightOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, DownOutlined } from '@ant-design/icons'
import { Editor } from '@tiptap/react'
import { Tooltip, Button, Dropdown, Menu, Divider } from 'antd'

type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface FloatingMenuProps {
  editor: Editor | null;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ editor }) => {
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

  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
      <Dropdown overlay={headingMenu}>
        <Button>
          Headings <DownOutlined />
        </Button>
      </Dropdown>
      <Divider type="vertical" />
      <Tooltip title="Bold">
        <Button
          icon={<BoldOutlined />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          type={editor.isActive('bold') ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="Italic">
        <Button
          icon={<ItalicOutlined />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type={editor.isActive('italic') ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="Strikethrough">
        <Button
          icon={<StrikethroughOutlined />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          type={editor.isActive('strike') ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="Underline">
        <Button
          icon={<UnderlineOutlined />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          type={editor.isActive('underline') ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="Highlight">
        <Button
          icon={<HighlightOutlined />}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          type={editor.isActive('highlight') ? 'primary' : 'default'}
        />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="Align Left">
        <Button
          icon={<AlignLeftOutlined />}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          type={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="Align Center">
        <Button
          icon={<AlignCenterOutlined />}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          type={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="Align Right">
        <Button
          icon={<AlignRightOutlined />}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          type={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'}
        />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="Link">
        <Button
          icon={<LinkOutlined />}
          onClick={() => editor.chain().focus().setLink({ href: 'https://example.com' }).run()}
          type={editor.isActive('link') ? 'primary' : 'default'}
        />
      </Tooltip>
      <Tooltip title="Image">
        <Button
          icon={<PictureOutlined />}
          onClick={() => editor.chain().focus().setImage({ src: 'https://via.placeholder.com/150' }).run()}
        />
      </Tooltip>
    </div>
  )
}

export default FloatingMenu