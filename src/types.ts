export interface BookingRequest {
  parentName: string;
  email: string;
  phone: string;
  dueDate: string;
  careType: 'maternity' | 'postnatal' | 'doula' | 'midwife';
  notes?: string;
}

export interface CareService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}
