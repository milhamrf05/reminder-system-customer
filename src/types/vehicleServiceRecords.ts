import { IntervalToNow } from './intervalToNow';

export interface VehicleServiceRecords {
  id: number;
  chassis_number: string;
  license_plate_number: string;
  interval_to_now: IntervalToNow;
  interval_to_now_id: number;
  last_service: string;
  customer_name: string;
  customer_phone_number: string;
  vehicle_model: string;
  delivery_date: string;
  service_advisor_name: string;
  program_name: string;
  sales_branch: string;
  created_at?: string;
  updated_at?: string;
}

export interface AddReminderCustomerForm {
  chassis_number: string;
  license_plate_number: string;
  interval_to_now: IntervalToNowLabel;
  last_service: string;
  customer_name: string;
  customer_phone_number: string;
  vehicle_model: string;
  delivery_date: string;
  service_advisor_name: string;
  program_name: string;
  sales_branch: string;
}

interface IntervalToNowLabel {
  label: string;
  value: number;
  id: number;
  name: string;
}
