import useSWR from 'swr';
import { fetchApiHub, revalidateOptions } from 'frontastic';

export const queryCategories = () => {
  return useSWR('/action/product/queryCategories?limit=10', fetchApiHub, revalidateOptions);
};
