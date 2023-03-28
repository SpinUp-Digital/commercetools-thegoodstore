import { Product as BaseProduct } from '@commercetools/frontend-domain-types/product/Product';
import { Variant as BaseVariant } from '@commercetools/frontend-domain-types/product/Variant';

export interface Variant extends BaseVariant {
  restockableInDays?: number;
}

export interface Product extends BaseProduct {
  variants: Variant[];
}
