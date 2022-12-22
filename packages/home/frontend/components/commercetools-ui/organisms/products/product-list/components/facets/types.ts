import { PriceConfiguration } from '../../types';

export interface FacetProps {
  attribute: string;
  label: string;
  pricesConfiguration?: Record<string, PriceConfiguration>;
}
