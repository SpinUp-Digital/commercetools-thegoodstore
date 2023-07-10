import { TaxPortion } from './TaxPortion';
import { Money } from '../product/Money';

export interface Tax {
  amount: Required<Money>;
  name?: string;
  taxPortions?: TaxPortion[];
}
