import { Money } from '@commercetools/domain-types/product/Money';
import { Product } from '@commercetools/domain-types/product/Product';
import { Variant } from '@commercetools/domain-types/product/Variant';

export type UIProduct = {
  name: string;
  variants: Variant[];
  price: Money;
  images: UIImage[];
  colors: UIColor[];
  sizes: UISize[];
  description: string;
  details: UIDetail[];
} & Product;

interface UIImage {
  id: string;
  src: string;
  alt: string;
}

export interface UIColor {
  name: string;
  key: string;
  bgColor: string;
  selectedColor: string;
}

export interface UISize {
  label: string;
  key: string;
}

interface UIDetail {
  name: string;
  items: string[];
}
