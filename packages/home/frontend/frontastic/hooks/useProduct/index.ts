import { useCallback } from 'react';
import { ProductQuery } from '@commercetools/frontend-domain-types/query/ProductQuery';
import useSWR from 'swr';
import { SDK } from 'sdk';
import { Category } from 'types/category';
import { revalidateOptions } from 'frontastic';
import { UseProductReturn } from './types';

const useProduct = (): UseProductReturn => {
  const extensions = SDK.getExtensions();

  const categoriesResults = useSWR(
    '/action/product/queryCategories',
    () => extensions.product.queryCategories({ limit: 99 }),
    revalidateOptions,
  );

  const categories = (categoriesResults.data?.isError ? [] : (categoriesResults.data?.data?.items as Category[])) ?? [];

  const query = useCallback(async (productQuery: ProductQuery) => {
    /* To Do: Use SDK instead of current workaround */

    const extensions = SDK.getExtensions();

    const res = await extensions.product.query({ limit: productQuery.limit });

    return res;

    // const params = new URLSearchParams();

    // if (productQuery.query) params.set('query', productQuery.query);
    // if (productQuery.limit) params.set('limit', productQuery.limit);

    // const res = await fetchApiHub(`/action/product/query?${params.toString()}`, SDK.locale);

    // return { data: res, isError: false } as SDKResponse<Result>;
  }, []);

  return { categories, query };
};

export default useProduct;
