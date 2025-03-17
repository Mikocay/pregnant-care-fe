import React from 'react';
import { Card, Typography, Skeleton, Empty } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './styles.module.css';
import { useBlogPreviewByWeekQuery } from '@/services/blog.service';

const { Title, Paragraph, Text } = Typography;

interface BlogPreviewProps {
  week: number;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ week }) => {
  const { data, isLoading, error } = useBlogPreviewByWeekQuery(week);
  const navigate = useNavigate();
  const blog = data?.data;

  const handleCardClick = () => {
    if (blog) {
      navigate(`/member/blog/${blog.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.previewContainer}>
        <Skeleton active avatar paragraph={{ rows: 3 }} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={styles.previewContainer}>
        <Empty
          description="No blog found for this week"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className={styles.empty}
        />
      </div>
    );
  }

  return (
    <Card className={styles.blogPreview} onClick={handleCardClick} hoverable>
      <div className={styles.blogContent}>
        <div className={styles.imageContainer}>
          <img
            src={blog.feature_image_url}
            alt={blog.heading}
            className={styles.featureImage}
          />
        </div>
        <div className={styles.textContent}>
          <Title level={3} className={styles.blogTitle}>
            {blog.heading}
          </Title>
          <div className={styles.date}>
            <CalendarOutlined />
            <Text className={styles.dateText}>
              {dayjs(blog.published_date * 1000).format('MMMM D, YYYY')}
            </Text>
          </div>
          <Paragraph className={styles.description}>
            {blog.description}
          </Paragraph>
          <div className={styles.readMore}>Read more...</div>
        </div>
      </div>
    </Card>
  );
};

export default BlogPreview;
