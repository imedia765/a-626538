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
  yearly_payment_amount?: number;
  yearly_payment_due_date?: string;
  yearly_payment_status?: string;
  emergency_collection_amount?: number;
  emergency_collection_due_date?: string;
  emergency_collection_status?: string;
  emergency_collection_created_at?: string;
}