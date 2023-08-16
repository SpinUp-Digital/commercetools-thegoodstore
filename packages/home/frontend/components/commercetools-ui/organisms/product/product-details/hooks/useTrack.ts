import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Product } from 'shared/types/product/Product';
import {
  PDP_PRODUCT_ADDED_TO_CART,
  QUICK_VIEW_PRODUCT_ADDED_TO_CART,
  PDP_VIEWED,
  PDP_VIEWED_AFTER_SEARCH,
  QUICK_VIEW_PRODUCT_ADDED_TO_CART_AFTER_SEARCH,
  PDP_PRODUCT_ADDED_TO_CART_AFTER_SEARCH,
} from 'helpers/constants/events';

interface Options {
  product: Product;
  inModalVersion?: boolean;
}

const useTrack = ({ product, inModalVersion }: Options) => {
  const { query } = useRouter();

  const lastProductId = useRef<string>();

  const trackView = useCallback(async () => {
    if (product && product.productId !== lastProductId.current) {
      gtag('event', query.sr ? PDP_VIEWED_AFTER_SEARCH : PDP_VIEWED, { product });

      lastProductId.current = product.productId;
    }
  }, [product, query]);

  useEffect(() => {
    trackView();
  }, [trackView]);

  const trackAddToCart = useCallback(async () => {
    if (inModalVersion) {
      const eventName = query.sr ? QUICK_VIEW_PRODUCT_ADDED_TO_CART_AFTER_SEARCH : QUICK_VIEW_PRODUCT_ADDED_TO_CART;

      gtag('event', eventName, product);
    } else {
      const eventName = query.sr ? PDP_PRODUCT_ADDED_TO_CART_AFTER_SEARCH : PDP_PRODUCT_ADDED_TO_CART;
      gtag('event', eventName, product);
    }
  }, [product, query, inModalVersion]);

  return { trackAddToCart };
};

export default useTrack;
