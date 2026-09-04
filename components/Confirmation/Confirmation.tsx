import styles from './Confirmation.module.scss';

type Props = {
  name: string;
  date: string;
  time: string;
  guests: string;
  onBookAgain: () => void;
};

export default function Confirmation({
  name,
  date,
  time,
  guests,
  onBookAgain,
}: Props) {
  return (
    <div className={styles.confirmation}>
      <h2>Бронирование подтверждено</h2>

      <div>
        <p>Имя: {name}</p>
        <p>Дата: {date}</p>
        <p>Время: {time}</p>
        <p>Гости: {guests}</p>
      </div>

      <button className='btn' type='button' onClick={onBookAgain}>
        Забронировать ещё
      </button>
    </div>
  );
}
