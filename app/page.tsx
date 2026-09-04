import BookingForm from '@/components/BookingForm/BookingForm';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <BookingForm />
    </main>
  );
}
