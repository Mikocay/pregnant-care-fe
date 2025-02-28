import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Card,
  Button,
  Modal,
  Radio,
  Space,
  Divider,
  Badge,
  Tag,
  Row,
  Col,
  notification,
} from 'antd';
import {
  CheckCircleFilled,
  CrownFilled,
  SafetyCertificateFilled,
  RocketFilled,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import styles from './Subscription.module.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  recommended?: boolean;
  icon: React.ReactNode;
  color: string;
}

const SubscriptionPage: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<string>('premium');
  const [isUpdateModalVisible, setIsUpdateModalVisible] =
    useState<boolean>(false);
  const [isCancelModalVisible, setIsCancelModalVisible] =
    useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');
  const [loading, setLoading] = useState<boolean>(false);

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 4.99,
      period: 'month',
      features: [
        'Weekly pregnancy updates',
        'Basic pregnancy tracker',
        'Limited articles access',
        'Email support',
      ],
      icon: <SafetyCertificateFilled />,
      color: '#52c41a',
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 9.99,
      period: 'month',
      features: [
        'Daily pregnancy updates',
        'Advanced pregnancy tracker',
        'Full articles access',
        'Nutrition guidance',
        'Personalized tips',
        'Priority support',
        'Symptom tracker',
      ],
      recommended: true,
      icon: <CrownFilled />,
      color: '#ff7875',
    },
    {
      id: 'annual',
      name: 'Annual Premium',
      price: 89.99,
      period: 'year',
      features: [
        'All Premium features',
        'Save 25% compared to monthly',
        'Exclusive content',
        'Priority support',
        'Baby development videos',
        'Personalized birth plan',
        'Expert Q&A access',
      ],
      icon: <RocketFilled />,
      color: '#722ed1',
    },
  ];

  const handleUpdatePlan = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setCurrentPlan(selectedPlan);
      setLoading(false);
      setIsUpdateModalVisible(false);

      notification.success({
        message: 'Plan Updated',
        description: `You have successfully updated to the ${
          subscriptionPlans.find((plan) => plan.id === selectedPlan)?.name
        }.`,
        placement: 'topRight',
      });
    }, 1500);
  };

  const handleCancelPlan = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsCancelModalVisible(false);

      notification.info({
        message: 'Subscription Canceled',
        description:
          'Your subscription has been canceled. You will still have access until the end of your billing period.',
        placement: 'topRight',
      });
    }, 1500);
  };

  const handlePlanChange = (e: RadioChangeEvent) => {
    setSelectedPlan(e.target.value);
  };

  const getCurrentPlan = () => {
    return subscriptionPlans.find((plan) => plan.id === currentPlan);
  };

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.pageContainer}>
          <div className={styles.pageHeader}>
            <div>
              <Title level={2} className={styles.pageTitle}>
                Your Subscription
              </Title>
              <Text type="secondary">
                Manage your pregnancy tracking subscription
              </Text>
            </div>
            <div className={styles.headerActions}>
              <Button
                type="primary"
                size="large"
                onClick={() => setIsUpdateModalVisible(true)}
                className={styles.updateButton}
              >
                Update Plan
              </Button>
              <Button
                danger
                size="large"
                onClick={() => setIsCancelModalVisible(true)}
              >
                Cancel Plan
              </Button>
            </div>
          </div>

          <Card className={styles.currentPlanCard}>
            <div className={styles.planHeader}>
              <div
                className={styles.planBadge}
                style={{ backgroundColor: getCurrentPlan()?.color }}
              >
                {getCurrentPlan()?.icon}
              </div>
              <div className={styles.planInfo}>
                <div className={styles.planNameContainer}>
                  <Title level={3} className={styles.planName}>
                    {getCurrentPlan()?.name}
                  </Title>
                  <Badge
                    status="success"
                    text="Active"
                    className={styles.statusBadge}
                  />
                </div>
                <div className={styles.planPrice}>
                  <Text className={styles.price}>
                    ${getCurrentPlan()?.price}
                  </Text>
                  <Text type="secondary" className={styles.period}>
                    per {getCurrentPlan()?.period}
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
                {getCurrentPlan()?.features.map((feature, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div className={styles.featureItem}>
                      <CheckCircleFilled
                        className={styles.featureIcon}
                        style={{ color: getCurrentPlan()?.color }}
                      />
                      <Text>{feature}</Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </div>
      </Content>

      {/* Update Plan Modal */}
      <Modal
        title="Update Your Subscription Plan"
        open={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsUpdateModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleUpdatePlan}
            disabled={selectedPlan === currentPlan}
          >
            Update Plan
          </Button>,
        ]}
        width={700}
        className={styles.planModal}
      >
        <Paragraph className={styles.modalDescription}>
          Choose the plan that best fits your pregnancy journey. You can change
          your plan at any time.
        </Paragraph>

        <Radio.Group
          onChange={handlePlanChange}
          value={selectedPlan}
          className={styles.planRadioGroup}
        >
          <Space direction="vertical" className={styles.planOptions}>
            {subscriptionPlans.map((plan) => (
              <Radio
                key={plan.id}
                value={plan.id}
                className={styles.planOption}
              >
                <Card
                  className={`${styles.planSelectionCard} ${
                    selectedPlan === plan.id ? styles.selectedPlanCard : ''
                  }`}
                  bordered={false}
                >
                  <div className={styles.planSelectionHeader}>
                    <div>
                      <div className={styles.planSelectionTitle}>
                        <Text strong className={styles.planName}>
                          {plan.name}
                        </Text>
                        {plan.recommended && (
                          <Tag color="gold">RECOMMENDED</Tag>
                        )}
                      </div>
                      <div className={styles.planSelectionPrice}>
                        <Text className={styles.price}>${plan.price}</Text>
                        <Text type="secondary" className={styles.period}>
                          per {plan.period}
                        </Text>
                      </div>
                    </div>
                    <div
                      className={styles.planIcon}
                      style={{ backgroundColor: plan.color }}
                    >
                      {plan.icon}
                    </div>
                  </div>

                  <div className={styles.planSelectionFeatures}>
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className={styles.planSelectionFeature}>
                        <CheckCircleFilled
                          className={styles.featureIcon}
                          style={{ color: plan.color }}
                        />
                        <Text>{feature}</Text>
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <Text type="secondary" className={styles.moreFeatures}>
                        +{plan.features.length - 3} more features
                      </Text>
                    )}
                  </div>
                </Card>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>

      {/* Cancel Plan Modal */}
      <Modal
        title="Cancel Your Subscription"
        open={isCancelModalVisible}
        onCancel={() => setIsCancelModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsCancelModalVisible(false)}>
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
          <div className={styles.cancelIcon}>
            <CloseCircleOutlined />
          </div>
          <Title level={4}>Are you sure you want to cancel?</Title>
          <Paragraph>If you cancel your subscription:</Paragraph>
          <ul className={styles.cancelList}>
            <li>
              You will lose access to all premium features at the end of your
              billing period
            </li>
            <li>Your subscription will remain active until March 15, 2024</li>
            <li>You can resubscribe at any time</li>
          </ul>
          <Paragraph type="secondary" className={styles.cancelNote}>
            We're sorry to see you go! If you're having any issues with your
            subscription, our support team is always here to help.
          </Paragraph>
        </div>
      </Modal>
    </Layout>
  );
};

export default SubscriptionPage;
