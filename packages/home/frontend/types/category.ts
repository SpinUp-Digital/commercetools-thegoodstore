import { Category as BaseCategory } from '@commercetools/frontend-domain-types/product/Category';

export interface Category extends BaseCategory {
  parentId?: string;
  path?: string;
  subCategories: Category[];
}
