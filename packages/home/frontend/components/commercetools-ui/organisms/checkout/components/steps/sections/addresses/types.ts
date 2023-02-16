export interface Address {
  addressId: string;
  name: string;
  email: string;
  phone?: string;
  line1: string;
  line2?: string;
  postalCode: string;
  city: string;
  addressType?: 'shipping' | 'billing';
}
