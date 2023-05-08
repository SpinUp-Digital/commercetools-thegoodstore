import React, { useMemo } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import Wrapper from 'components/HOC/wrapper';
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
  const { slug, searchQuery } = useProductList();

  const category = useMemo(() => categories.find((category) => category.slug === slug), [categories, slug]);

  return (
    <div className="min-h-screen bg-neutral-200 py-48">
      <Wrapper className="relative" background="neutral-200">
        {searchQuery ? (
          <SearchHeader query={searchQuery ?? ''} />
        ) : (
          <Breadcrumbs categories={categories} categoryId={category?.categoryId} />
        )}

        <MobileFacets />
        <DesktopFacets />

        <CurrentRefinements />

        <List products={products} />

        <AccumalativeTrace currentItems={products.length} />
      </Wrapper>
    </div>
  );
};

export default ProductList;
