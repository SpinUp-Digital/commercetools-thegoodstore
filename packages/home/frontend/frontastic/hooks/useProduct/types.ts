import { Result } from '@commercetools/frontend-domain-types/product/Result';
import { SDKResponse } from '@commercetools/frontend-sdk/lib/library/types';
import { Category } from 'types/category';

export interface Filter {
  type: 'boolean' | 'term' | 'range';
  identifier: string;
}

export interface ProductQuery {
  category?: string;
  productIds?: string[];
  productType?: string;
  skus?: string[];
  query?: string;
  limit?: string;
  cursor?: string;
  filters?: Filter[];
  facets?: Filter[];
  sortAttributes?: Record<string, string>;
}

export interface UseProductReturn {
  categories?: Category[];
  query: (productQuery: ProductQuery) => Promise<SDKResponse<Result>>;
}
