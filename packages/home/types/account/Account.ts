import { Group } from './Group';
import { Address } from './Address';

export interface Account {
  accountId?: string;
  email: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  password?: string; // TODO: should we use hash the password or use plain password?
  groups?: Group[];
  confirmationToken?: string;
  confirmed?: boolean;
  tokenValidUntil?: Date;
  addresses?: Address[];
  apiToken?: string;
}
