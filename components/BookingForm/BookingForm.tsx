'use client';

// type Props = {};
import { BookingFormData, BookingFormErrors } from '@/types/booking';
import { useEffect, useState } from 'react';
import Confirmation from '../Confirmation/Confirmation';
import styles from './BookingForm.module.scss';
import { GUESTS_COUNT, TIME_LIST } from './constants';
import { validateBookingForm } from './validation';

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '1',
  });

  const [error, setError] = useState<BookingFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateBookingForm(formData, today);
    setError(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsLoading(true);
  };

  if (isConfirmed) {
    return (
      <Confirmation
        name={formData.name}
        date={formData.date}
        time={formData.time}
        guests={formData.guests}
        onBookAgain={() => setIsConfirmed(false)}
      />
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit} action='' className={styles.inner}>
        <label>
          <span>Имя:</span>
          <input
            className={error.name ? styles.inputError : ''}
            onChange={handleChange}
            value={formData.name}
            type='text'
            name='name'
            placeholder='Введите номер'
            required
          />
        </label>
        {error.name && <span className={styles.error}>{error.name}</span>}
        <label>
          <span>Номер телефона:</span>
          <input
            className={error.phone ? styles.inputError : ''}
            onChange={handleChange}
            value={formData.phone}
            type='tel'
            name='phone'
            placeholder='Введите номер'
            required
          />
        </label>
        {error.phone && <span className={styles.error}>{error.phone}</span>}
        <label>
          <span>Выберите дату:</span>
          <input
            className={error.date ? styles.error : ''}
            onChange={handleChange}
            value={formData.date}
            min={today}
            type='date'
            name='date'
            required
          />
        </label>
        {error.date && <span className={styles.error}>{error.date}</span>}
        <label>
          <span>Выберите время:</span>
          <select
            className={error.time ? styles.inputError : ''}
            onChange={handleChange}
            value={formData.time}
            name='time'
            required
          >
            <option value='' disabled>
              Время:
            </option>
            {TIME_LIST.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
        {error.time && <span className={styles.error}>{error.time}</span>}
        <label>
          <span>Кол-во гостей</span>
          <select
            className={error.guests ? styles.inputError : ''}
            onChange={handleChange}
            value={formData.guests}
            name='guests'
            id=''
            required
          >
            {GUESTS_COUNT.map(count => {
              return (
                <option key={count} value={count}>
                  {count}
                </option>
              );
            })}
          </select>
        </label>
        {error.guests && <span className={styles.error}>{error.guests}</span>}

        <button className='btn' type='submit' disabled={isLoading}>
          {isLoading ? (
            <>
              <span className={styles.loader} />
              Бронируем...
            </>
          ) : (
            'Забронировать'
          )}
        </button>
      </form>
    </>
  );
}
