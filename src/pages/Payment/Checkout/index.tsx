import React, { useEffect, useState } from 'react';
import { Button, message, Radio } from 'antd';
import { CreditCardOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './Checkout.module.css';
import { userService } from '@/services/user.service';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '@/config';
import PaymentStatus from '../PaymentStatus';

interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

const Checkout: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [disabledButton, setDisableButton] = useState(true);
  const [disableCard, setDisableCard] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    'processing' | 'success' | 'failure'
  >('processing');
  const navigate = useNavigate();
  const location = useLocation();
  const plan = new URLSearchParams(location.search).get('planId');
  const planName =
    new URLSearchParams(location.search).get('planName') || 'Default Plan Name';
  const planPrice =
    new URLSearchParams(location.search).get('planPrice') || '0';

  const getPaymentMethods = async () => {
    try {
      const res = await userService.getPaymentMethods();
      setPaymentMethods(res.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const handleCheckout = async (cardId: string) => {
    setLoading(true);
    try {
      if (cardId !== '' && paymentIntent) {
        const res = await userService.postPaymentIntentConfirm({
          intent: paymentIntent.id,
          paymentMethod: cardId,
        });
        if (res.data.data.status === 'succeeded') {
          setPaymentStatus('success');
          setLoading(false);
        } else {
          setPaymentStatus('failure');
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectCard = (cardId: string) => {
    if (cardId !== '') {
      if (plan) {
        createPaymentIntent(cardId, plan);
      }
    } else {
      message.warning('Please choose your card');
    }
  };

  const createPaymentIntent = async (
    selectedPaymentMethodId: string,
    plan: string,
  ) => {
    try {
      const res = await userService.postPaymentIntent({
        plan: plan,
        paymentMethod: selectedPaymentMethodId,
      });
      if (res.data.success) {
        setPaymentIntent(res.data.data);
        setDisableButton(false);
        setDisableCard(true);
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        console.error('Error:', error);
      } else {
        message.error(error.response.data.message);
      }
    }
  };

  const showAddCardModal = () => {
    navigate(config.routes.auth.payment_method);
  };

  return (
    <div className={styles.wrapper}>
      {paymentStatus === 'processing' ? (
        <div className={styles.container}>
          <div className={styles.layout}>
            <div>
              <h1 className={styles.title}>Payment Method</h1>
              <div className={styles.cardList}>
                <Radio.Group
                  value={selectedCard}
                  style={{ width: '100%' }}
                  disabled={disableCard}
                >
                  {paymentMethods.map((card: PaymentMethod) => (
                    <div
                      key={card.id}
                      className={`${styles.cardItem} ${
                        selectedCard === card.id ? styles.selectedCard : ''
                      } ${disableCard ? styles.disabled : ''}`}
                      onClick={() => setSelectedCard(card.id)}
                    >
                      <Radio value={card.id}>
                        <div className={styles.cardInfo}>
                          <div className={styles.cardLogo}>
                            <CreditCardOutlined style={{ fontSize: '24px' }} />
                          </div>
                          <div className={styles.cardDetails}>
                            <div className={styles.cardNumber}>
                              {card.card.brand} **** {card.card.last4}
                            </div>
                            <div className={styles.cardExpiry}>
                              Expires {card.card.exp_month}/{card.card.exp_year}
                            </div>
                          </div>
                        </div>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>

                <div
                  className={styles.addCardButton}
                  onClick={showAddCardModal}
                >
                  <PlusOutlined />
                  Add new card
                </div>
                <Button
                  type="primary"
                  block
                  className={styles.checkoutButton}
                  onClick={() => handleSelectCard(selectedCard)}
                  disabled={disableCard}
                >
                  Submit
                </Button>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Plan name</span>
                <span>{planName}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Price</span>
                <span>${planPrice}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>${planPrice}</span>
              </div>
              <Button
                type="primary"
                block
                className={styles.checkoutButton}
                onClick={() => handleCheckout(selectedCard)}
                disabled={disabledButton}
                loading={loading}
              >
                Complete Purchase
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <PaymentStatus
          planName={planName}
          planPrice={planPrice}
          paymentStatus={paymentStatus}
        />
      )}
    </div>
  );
};

export default Checkout;
