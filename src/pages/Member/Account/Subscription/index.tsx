import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Card,
  Button,
  Tabs,
  Table,
  Tag,
  Steps,
  Statistic,
  Row,
  Col,
  Divider,
  Badge,
  Space,
  Alert,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  HeartOutlined,
  BellOutlined,
  SettingOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import type { TabsProps, TableColumnsType } from 'antd';
import styles from './Subscription.module.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Step } = Steps;

interface PaymentHistory {
  key: string;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  plan: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  recommended?: boolean;
}

const SubscriptionPage: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<string>('premium');
  const [daysLeft, setDaysLeft] = useState<number>(23);
  const [pregnancyWeek, setPregnancyWeek] = useState<number>(24);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call to fetch subscription data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 4.99,
      period: 'month',
      features: [
        'Weekly pregnancy updates',
        'Basic pregnancy tracker',
        'Limited articles access',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 9.99,
      period: 'month',
      features: [
        'Daily pregnancy updates',
        'Advanced pregnancy tracker',
        'Full articles access',
        'Nutrition guidance',
        'Personalized tips',
      ],
      recommended: true,
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
      ],
    },
  ];

  const paymentHistory: PaymentHistory[] = [
    {
      key: '1',
      date: '2024-02-15',
      amount: 9.99,
      status: 'success',
      plan: 'Premium',
    },
    {
      key: '2',
      date: '2024-01-15',
      amount: 9.99,
      status: 'success',
      plan: 'Premium',
    },
    {
      key: '3',
      date: '2023-12-15',
      amount: 9.99,
      status: 'success',
      plan: 'Premium',
    },
    {
      key: '4',
      date: '2023-11-15',
      amount: 4.99,
      status: 'success',
      plan: 'Basic',
    },
  ];

  const columns: TableColumnsType<PaymentHistory> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        let icon = <CheckCircleOutlined />;

        if (status === 'pending') {
          color = 'gold';
          icon = <ClockCircleOutlined />;
        } else if (status === 'failed') {
          color = 'red';
          icon = null;
        }

        return (
          <Tag color={color} icon={icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="link" size="small">
          View Receipt
        </Button>
      ),
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Current Plan',
      children: (
        <div className={styles.currentPlanTab}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={16}>
              <Card className={styles.subscriptionCard}>
                <div className={styles.subscriptionHeader}>
                  <div>
                    <Title level={4}>Your Current Subscription</Title>
                    <Text type="secondary">
                      Manage your pregnancy tracking subscription
                    </Text>
                  </div>
                  <Badge status="success" text="Active" />
                </div>

                <Divider />

                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Statistic
                      title="Current Plan"
                      value="Premium"
                      prefix={<HeartOutlined />}
                      className={styles.statistic}
                    />
                    <Text type="secondary">Billed monthly</Text>
                  </Col>
                  <Col xs={24} md={12}>
                    <Statistic
                      title="Next Payment"
                      value="$9.99"
                      prefix={<DollarOutlined />}
                      className={styles.statistic}
                    />
                    <Text type="secondary">March 15, 2024</Text>
                  </Col>
                </Row>

                <Divider />

                <div className={styles.subscriptionActions}>
                  <Space>
                    <Button type="primary" icon={<CreditCardOutlined />}>
                      Update Payment Method
                    </Button>
                    <Button icon={<SettingOutlined />}>Change Plan</Button>
                  </Space>
                  <Button danger>Cancel Subscription</Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card className={styles.pregnancyTrackingCard}>
                <Title level={4}>Pregnancy Progress</Title>
                <div className={styles.weekCounter}>
                  <Statistic
                    title="Current Week"
                    value={pregnancyWeek}
                    suffix="/ 40"
                  />
                  <div className={styles.babySize}>
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="Baby size illustration"
                      className={styles.babySizeIcon}
                    />
                    <Text>Baby is the size of a corn</Text>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${(pregnancyWeek / 40) * 100}%` }}
                  />
                </div>
                <div className={styles.trimesterInfo}>
                  <Text>Second Trimester</Text>
                  <Text type="secondary">
                    {40 - pregnancyWeek} weeks remaining
                  </Text>
                </div>
                <Divider />
                <Button type="link" icon={<CalendarOutlined />} block>
                  View Detailed Pregnancy Timeline
                </Button>
              </Card>
            </Col>
          </Row>

          <Card
            className={styles.featuresCard}
            title="Premium Features Included"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <div className={styles.featureItem}>
                  <CheckCircleOutlined className={styles.featureIcon} />
                  <div>
                    <Text strong>Daily Updates</Text>
                    <Text
                      type="secondary"
                      className={styles.featureDescription}
                    >
                      Get daily updates about your baby's development
                    </Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className={styles.featureItem}>
                  <CheckCircleOutlined className={styles.featureIcon} />
                  <div>
                    <Text strong>Nutrition Guidance</Text>
                    <Text
                      type="secondary"
                      className={styles.featureDescription}
                    >
                      Personalized nutrition plans for each trimester
                    </Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className={styles.featureItem}>
                  <CheckCircleOutlined className={styles.featureIcon} />
                  <div>
                    <Text strong>Symptom Tracker</Text>
                    <Text
                      type="secondary"
                      className={styles.featureDescription}
                    >
                      Track and manage pregnancy symptoms
                    </Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className={styles.featureItem}>
                  <CheckCircleOutlined className={styles.featureIcon} />
                  <div>
                    <Text strong>Appointment Reminders</Text>
                    <Text
                      type="secondary"
                      className={styles.featureDescription}
                    >
                      Never miss an important doctor's appointment
                    </Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className={styles.featureItem}>
                  <CheckCircleOutlined className={styles.featureIcon} />
                  <div>
                    <Text strong>Expert Articles</Text>
                    <Text
                      type="secondary"
                      className={styles.featureDescription}
                    >
                      Access to premium content from health experts
                    </Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className={styles.featureItem}>
                  <CheckCircleOutlined className={styles.featureIcon} />
                  <div>
                    <Text strong>Community Access</Text>
                    <Text
                      type="secondary"
                      className={styles.featureDescription}
                    >
                      Connect with other expecting parents
                    </Text>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Change Plan',
      children: (
        <div className={styles.changePlanTab}>
          <Alert
            message="Changing plans will take effect immediately"
            description="Your account will be charged or credited the prorated difference for the remainder of your billing cycle."
            type="info"
            showIcon
            className={styles.planAlert}
          />

          <Row gutter={[16, 16]} className={styles.plansContainer}>
            {subscriptionPlans.map((plan) => (
              <Col xs={24} md={8} key={plan.id}>
                <Card
                  className={`${styles.planCard} ${
                    currentPlan === plan.id ? styles.selectedPlan : ''
                  } ${plan.recommended ? styles.recommendedPlan : ''}`}
                  title={
                    <div className={styles.planCardTitle}>
                      {plan.name}
                      {plan.recommended && <Tag color="gold">RECOMMENDED</Tag>}
                    </div>
                  }
                  actions={[
                    currentPlan === plan.id ? (
                      <Button key="current" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => setCurrentPlan(plan.id)}
                      >
                        Select Plan
                      </Button>
                    ),
                  ]}
                >
                  <div className={styles.planPrice}>
                    <Title level={2}>${plan.price}</Title>
                    <Text type="secondary">per {plan.period}</Text>
                  </div>

                  <Divider />

                  <ul className={styles.featuresList}>
                    {plan.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <CheckCircleOutlined className={styles.checkIcon} />
                        <Text>{feature}</Text>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Payment History',
      children: (
        <div className={styles.paymentHistoryTab}>
          <Card>
            <Title level={4}>Payment History</Title>
            <Text type="secondary" className={styles.paymentHistoryDescription}>
              View all your previous transactions
            </Text>

            <Table
              columns={columns}
              dataSource={paymentHistory}
              pagination={{ pageSize: 5 }}
              className={styles.paymentTable}
            />
          </Card>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Notifications',
      children: (
        <div className={styles.notificationsTab}>
          <Card>
            <Title level={4}>Notification Preferences</Title>
            <Text type="secondary">
              Manage how you receive pregnancy tracking updates
            </Text>

            <Divider />

            <div className={styles.notificationSettings}>
              <div className={styles.notificationItem}>
                <div>
                  <Text strong>Weekly Summary</Text>
                  <Text
                    type="secondary"
                    className={styles.notificationDescription}
                  >
                    Receive a weekly summary of your pregnancy progress
                  </Text>
                </div>
                <Button type="primary" icon={<BellOutlined />}>
                  Enabled
                </Button>
              </div>

              <Divider />

              <div className={styles.notificationItem}>
                <div>
                  <Text strong>Payment Reminders</Text>
                  <Text
                    type="secondary"
                    className={styles.notificationDescription}
                  >
                    Get notified before your subscription renews
                  </Text>
                </div>
                <Button type="primary" icon={<BellOutlined />}>
                  Enabled
                </Button>
              </div>

              <Divider />

              <div className={styles.notificationItem}>
                <div>
                  <Text strong>Special Offers</Text>
                  <Text
                    type="secondary"
                    className={styles.notificationDescription}
                  >
                    Receive notifications about special offers and discounts
                  </Text>
                </div>
                <Button icon={<BellOutlined />}>Disabled</Button>
              </div>

              <Divider />

              <div className={styles.notificationItem}>
                <div>
                  <Text strong>New Features</Text>
                  <Text
                    type="secondary"
                    className={styles.notificationDescription}
                  >
                    Get notified when new features are added to your plan
                  </Text>
                </div>
                <Button type="primary" icon={<BellOutlined />}>
                  Enabled
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.pageHeader}>
          <Title level={2}>Subscription Management</Title>
          <Text type="secondary">
            Manage your pregnancy tracking subscription
          </Text>
        </div>

        <div className={styles.mainContent}>
          <Tabs defaultActiveKey="1" items={items} className={styles.tabs} />
        </div>
      </Content>
    </Layout>
  );
};

export default SubscriptionPage;
