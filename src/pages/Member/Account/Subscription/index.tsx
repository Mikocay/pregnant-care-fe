import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Card,
  Button,
  Modal,
  Divider,
  Badge,
  Row,
  Col,
  Tag,
  Progress,
  Tooltip,
} from 'antd';
import {
  CheckCircleFilled,
  CloseCircleOutlined,
  CrownFilled,
  RocketFilled,
  SafetyCertificateFilled,
  CalendarOutlined,
  WarningOutlined,
  ClockCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import styles from './Subscription.module.css';
import { useSubscription } from './useSubscription';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SubscriptionPage: React.FC = () => {
  const [showExpiringSoon, setShowExpiringSoon] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const {
    subscriptions,
    handleCancelPlan,
    handleUpdatePlan,
    handleCancelButton,
    loading,
    handleIsCancelModalVisible,
    isCancelModalVisible,
    dueDate,
    daysRemaining,
    isExpired,
    isExpiringSoon,
  } = useSubscription();

  useEffect(() => {
    if (isExpiringSoon) {
      setShowExpiringSoon(true);
    }
  }, [isExpiringSoon]);

  const formatDueDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateProgress = () => {
    if (!dueDate || isExpired) return 100;
    if (daysRemaining > 90) return 25;
    const percentage = 100 - (daysRemaining / 90) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.pageContainer}>
          <div className={styles.pageHeader}>
            <div>
              <Title className={styles.pageTitle}>Your Subscription</Title>
              <Text type="secondary">
                Manage your pregnancy tracking subscription
              </Text>
            </div>
            <div className={styles.headerActions}>
              <Button
                type="primary"
                size="large"
                onClick={handleUpdatePlan}
                className={styles.updateButton}
              >
                Update Plan
              </Button>
              <Button danger size="large" onClick={handleCancelButton}>
                Cancel Plan
              </Button>
            </div>
          </div>

          {showExpiringSoon && !isExpired && !isDismissed && (
            <div className={styles.warningBanner}>
              <CloseOutlined
                className={styles.closeWarningIcon}
                onClick={() => setIsDismissed(true)}
              />
              <WarningOutlined className={styles.warningIcon} />
              <div className={styles.warningText}>
                <Text strong>Your subscription will expire soon!</Text>
                <Text>
                  Your plan will automatically cancel on{' '}
                  {formatDueDate(dueDate)}.
                </Text>
              </div>
              <Button
                type="primary"
                onClick={handleUpdatePlan}
                className={styles.renewButton}
              >
                Renew Now
              </Button>
            </div>
          )}

          <Card className={styles.currentPlanCard}>
            <div className={styles.planHeader}>
              <div
                className={styles.planBadge}
                style={{ backgroundColor: '#ff7875' }}
              >
                {subscriptions?.type === 'free' ? (
                  <SafetyCertificateFilled />
                ) : subscriptions?.type === '1-month' ? (
                  <CrownFilled />
                ) : (
                  <RocketFilled />
                )}
              </div>
              <div className={styles.planInfo}>
                <div className={styles.planNameContainer}>
                  <Title level={3} className={styles.planName}>
                    {subscriptions?.name}
                  </Title>
                  <Badge
                    status={isExpired ? 'error' : 'success'}
                    text={isExpired ? 'Expired' : 'Active'}
                    className={styles.statusBadge}
                  />
                </div>
                <div className={styles.planPrice}>
                  <Text className={styles.price}>${subscriptions?.price}</Text>
                  <Text type="secondary" className={styles.period}>
                    per /{' '}
                    {subscriptions?.type === '1-month'
                      ? 'month'
                      : subscriptions?.type === 'free'
                      ? 'month'
                      : 'lifetime'}
                  </Text>
                </div>
                <div>
                  <Text className={styles.description}>
                    {subscriptions?.description}
                  </Text>
                </div>
              </div>
            </div>

            <Divider className={styles.divider} />

            <div className={styles.planFeatures}>
              <Title level={4} className={styles.featuresTitle}>
                Plan Features
              </Title>
              <Row gutter={[24, 16]} className={styles.featuresGrid}>
                {subscriptions?.benefits.map((feature, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div className={styles.featureItem}>
                      <CheckCircleFilled
                        className={styles.featureIcon}
                        style={{ color: '#ff7875' }}
                      />
                      <Text>{feature}</Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            <Divider className={styles.divider} />

            {dueDate && subscriptions?.type !== 'free' && (
              <div className={styles.dueDateSection}>
                <div className={styles.dueDateHeader}>
                  <div className={styles.dueDateInfo}>
                    <CalendarOutlined className={styles.dueDateIcon} />
                    <div>
                      <Text strong>Due Date:</Text>
                      <div className={styles.dueDateValue}>
                        <Text>{formatDueDate(dueDate)}</Text>
                        {isExpiringSoon && !isExpired && (
                          <Tag color="warning" className={styles.expiringTag}>
                            <ClockCircleOutlined /> {daysRemaining} days left
                          </Tag>
                        )}
                        {isExpired && (
                          <Tag color="error" className={styles.expiringTag}>
                            Expired
                          </Tag>
                        )}
                      </div>
                    </div>
                  </div>

                  <Tooltip
                    title={`${
                      isExpired
                        ? 'Subscription expired'
                        : `${daysRemaining} days remaining`
                    }`}
                  >
                    <div className={styles.progressContainer}>
                      <Progress
                        percent={calculateProgress()}
                        showInfo={false}
                        strokeColor={
                          isExpired
                            ? '#ff4d4f'
                            : daysRemaining < 30
                            ? '#faad14'
                            : '#52c41a'
                        }
                        className={styles.dueProgress}
                      />
                    </div>
                  </Tooltip>
                </div>

                <Text type="secondary" className={styles.dueDateNote}>
                  {isExpired
                    ? 'Your subscription has expired. Please renew to continue accessing premium features.'
                    : `Your subscription will automatically cancel on the due date. ${
                        daysRemaining <= 30
                          ? 'Consider renewing soon to avoid interruption.'
                          : ''
                      }`}
                </Text>
              </div>
            )}
          </Card>
        </div>
      </Content>

      <Modal
        title="Cancel Your Subscription"
        open={isCancelModalVisible}
        onCancel={handleIsCancelModalVisible}
        footer={[
          <Button key="back" onClick={handleIsCancelModalVisible}>
            Keep Subscription
          </Button>,
          <Button
            key="submit"
            danger
            loading={loading}
            onClick={handleCancelPlan}
          >
            Confirm Cancellation
          </Button>,
        ]}
        className={styles.cancelModal}
      >
        <div className={styles.cancelModalContent}>
          <CloseCircleOutlined className={styles.cancelIcon} />
          <Title level={4}>Are you sure you want to cancel?</Title>
          <Paragraph>If you cancel your subscription:</Paragraph>
          <ul className={styles.cancelList}>
            <li>
              You will lose premium features after {formatDueDate(dueDate)}.
            </li>
            <li>Your subscription remains active until then.</li>
            <li>You can resubscribe anytime.</li>
          </ul>
        </div>
      </Modal>
    </Layout>
  );
};

export default SubscriptionPage;
