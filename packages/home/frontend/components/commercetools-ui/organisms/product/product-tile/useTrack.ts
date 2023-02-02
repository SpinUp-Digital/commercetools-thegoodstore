import { useCallback, useEffect, useRef } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { useInView } from 'react-intersection-observer';
import aa from 'search-insights';
import { productsIndex } from 'helpers/constants/algolia';
import { PRODUCT_VIEWED } from 'helpers/constants/events';
import useGetHitByProduct from 'helpers/hooks/useGetHitByProduct';

interface Options {
  product: Product;
}

const useTrack = ({ product }: Options) => {
  const { ref, inView } = useInView({ threshold: 0.8, triggerOnce: true });

  const getHitByProduct = useGetHitByProduct();

  const trackedView = useRef(false);

  const trackView = useCallback(async () => {
    if (inView && !trackedView.current) {
      const hit = await getHitByProduct(product);

      aa('viewedObjectIDs', {
        eventName: PRODUCT_VIEWED,
        objectIDs: [hit.objectID],
        index: productsIndex,
      });

      gtag('event', PRODUCT_VIEWED, product);

      trackedView.current = true;
    }
  }, [inView, product, getHitByProduct]);

  useEffect(() => {
    trackView();
  }, [trackView]);

  return { ref, trackView };
};

export default useTrack;
