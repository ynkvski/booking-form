export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

export interface BookingFormErrors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
}
// Состояние формы
export type BookingStatus = 'idle' | 'loading' | 'success';
