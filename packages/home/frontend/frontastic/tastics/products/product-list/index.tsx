import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Product } from 'shared/types/product/Product';
import { Facet } from 'shared/types/result/Facet';
import NotFound from 'components/commercetools-ui/organisms/not-found';
import ProductList, { Props as ProductListProps } from 'components/commercetools-ui/organisms/product/product-list';
import ProductListProvider, {
  useProductList,
} from 'components/commercetools-ui/organisms/product/product-list/context';
import {
  TermFacet,
  FacetConfiguration,
  PriceConfiguration,
} from 'components/commercetools-ui/organisms/product/product-list/types';
import { useFormat } from 'helpers/hooks/useFormat';
import { Category } from 'shared/types/product/Category';
import { Tastic } from 'types/tastic';

interface TasticProps {
  facetsConfiguration: FacetConfiguration[];
  pricesConfiguration: PriceConfiguration[];
}

export type Props = Tastic<
  ProductListProps & {
    items: Product[];
    category: string;
    facets: Facet[];
    previousCursor?: string;
    nextCursor?: string;
    total: number;
    totalItems: number;
  },
  TasticProps
> & {
  categories: Category[];
};

const ProductListWrapped: React.FC<Props> = ({ data, categories }) => {
  const { query } = useRouter();

  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const { updatePricesConfiguration, updateFacetsConfiguration, updateUiState, slug, searchQuery } = useProductList();

  const externalFacetsConfiguration = useMemo<Record<string, FacetConfiguration>>(() => {
    return (data.facetsConfiguration ?? []).reduce(
      (acc, configuration) => ({
        ...acc,
        [configuration.key]: configuration as FacetConfiguration,
      }),
      {},
    );
  }, [data.facetsConfiguration]);

  const pricesConfiguration = useMemo<Record<string, PriceConfiguration>>(() => {
    return (data.pricesConfiguration ?? []).reduce(
      (acc, configuration) => ({
        ...acc,
        [configuration.key]: {
          ranges: configuration.ranges,
        } as PriceConfiguration,
      }),
      {},
    );
  }, [data.pricesConfiguration]);

  useEffect(() => {
    updatePricesConfiguration(pricesConfiguration);
  }, [pricesConfiguration, updatePricesConfiguration]);

  const facetsConfiguration = useMemo<Record<string, FacetConfiguration>>(() => {
    const facets = data.data?.dataSource?.facets ?? [];

    const keys = Object.keys(externalFacetsConfiguration);

    facets.sort((a, b) => keys.indexOf(a.key) - keys.indexOf(b.key));

    return facets
      .filter((facet) => facet.key in externalFacetsConfiguration)
      .map((facet) => {
        if (facet.key === 'categories.id') {
          (facet as TermFacet).terms = (facet as TermFacet).terms.map((term) => ({
            ...term,
            label: categories.find((c) => c.categoryId === term.key)?.name ?? '',
          }));
        } else if (facet.type === 'boolean') {
          (facet as TermFacet).terms = (facet as TermFacet).terms.map((term) => ({
            ...term,
            label:
              term.key === 'T'
                ? externalFacetsConfiguration[facet.key].label
                : formatProductMessage({ id: 'regular', defaultMessage: 'Regular' }),
          }));
        }

        return facet;
      })
      .reduce(
        (acc, configuration) => ({
          ...acc,
          [configuration.key]: {
            ...configuration,
            label: externalFacetsConfiguration[configuration.key].label,
            type: externalFacetsConfiguration[configuration.key].type,
          } as FacetConfiguration,
        }),
        {},
      );
  }, [data.data?.dataSource?.facets, externalFacetsConfiguration, categories, formatProductMessage]);

  useEffect(() => {
    updateFacetsConfiguration(facetsConfiguration);
  }, [facetsConfiguration, updateFacetsConfiguration]);

  useEffect(() => {
    if (!data.data?.dataSource) return;

    updateUiState({
      slug: data.data?.dataSource?.category?.split('/').at(-1),
      searchQuery: query.q as string,
      previousCursor: data.data.dataSource.previousCursor,
      nextCursor: data.data.dataSource.nextCursor,
      totalItems: data.data.dataSource.total ?? data.data.dataSource.totalItems,
    });
  }, [data.data?.dataSource, updateUiState, query]);

  const isValidCategoryOrSearchQuery = useMemo(() => {
    if (searchQuery) return true;
    if (!slug) return true;
    return !!categories.find((c) => c.slug === slug);
  }, [searchQuery, slug, categories]);

  if (!data?.data) return <></>;

  if (!isValidCategoryOrSearchQuery) return <NotFound />;

  const { items } = data.data.dataSource;

  return <ProductList products={items} categories={categories} />;
};

const ProductListTastic: React.FC<Props> = ({ ...props }) => (
  <ProductListProvider>
    <ProductListWrapped {...props} />
  </ProductListProvider>
);

export default ProductListTastic;
