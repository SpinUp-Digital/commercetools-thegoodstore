import { CurrentRefinementsConnectorParamsRefinement } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { PriceConfiguration } from '../types';

export interface RefinementRemovedEvent {
  attribute: string;
}

export interface ProductListContextShape {
  pricesConfiguration: Record<string, PriceConfiguration>;
  numericRanges: Record<string, [number, number]>;
  updateNumericRange: (attribute: string, range: [number, number]) => void;
  updatePricesConfiguration: (newPricesConfiguration: Record<string, PriceConfiguration>) => void;
  removeRefinement: (refinement: CurrentRefinementsConnectorParamsRefinement) => void;
  removeAllRefinements: () => void;
}
