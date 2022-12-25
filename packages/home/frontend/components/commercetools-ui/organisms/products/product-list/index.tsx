import React, { useCallback, useMemo, useState } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { Hit } from 'instantsearch.js';
import { Configure, InfiniteHits, useHits } from 'react-instantsearch-hooks-web';
import { useFormat } from 'helpers/hooks/useFormat';
import { Category } from 'types/category';
import ProductTile from '../tile';
import DesktopFacets from './components/desktop-facets';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop } from 'helpers/utils/screensizes';
import { FacetConfiguration } from './types';
import Breadcrumbs from './components/breadcrumb';
import AccumalativeTrace from './components/accumalative-trace';
import SearchHeader from './components/search-header';

interface Props {
  categoryId?: string;
  searchQuery?: string;
  categories: Category[];
  facetsConfiguration: Record<string, FacetConfiguration>;
}

const ProductList: React.FC<Props> = ({ categoryId, searchQuery, categories, facetsConfiguration }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const {
    results: { nbHits },
  } = useHits();

  const [isDesktop] = useMediaQuery(desktop);

  if (!searchQuery && !categoryId) return <></>;

  return (
    <div className="bg-neutral-200 py-52">
      <Configure query={searchQuery} filters={!searchQuery ? `categories.categoryId:${categoryId}` : ''} />

      <div className="relative mx-auto mt-52 max-w-[1150px] px-12 md:px-24 2xl:max-w-[1248px]">
        <Breadcrumbs categories={categories} categoryId={categoryId} />
        <SearchHeader count={nbHits} query={searchQuery} />

        <DesktopFacets facetsConfiguration={facetsConfiguration} />

        <InfiniteHits
          showPrevious={false}
          hitComponent={({ hit }: { hit: Hit<Partial<Product>> }) => <ProductTile product={hit as Product} />}
          classNames={{
            root: 'pt-4',
            list: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 min-h-screen',
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

export default ProductList;
