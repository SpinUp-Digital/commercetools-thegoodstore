/* eslint-disable react-hooks/rules-of-hooks*/

import useSWR from 'swr';
import { SDK } from 'sdk';
import { fetchApiHub, revalidateOptions } from 'frontastic';
import { UseProduct } from 'frontastic/provider/Frontastic/UseProduct';

export const query: UseProduct['query'] = async (productQuery) => {
  /* To Do: Use SDK instead of current workaround */

  // const extensions = SDK.getExtensions();

  // const res = await extensions.product.query({ query: productQuery });

  // return res;

  const params = new URLSearchParams();

  if (productQuery.query) params.set('query', productQuery.query);
  if (productQuery.limit) params.set('limit', productQuery.limit.toString());

  const res = await fetchApiHub(`/action/product/query?${params.toString()}`, SDK.locale);

  return { data: res, isError: false };
};

export const queryCategories = () => {
  const extensions = SDK.getExtensions();

  return useSWR('/action/product/queryCategories?limit=10', extensions.product.queryCategories, revalidateOptions);
};
