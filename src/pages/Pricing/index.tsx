import { Card, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import styles from './Pricing.module.css';
import usePricing from './usePricing';

export default function PricingPage() {
  const { plans } = usePricing();

  return (
    <main className={styles.content}>
      <div className={styles.header}>
        <h1>Features & Pricing</h1>
        <p>
          Whether your time-saving automation needs are large or small, we're
          here to help you scale.
        </p>
      </div>
      <div className={styles.plans}>
        {plans.map((plan) => (
          <Card key={plan.name} className={`${styles.card} ${plan.name}`}>
            {plan.type === '1-month' && (
              <span className={styles.badge}>MOST POPULAR</span>
            )}
            <div className={styles.cardContent}>
              <div className={styles.priceSection}>
                <span className={styles.price}>{plan.price}$</span>
                <span className={styles.period}>
                  /{plan.type === 'lifetime' ? 'life time' : 'month'}
                </span>
              </div>
              <h2 className={styles.title}>
                {plan.type === '1-month'
                  ? 'Month'
                  : plan.type === 'lifetime'
                  ? 'Entire Life'
                  : 'Free Trial (3 Days)'}
              </h2>
              {plan.description && (
                <p className={styles.description}>{plan.description}</p>
              )}
              <ul className={styles.features}>
                {plan.benefits.map((benefit) => (
                  <li key={benefit}>
                    <CheckCircleFilled className={styles.checkIcon} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                type={plan.type === '1-month' ? 'primary' : 'default'}
                className={`${styles.button} ${
                  plan.type === '1-month' ? styles.popularButton : ''
                }`}
              >
                Choose
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
