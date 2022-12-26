import { CurrentRefinementsConnectorParamsRefinement } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { PriceConfiguration } from '../types';

export interface RefinementRemovedEvent {
  attribute: string;
}

export interface ProductListContextShape {
  pricesConfiguration: Record<string, PriceConfiguration>;
  updatePricesConfiguration: (newPricesConfiguration: Record<string, PriceConfiguration>) => void;
  removeRefinement: (efinement: CurrentRefinementsConnectorParamsRefinement) => void;
  removeAllRefinements: () => void;
}
