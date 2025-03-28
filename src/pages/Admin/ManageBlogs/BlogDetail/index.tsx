import React from 'react';
import { Button, Skeleton, Tag, Typography, Divider, message } from 'antd';
import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './BlogDetail.module.css';
import { useBlogDetail } from './hooks/useBlogDetail';

const { Title, Text } = Typography;

const BlogDetail: React.FC = () => {
  const { blog, isLoading, error, handleGoBack } = useBlogDetail();

  // Show error message if fetching fails
  React.useEffect(() => {
    if (error) {
      message.error('Failed to load blog: ' + (error as Error).message);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className={styles.backButton}
        >
          Back to Blogs
        </Button>
        <Skeleton active avatar paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={styles.container}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className={styles.backButton}
        >
          Back to Blogs
        </Button>
        <Title level={3}>Blog not found</Title>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={handleGoBack}
        className={styles.backButton}
      >
        Back to Blogs
      </Button>

      <Title className={styles.title}>{blog.heading}</Title>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <CalendarOutlined />
          <Text>
            Published:{' '}
            {dayjs(blog.published_date * 1000).format('MMMM D, YYYY')}
          </Text>
        </div>
        <div className={styles.metaItem}>
          <ClockCircleOutlined />
          <Text>Week {blog.week} of Pregnancy</Text>
        </div>
        <div className={styles.metaItem}>
          <UserOutlined />
          <Text>Author ID: {blog.author_id}</Text>
        </div>
        <Tag color={blog.status === 'published' ? 'green' : 'blue'}>
          {blog.status.toUpperCase()}
        </Tag>
      </div>

      <Text className={styles.description}>{blog.description}</Text>

      <img
        src={blog.feature_image_url}
        alt={blog.heading}
        className={styles.coverImage}
      />

      <Divider />

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: renderContent(blog.content),
        }}
      />
    </div>
  );
};

// Helper function to convert Tiptap JSON content to HTML
const renderContent = (content: any): string => {
  if (!content) return '';

  try {
    // If content is already HTML string, return it directly
    if (typeof content === 'string') {
      return content;
    }

    // If content is JSON, we need to render it
    // For now, let's use a simplified approach
    // In a real app, you might want to use a library like ProseMirror to render this properly
    let html = '';

    const processNode = (node: any): string => {
      if (!node) return '';

      let nodeHtml = '';

      switch (node.type) {
        case 'doc':
          return node.content ? node.content.map(processNode).join('') : '';

        case 'paragraph':
          return `<p>${
            node.content ? node.content.map(processNode).join('') : ''
          }</p>`;

        case 'text':
          let text = node.text || '';
          if (node.marks) {
            for (const mark of node.marks) {
              switch (mark.type) {
                case 'bold':
                  text = `<strong>${text}</strong>`;
                  break;
                case 'italic':
                  text = `<em>${text}</em>`;
                  break;
                case 'link':
                  text = `<a href="${mark.attrs.href}" target="${
                    mark.attrs.target || '_blank'
                  }">${text}</a>`;
                  break;
                default:
                  break;
              }
            }
          }
          return text;

        case 'heading':
          const level = node.attrs?.level || 2;
          return `<h${level}>${
            node.content ? node.content.map(processNode).join('') : ''
          }</h${level}>`;

        case 'image':
          return `<img src="${node.attrs?.src}" alt="${
            node.attrs?.alt || ''
          }" class="blog-image" />`;

        default:
          return '';
      }
    };

    html = processNode(content);
    return html;
  } catch (err) {
    console.error('Error rendering blog content:', err);
    return '<p>Error rendering content</p>';
  }
};

export default BlogDetail;
