<<<<<<< HEAD
import TiptapEditor from '@/components/Tiptap';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
=======
import { Layout, Card, Button, Form, Input, Collapse, Image } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
>>>>>>> 32045a8de873799144e121af8f8c852801b55173

import styles from './HomePage.module.css';
import PricingPage from '../Pricing';
import ASSETS from '@/assets';
import { useHomePage } from './useHomePage';
import { TestimonialsSection } from './Testimonials';
import { ServicesSection } from './Services';

const { Panel } = Collapse;

<<<<<<< HEAD
  return (
    <TiptapEditor />
  )
};
=======
export default function Home() {
  const { whyChooseUsFeatures, form } = useHomePage();
>>>>>>> 32045a8de873799144e121af8f8c852801b55173

  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.shape1} />
          <div className={styles.shape2} />
          <div className={styles.dots1} />
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1>Crafted for optimal pregnancy tracking.</h1>
                <p>
                  Your trusted companion for a smooth and joyful pregnancy
                  journey.
                </p>
                <Button type="primary" size="large">
                  Get Started Free
                </Button>
              </div>
              <div className={styles.heroImage}>
                <Image
                  src={ASSETS.authBackground}
                  alt="Pregnancy tracking app interface"
                  width={500}
                  height={400}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <ServicesSection />
        {/* Why Choose Us Section */}
        <section className={styles.whyChooseUs}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h2>Why choose us</h2>
              <p>
                We are the only service that provides all 3 services as a
                packaged service
              </p>
            </div>

            <div className={styles.features}>
              {whyChooseUsFeatures.map((feature, index) => (
                <Card key={index} className={styles.featureCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.textContent}>
                      <h3>{feature.title}</h3>
                      <ul className={styles.pointsList}>
                        {feature.points.map((point, idx) => (
                          <li key={idx}>
                            <CheckOutlined className={styles.checkIcon} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.iconContainer}>
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={200}
                        height={250}
                        className={styles.featureIcon}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingPage />

        {/* FAQ Section */}
        <section className={styles.faq}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h2>FAQs</h2>
            </div>
            <Collapse className={styles.faqCollapse}>
              <Panel
                header="What is pregnancy tracker website and why should I use it?"
                key="1"
              >
                <p>
                  A pregnancy tracker website helps you monitor your pregnancy
                  journey with detailed insights, personalized recommendations,
                  and expert guidance.
                </p>
              </Panel>
              <Panel header="How accurate is the information provided?" key="2">
                <p>
                  Our information is reviewed by medical professionals and
                  updated regularly to ensure accuracy.
                </p>
              </Panel>
              <Panel header="Can I share my progress with my partner?" key="3">
                <p>
                  Yes, you can share your pregnancy journey with family members
                  through our family sharing feature.
                </p>
              </Panel>
            </Collapse>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact Section */}
        <section className={styles.contact}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h2>Contact Us</h2>
            </div>
            <Form form={form} layout="vertical" className={styles.contactForm}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </main>
    </Layout>
  );
}
