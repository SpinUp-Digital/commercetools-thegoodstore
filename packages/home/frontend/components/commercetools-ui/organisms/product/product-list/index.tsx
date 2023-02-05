import React, { useMemo } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { Category } from 'types/category';
import AccumalativeTrace from './components/accumalative-trace';
import Breadcrumbs from './components/breadcrumb';
import CurrentRefinements from './components/current-refinements';
import DesktopFacets from './components/desktop-facets';
import List from './components/list';
import MobileFacets from './components/mobile-facets';
import SearchHeader from './components/search-header';
import { useProductList } from './context';

export interface Props {
  categories: Category[];
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products, categories }) => {
  const { categoryId, searchQuery } = useProductList();

  const isValidCategoryId = useMemo(
    () => !!categories.find((category) => category.categoryId === categoryId),
    [categories, categoryId],
  );

  if (!searchQuery && !isValidCategoryId) return <></>;

  return (
    <div className="min-h-screen bg-neutral-200 py-48">
      <div className="relative mx-auto max-w-[1150px] px-12 md:px-24 2xl:max-w-[1248px]">
        {searchQuery ? (
          <SearchHeader query={searchQuery ?? ''} />
        ) : (
          <Breadcrumbs categories={categories} categoryId={categoryId} />
        )}

        <MobileFacets />
        <DesktopFacets />

        <CurrentRefinements />

        <List products={products} />

        <AccumalativeTrace currentItems={products.length} />
      </div>
    </div>
  );
};

export default ProductList;
