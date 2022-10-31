import { Account } from '@Types/account/Account';
import { Category } from '@Types/product/Category';
import { Reference } from 'types/reference';
import { NextFrontasticImage } from 'frontastic/lib/image';

export interface Link {
  name: string;
  reference: Reference;
}
export interface Market {
  region: string;
  flag: string;
  locale: string;
  currency: string;
  currencyCode: string;
}

export interface Tile {
  tileImage: NextFrontasticImage;
  tileHeaderText: string;
  tileButtonLabel: string;
  tileButtonLink: Reference;
}

export interface HeaderProps {
  links: Category[];
  linksMobile: Category[];
  markets: Market[];
  currentMarket: Market;
  cartItemCount: number;
  wishlistItemCount?: number;
  logo: NextFrontasticImage;
  logoLink: Reference;
  secondaryLogo: NextFrontasticImage;
  account: Account;
  accountLink: Reference;
  wishlistLink?: Reference;
  cartLink: Reference;
  tiles?: Tile[];
  handleCurrentMarket: (market: Market) => void;
}
