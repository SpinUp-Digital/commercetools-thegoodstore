import { Result } from 'shared/types/product/Result';
import { ProductQuery } from 'shared/types/query/ProductQuery';
import { SDKResponse } from '@commercetools/frontend-sdk/lib/library/types';
import { Category } from 'shared/types/product/Category';
import { Inventory } from 'shared/types/product/inventory';

export interface Filter {
  type: 'boolean' | 'term' | 'range';
  identifier: string;
}

export interface UseProductReturn {
  categories?: Category[];
  query: (productQuery: ProductQuery) => Promise<SDKResponse<Result>>;
  getInventory: (sku: string) => Promise<Inventory>;
}
