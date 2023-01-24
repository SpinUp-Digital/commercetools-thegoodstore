import { Result } from '@commercetools/frontend-domain-types/product/Result';
import { SDKResponse } from '@commercetools/frontend-sdk/lib/library/types';
import { SDK } from 'sdk';
import { Category } from 'types/category';

const PQ = SDK.getExtensions().product.query;

export interface UseProduct {
  data?: Category;
  query: (productQuery: Parameters<typeof PQ>[0]['query']) => Promise<SDKResponse<Result>>;
}
