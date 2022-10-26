import { Account } from '@Types/account/Account';
import { Category } from '@Types/product/Category';
import { Reference } from 'types/reference';
import { NextFrontasticImage } from 'frontastic/lib/image';
import { Market } from './interfaces';

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
