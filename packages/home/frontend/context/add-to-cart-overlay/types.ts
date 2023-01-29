import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { Variant } from '@commercetools/frontend-domain-types/product/Variant';

export interface AddToCartOverlayContextShape {
  show: (product: Product, variant: Variant, count: number) => void;
  hide: () => void;
  fetchRelatedProducts: (product: Product) => Promise<void>;
}

export interface StateProduct extends Product, Variant {
  count: number;
}
