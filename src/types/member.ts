export interface Member {
  id: string;
  member_number: string;
  full_name: string;
  email?: string;
  phone?: string;
  status?: string;
  membership_type?: string;
  auth_user_id?: string;
  address?: string;
  town?: string;
  postcode?: string;
  role?: string;
  collector_id?: string;
  payment_amount?: number;
  payment_type?: string;
  payment_date?: string;
  payment_notes?: string;
}