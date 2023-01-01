import { useCallback } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { searchClient } from 'algolia/searchClient';
import { productsIndex } from 'helpers/constants/algolia';

const useGetHitByProduct = () => {
  const getHitByProduct = useCallback(async (product: Product) => {
    const index = searchClient.initIndex(productsIndex);

    const results = await index.search('', { filters: `productId:${product.productId}` });

    const hit = results.hits[0];

    return hit;
  }, []);

  return getHitByProduct;
};

export default useGetHitByProduct;
