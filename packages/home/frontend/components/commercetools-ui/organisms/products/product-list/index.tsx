import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Hit } from 'instantsearch.js';
import {
  ClearRefinements,
  Configure,
  InfiniteHits,
  RangeInput,
  RefinementList,
  SortBy,
  useHits,
} from 'react-instantsearch-hooks-web';
import { DropdownClassNames, FacetDropdown } from 'components/commercetools-ui/atoms/facet-dropdown';
import Link from 'components/commercetools-ui/atoms/link';
import { productsIndex } from 'helpers/constants/algolia';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import Breadcrumb from 'components/commercetools-ui/organisms/breadcrumb';
import { useFormat } from 'helpers/hooks/useFormat';
import ProductTile from '../tile';
import { Category } from 'types/category';

interface Props {
  serverUrl: string;
  categories: Category[];
}

const ProductList: React.FC<Props> = ({ serverUrl, categories }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const dropdownClassNames = { button: 'bg-white rounded-md' } as Partial<DropdownClassNames>;

  const categoryIdChunks = serverUrl.split('/');
  const categoryId = categoryIdChunks[categoryIdChunks.length - 1];

  const searchQuery = categoryId.split('?q=')[1]?.split('&')?.[0];

  const router = useRouter();

  const parentCategories = useMemo(() => {
    if (!router?.query?.path) return [];

    const categoryIdChunks = (router.query.path as string).slice(1).split('/').slice(0, -1);

    return categoryIdChunks.map((id) => (categories.find((category) => category.categoryId === id) ?? {}) as Category);
  }, [router, categories]);

  const currentCategory = useMemo(() => {
    return (categories.find((category) => category.categoryId === categoryId) ?? {}) as Category;
  }, [categories, categoryId]);

  const subCategories = useMemo(() => {
    return ((categories.find((category) => category.categoryId === categoryId) as Category)?.subCategories ??
      []) as Category[];
  }, [categories, categoryId]);

  const {
    hits,
    results: { nbHits, page, nbPages, hitsPerPage },
  } = useHits();

  const accumulativeHitsCount = page === 0 ? hits.length : (nbPages - page) * hitsPerPage + hits.length;

  if (!searchQuery && !categoryId) return <></>;

  return (
    <div className="bg-neutral-200 py-52">
      <Configure
        hitsPerPage={24}
        {...(!searchQuery ? { filters: `categories.categoryId:${categoryId}` } : { query: searchQuery })}
      />
      <div className="flex flex-col items-center">
        <Breadcrumb Separator="/">
          {parentCategories.map((category) => (
            <Link key={category.categoryId} link={category.path} className="text-12">
              {category.name}
            </Link>
          ))}

          {currentCategory && (
            <Link key={currentCategory.categoryId} link={currentCategory.path} className="text-12">
              {currentCategory.name}
            </Link>
          )}
        </Breadcrumb>
        <h1 className="mt-20 text-28 leading-[35px]">{currentCategory.name}</h1>
        {subCategories?.length > 0 && (
          <Breadcrumb className="mt-32">
            <Link
              link={currentCategory.path}
              className="mr-8 rounded-md border border-gray-700 bg-gray-700 py-8 px-16 text-12 leading-[16px] text-white"
            >
              {formatProductMessage({ id: 'items.all', defaultMessage: 'All items' })}
            </Link>
            {subCategories.map((category) => (
              <Link
                key={category.categoryId}
                link={category.path}
                className="mr-8 rounded-md border border-gray-700 bg-transparent py-8 px-16 text-12 leading-[16px] text-primary-black transition hover:bg-gray-700 hover:text-white"
              >
                {category.name}
              </Link>
            ))}
          </Breadcrumb>
        )}
      </div>
      <div className="relative mx-auto mt-52 max-w-[1150px] px-12 md:px-24 2xl:max-w-[1248px]">
        <div className="flex items-center justify-between border-b border-neutral-400 pb-16">
          <div className="flex items-center gap-12">
            <FacetDropdown
              buttonText={formatProductMessage({ id: 'color', defaultMessage: 'Color' })}
              classNames={dropdownClassNames}
            >
              <RefinementList attribute="variants.attributes.colorlabel" />
            </FacetDropdown>
            <FacetDropdown
              buttonText={formatProductMessage({ id: 'price', defaultMessage: 'Price' })}
              classNames={dropdownClassNames}
            >
              <RangeInput attribute="variants.price.centAmount" />
            </FacetDropdown>
            <ClearRefinements classNames={{ button: 'disabled:hidden' }} />
          </div>
          <span>
            {nbHits} {formatProductMessage({ id: 'items', defaultMessage: 'Items' })}
          </span>
        </div>
        <div className="flex items-center gap-16 py-16">
          <span>{formatProductMessage({ id: 'sortBy', defaultMessage: 'Sort by' })}: </span>
          <SortBy
            items={[
              { label: formatProductMessage({ id: 'relevance', defaultMessage: 'Relevance' }), value: productsIndex },
            ]}
          />
        </div>
        <InfiniteHits
          showPrevious={false}
          hitComponent={({ hit }: { hit: Hit<Partial<Product>> }) => <ProductTile product={hit as Product} />}
          classNames={{
            root: 'pt-4',
            list: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24',
            loadMore:
              'mx-auto bg-primary-black rounded-md font-medium text-white text-16 px-48 py-12 block mt-[90px] hover:bg-gray-500 transition disabled:bg-neutral-400',
          }}
          translations={{
            showMoreButtonText: formatProductMessage({ id: 'load.more', defaultMessage: 'Load More' }),
          }}
        />
        <div className="absolute bottom-72 left-1/2 -translate-x-1/2">
          <p>
            {formatProductMessage({
              id: 'showing',
              defaultMessage: 'Showing {current} of {total}',
              values: { current: accumulativeHitsCount, total: nbHits },
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
