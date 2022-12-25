import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { PriceConfiguration } from '../types';

interface ProductListContextShape {
  pricesConfiguration: Record<string, PriceConfiguration>;
  updatePricesConfiguration: (newPricesConfiguration: Record<string, PriceConfiguration>) => void;
}

const ProductListContext = createContext<ProductListContextShape>({
  pricesConfiguration: {},
  updatePricesConfiguration() {},
});

const ProductListProvider: React.FC = ({ children }) => {
  const [pricesConfiguration, setPricesConfiguration] = useState<Record<string, PriceConfiguration>>({});

  const updatePricesConfiguration = useCallback((newPricesConfiguration: Record<string, PriceConfiguration>) => {
    setPricesConfiguration(newPricesConfiguration);
  }, []);

  const value = useMemo(
    () => ({
      pricesConfiguration,
      updatePricesConfiguration,
    }),
    [pricesConfiguration, updatePricesConfiguration],
  );

  return <ProductListContext.Provider value={value}>{children}</ProductListContext.Provider>;
};

export default ProductListProvider;

export const useProductList = () => useContext(ProductListContext);
