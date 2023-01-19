import React, { useMemo } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { Configure, InfiniteHits } from 'react-instantsearch-hooks-web';
import { PLP_PRODUCT_CLICKED } from 'helpers/constants/events';
import { useFormat } from 'helpers/hooks/useFormat';
import { Category } from 'types/category';
import ProductTile from '../tile';
import AccumalativeTrace from './components/accumalative-trace';
import Breadcrumbs from './components/breadcrumb';
import CurrentRefinements from './components/current-refinements';
import DesktopFacets from './components/desktop-facets';
import MobileFacets from './components/mobile-facets';
import SearchHeader from './components/search-header';
import { FacetConfiguration } from './types';

interface Props {
  categoryId?: string;
  searchQuery?: string;
  categories: Category[];
  facetsConfiguration: Record<string, FacetConfiguration>;
}

const ProductListAlgolia: React.FC<Props> = ({ categoryId, searchQuery, categories, facetsConfiguration }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const isValidCategoryId = useMemo(
    () => !!categories.find((category) => category.categoryId === categoryId),
    [categories, categoryId],
  );

  if (!searchQuery && !categoryId) return <></>;

  return (
    <div className="min-h-screen bg-neutral-200 py-48">
      <Configure
        query={searchQuery}
        filters={isValidCategoryId ? `categories.categoryId:${categoryId}` : ''}
        maxValuesPerFacet={1000}
      />

      <div className="relative mx-auto max-w-[1150px] px-12 md:px-24 2xl:max-w-[1248px]">
        {searchQuery ? (
          <SearchHeader query={searchQuery ?? ''} />
        ) : (
          <Breadcrumbs categories={categories} categoryId={categoryId} />
        )}

        <MobileFacets facetsConfiguration={facetsConfiguration} />
        <DesktopFacets facetsConfiguration={facetsConfiguration} />

        <CurrentRefinements />

        <InfiniteHits
          showPrevious={false}
          hitComponent={({ hit, sendEvent }) => (
            <ProductTile
              product={hit as unknown as Product}
              isSearchResult={!!searchQuery}
              onClick={() => {
                sendEvent('click', hit, PLP_PRODUCT_CLICKED);
                gtag('event', PLP_PRODUCT_CLICKED, hit);
              }}
            />
          )}
          classNames={{
            root: 'pt-32',
            list: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24',
            loadMore:
              'mx-auto bg-primary-black rounded-md font-medium text-white text-16 px-48 py-12 block mt-[90px] hover:bg-gray-500 transition disabled:bg-neutral-400 disabled:opacity-0',
          }}
          translations={{
            showMoreButtonText: formatProductMessage({ id: 'load.more', defaultMessage: 'Load More' }),
          }}
        />

        <AccumalativeTrace />
      </div>
    </div>
  );
};

export default ProductListAlgolia;
