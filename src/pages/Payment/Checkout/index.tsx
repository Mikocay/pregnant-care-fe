import React, { useEffect, useState } from 'react';
import { Button, Radio } from 'antd';
import { CreditCardOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './Checkout.module.css';
import { userService } from '@/services/user.service';
import { useNavigate } from 'react-router-dom';
import config from '@/config';

interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expMonth: string;
  expYear: string;
}

const mockCards: CreditCard[] = [
  {
    id: '1',
    last4: '4242',
    brand: 'Visa',
    expMonth: '12',
    expYear: '2024',
  },
  {
    id: '2',
    last4: '5555',
    brand: 'Mastercard',
    expMonth: '08',
    expYear: '2025',
  },
];

const mockOrder = {
  subtotal: 99.99,
  tax: 8.0,
  shipping: 5.99,
  total: 113.98,
};

const Checkout: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string>(mockCards[0].id);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const navigate = useNavigate();

  const getPaymentMethods = () => {
    try {
      const res = userService.getPaymentMethods();
      console.log(res.data.data);
      setPaymentMethods(res.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const handleCheckout = () => {
    console.log('Checkout with card:', selectedCard);
  };

  const showAddCardModal = () => {
    navigate(config.routes.auth.payment_method);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div>
            <h1 className={styles.title}>Payment Method</h1>
            <div className={styles.cardList}>
              <Radio.Group
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
                style={{ width: '100%' }}
              >
                {paymentMethods.map((card) => (
                  <div
                    key={card.id}
                    className={`${styles.cardItem} ${
                      selectedCard === card.id ? styles.selectedCard : ''
                    }`}
                  >
                    <Radio value={card.id}>
                      <div className={styles.cardInfo}>
                        <div className={styles.cardLogo}>
                          <CreditCardOutlined style={{ fontSize: '24px' }} />
                        </div>
                        <div className={styles.cardDetails}>
                          <div className={styles.cardNumber}>
                            {card.brand} ending in {card.last4}
                          </div>
                          <div className={styles.cardExpiry}>
                            Expires {card.expMonth}/{card.expYear}
                          </div>
                        </div>
                      </div>
                    </Radio>
                  </div>
                ))}
              </Radio.Group>

              <div className={styles.addCardButton} onClick={showAddCardModal}>
                <PlusOutlined />
                Add new card
              </div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${mockOrder.subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>${mockOrder.tax.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>${mockOrder.shipping.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>${mockOrder.total.toFixed(2)}</span>
            </div>
            <Button
              type="primary"
              block
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Complete Purchase
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
