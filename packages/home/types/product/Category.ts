export interface Category {
  categoryId?: string;
  name?: string;
  depth?: number;
  _url?: string;
  slug?: string;
  parentId?: string;
  path?: string;
  subCategories: Category[];
}
