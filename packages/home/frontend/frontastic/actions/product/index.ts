import useSWR from 'swr';
import { fetchApiHub, revalidateOptions, getExtensions } from 'frontastic';

export const queryCategories = () => {
  const extensions = getExtensions();

  return useSWR('/action/product/queryCategories?limit=10', extensions.queryProductCategories, revalidateOptions);
};
