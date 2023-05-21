import { Result } from '@commercetools/frontend-domain-types/product/Result';
import { ProductQuery } from '@commercetools/frontend-domain-types/query/ProductQuery';
import { SDKResponse } from '@commercetools/frontend-sdk/lib/library/types';
import { Category } from 'types/category';
import { Inventory } from 'types/inventory';

export interface Filter {
  type: 'boolean' | 'term' | 'range';
  identifier: string;
}

export interface UseProductReturn {
  categories?: Category[];
  query: (productQuery: ProductQuery) => Promise<SDKResponse<Result>>;
  getInventory: (sku: string) => Promise<Inventory>;
}
