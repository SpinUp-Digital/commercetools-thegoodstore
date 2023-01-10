import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CurrentRefinementsConnectorParamsRefinement } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { useClearRefinements, useCurrentRefinements } from 'react-instantsearch-hooks';
import { PriceConfiguration } from '../types';
import { refinementRemovedEventName, refinementsClearedEventName } from './constants';
import { ProductListContextShape, RefinementRemovedEvent } from './types';

export const ProductListContext = createContext<ProductListContextShape>({
  pricesConfiguration: {},
  numericRanges: {},
  updateNumericRange() {},
  updatePricesConfiguration() {},
  removeRefinement() {},
  removeAllRefinements() {},
});

const ProductListProvider: React.FC = ({ children }) => {
  const [pricesConfiguration, setPricesConfiguration] = useState<Record<string, PriceConfiguration>>({});
  const [numericRanges, setNumericRanges] = useState<Record<string, [number, number]>>({});

  const { items, refine } = useCurrentRefinements();
  const { refine: clearAllRefinements } = useClearRefinements();

  const updatePricesConfiguration = useCallback((newPricesConfiguration: Record<string, PriceConfiguration>) => {
    setPricesConfiguration(newPricesConfiguration);
  }, []);

  const updateNumericRange = useCallback((attribute: string, range: [number, number]) => {
    setNumericRanges((numericRanges) => ({ ...numericRanges, [attribute]: range }));
  }, []);

  const removeNumericRefinement = useCallback(
    (refinement: CurrentRefinementsConnectorParamsRefinement) => {
      items.forEach((item) => {
        item.refinements.forEach((r) => {
          if (r.attribute === refinement.attribute) refine(r);
        });
      });
    },
    [items, refine],
  );

  const removeRefinement = useCallback(
    (refinement: CurrentRefinementsConnectorParamsRefinement) => {
      if (refinement.type === 'numeric') removeNumericRefinement(refinement);
      else refine(refinement);

      window.dispatchEvent(
        new CustomEvent<RefinementRemovedEvent>(refinementRemovedEventName, {
          detail: { attribute: refinement.attribute },
        }),
      );
    },
    [refine, removeNumericRefinement],
  );

  const removeAllRefinements = useCallback(() => {
    clearAllRefinements();

    window.dispatchEvent(new CustomEvent(refinementsClearedEventName));
  }, [clearAllRefinements]);

  const value = useMemo(
    () => ({
      pricesConfiguration,
      numericRanges,
      updateNumericRange,
      updatePricesConfiguration,
      removeRefinement,
      removeAllRefinements,
    }),
    [
      pricesConfiguration,
      numericRanges,
      updateNumericRange,
      updatePricesConfiguration,
      removeRefinement,
      removeAllRefinements,
    ],
  );

  return <ProductListContext.Provider value={value}>{children}</ProductListContext.Provider>;
};

export default ProductListProvider;

export const useProductList = () => useContext(ProductListContext);
