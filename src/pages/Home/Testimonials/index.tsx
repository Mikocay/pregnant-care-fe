import { Carousel, Image } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import styles from './Testimonials.module.css';

interface Testimonial {
  rating: number;
  text: string;
  name: string;
  location: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    rating: 4,
    text: "Absolutely love this app! It's been my daily pregnancy companion, offering personalized tips and updates. Can't wait for the official release!",
    name: 'Jessica Thompson',
    location: 'NY, USA',
    avatar: '/avatar1.jpg',
  },
  {
    rating: 5,
    text: 'As a first-time mom, this app has been a lifesaver. Easy to use, informative, and it feels like a friend guiding me through each trimester. Thanks, team!',
    name: 'Gauri Patel',
    location: 'New Jersey, USA',
    avatar: '/avatar2.jpg',
  },
  {
    rating: 4,
    text: 'Impressed with the beta version! The tips and daily insights have been spot on.',
    name: 'Amelia Wilson',
    location: 'Austin, USA',
    avatar: '/avatar3.jpg',
  },
  {
    rating: 5,
    text: "A must-have for expectant moms! The app's features are incredibly helpful, and the community aspect is a nice touch. Thank you for making my pregnancy more enjoyable!",
    name: 'Anmol Ahrol',
    location: 'Mumbai, India',
    avatar: '/avatar4.jpg',
  },
  {
    rating: 4,
    text: 'What a fantastic pregnancy app, but this one takes the cake. The beta version is polished, and the features are exactly what I needed. Well done!',
    name: 'Jai Hiroshi',
    location: 'Sydney, Australia',
    avatar: '/avatar5.jpg',
  },
];

export const TestimonialsSection = () => {
  const renderStars = (rating: number) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? (
              <StarFilled className={styles.starFilled} />
            ) : (
              <StarOutlined className={styles.starOutline} />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className={styles.title}>Testimonials</h2>
        <div className={styles.carouselWrapper}>
          <Carousel
            autoplay
            dots={true}
            autoplaySpeed={5000}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                },
              },
            ]}
            className={styles.carousel}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialSlide}>
                <div className={styles.testimonialCard}>
                  {renderStars(testimonial.rating)}
                  <p className={styles.testimonialText}>{testimonial.text}</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.avatarWrapper}>
                      <Image
                        src={testimonial.avatar || '/placeholder.svg'}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className={styles.avatar}
                      />
                    </div>
                    <div className={styles.authorInfo}>
                      <h4 className={styles.authorName}>{testimonial.name}</h4>
                      <p className={styles.authorLocation}>
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};
