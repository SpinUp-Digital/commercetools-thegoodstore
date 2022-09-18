import { Currency } from '@adyen/adyen-web/dist/types/components/AmazonPay/types';
import { Reference } from 'helpers/reference';

export interface Link {
  name: string;
  reference: Reference;
}
export interface Category {
  title?: string;
  navLink?: Link;
  subCategories?: Category[];
}
export interface Market {
  region: string;
  flag: string;
  locale: string;
  currency: Currency;
  currencyCode: string;
}
