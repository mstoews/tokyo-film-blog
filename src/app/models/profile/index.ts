export interface IProfile {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  address_line1: string;
  address_line2: string;
  city: string;
  provence_state: string;
  postal_code: string;
  phone_number?: string;
}
