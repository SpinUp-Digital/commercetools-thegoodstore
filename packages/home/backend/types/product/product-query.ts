import { ProductQuery as BaseProductQuery } from '@commercetools/frontend-domain-types/query/ProductQuery';

export interface ProductQuery extends BaseProductQuery {
  categories?: string[];
}
