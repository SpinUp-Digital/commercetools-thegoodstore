import { Category } from '@commercetools/domain-types/product/Category';
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
  tileCategory: string;
  tileImage: NextFrontasticImage;
  tileHeaderText: string;
  tileHeaderDecoration: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  tileButtonLabel: string;
  tileButtonLabelDecoration: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  tileButtonLink: Reference;
}

export interface HeaderProps {
  links: Category[];
  markets: Market[];
  market: Market;
  logo: NextFrontasticImage;
  logoLink: Reference;
  tiles?: Tile[];
  handleMarket: (market: Market) => void;
  emptyCartTitle: string;
  emptyCartSubtitle: string;
  emptyCartImage: NextFrontasticImage;
  emptyCartCategories: Link[];
  emptyWishlistTitle: string;
  emptyWishlistSubtitle: string;
  emptyWishlistImage: NextFrontasticImage;
  emptyWishlistCategories: Link[];
}
