import { Reference } from 'types/reference';

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
  currency: string;
  currencyCode: string;
}
