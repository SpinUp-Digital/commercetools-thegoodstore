import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CurrentRefinementsConnectorParamsRefinement } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { useClearRefinements, useCurrentRefinements } from 'react-instantsearch-hooks';
import { PriceConfiguration } from '../types';
import { refinementRemovedEventName, refinementsClearedEventName } from './constants';
import { ProductListContextShape, RefinementRemovedEvent } from './types';

export const ProductListContext = createContext<ProductListContextShape>({
  pricesConfiguration: {},
  updatePricesConfiguration() {},
  removeRefinement() {},
  removeAllRefinements() {},
});

const ProductListProvider: React.FC = ({ children }) => {
  const [pricesConfiguration, setPricesConfiguration] = useState<Record<string, PriceConfiguration>>({});

  const { refine } = useCurrentRefinements();
  const { refine: clearAllRefinements } = useClearRefinements();

  const updatePricesConfiguration = useCallback((newPricesConfiguration: Record<string, PriceConfiguration>) => {
    setPricesConfiguration(newPricesConfiguration);
  }, []);

  const removeRefinement = useCallback(
    (refinement: CurrentRefinementsConnectorParamsRefinement) => {
      refine(refinement);

      window.dispatchEvent(
        new CustomEvent<RefinementRemovedEvent>(refinementRemovedEventName, {
          detail: { attribute: refinement.attribute },
        }),
      );
    },
    [refine],
  );

  const removeAllRefinements = useCallback(() => {
    clearAllRefinements();

    window.dispatchEvent(new CustomEvent(refinementsClearedEventName));
  }, [clearAllRefinements]);

  const value = useMemo(
    () => ({
      pricesConfiguration,
      updatePricesConfiguration,
      removeRefinement,
      removeAllRefinements,
    }),
    [pricesConfiguration, updatePricesConfiguration, removeRefinement, removeAllRefinements],
  );

  return <ProductListContext.Provider value={value}>{children}</ProductListContext.Provider>;
};

export default ProductListProvider;

export const useProductList = () => useContext(ProductListContext);
