import { BookingFormData, BookingFormErrors } from '@/types/booking';

export function validateBookingForm(
  formData: BookingFormData,
  today: string,
): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (formData.name.trim().length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа';
  }

  const phoneValue = formData.phone.replace(/[\s()-]/g, '');

  if (!phoneValue) {
    errors.phone = 'Введите номер телефона';
  } else if (!/^(?:\+7|8)\d{10}$/.test(phoneValue)) {
    errors.phone = 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
  }

  if (!formData.date) {
    errors.date = 'Выберите дату';
  } else if (formData.date < today) {
    errors.date = 'Дата не может быть раньше сегодняшнего дня';
  }

  if (!formData.time) {
    errors.time = 'Выберите время';
  }

  const guestsCount = Number(formData.guests);

  if (guestsCount < 1 || guestsCount > 12) {
    errors.guests = 'Количество гостей должно быть от 1 до 12';
  }

  return errors;
}
