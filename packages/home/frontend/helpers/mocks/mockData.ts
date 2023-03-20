import { AccountToken } from '@commercetools/frontend-domain-types/account/AccountToken';
import { Address } from '@commercetools/frontend-domain-types/account/Address';
import { Group } from '@commercetools/frontend-domain-types/account/Group';
import { Cart } from '@commercetools/frontend-domain-types/cart/Cart';
import { LineItem as CartLineItem } from '@commercetools/frontend-domain-types/cart/LineItem';
import { ShippingMethod } from '@commercetools/frontend-domain-types/cart/ShippingMethod';
import { Money } from '@commercetools/frontend-domain-types/product/Money';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { Variant } from '@commercetools/frontend-domain-types/product/Variant';
import { LineItem } from '@commercetools/frontend-domain-types/wishlist/LineItem';
import { Wishlist } from '@commercetools/frontend-domain-types/wishlist/Wishlist';
import { Account } from 'types/account';
import { Order, ShippingInfo } from 'types/order';
import { NextFrontasticImage } from 'frontastic/lib/image';

export const billingAddress: Address = {
  addressId: 'F7dbZ3iR',
  city: 'New York',
  country: 'DE',
  firstName: 'Peter',
  lastName: 'Parker',
  phone: '+2 01124206669',
  postalCode: '10010',
  streetName: 'Queens',
  streetNumber: 'st.48',
};

export const shippingAddress: Address = {
  addressId: 'F7dbZ3iR',
  city: 'New Cairo',
  country: 'DE',
  firstName: 'Ahmed',
  lastName: 'Amir',
  phone: '+2 01124206669',
  postalCode: '10010',
  streetName: 'talaat harb',
  streetNumber: 'st.48',
};

export const variant: Variant = {
  groupId: '78695',
  id: '1',
  images: ['https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/078695_1_large.jpg'],
  sku: 'M0E20000000DSDJ',
  price: { centAmount: 71820, currencyCode: 'EUR', fractionDigits: 2 },
  isOnStock: true,
  attributes: { articleNumberManufacturer: '621540423 V0065', articleNumberMax: '78695', baseId: '78695', size: 'XXS' },
};

export const lineItemsOrderHistory: CartLineItem[] = [
  {
    lineItemId: '2b7427e1-d00b-4069-9731-a93aa92869c1',
    name: 'Freizeitjacke Stone Island schwarz',
    type: 'variant',
    _url: '/slug/p/M0E20000000DSDJ',
    count: 2,
    variant: variant,
    isGift: false,
    totalPrice: { centAmount: 71820, currencyCode: 'EUR', fractionDigits: 2 },
    price: { centAmount: 71820, currencyCode: 'EUR', fractionDigits: 2 },
  },
  {
    lineItemId: '2b7427e1-d00b-4069-9731-a93aa92869c1',
    name: 'Freizeitjacke Stone Island schwarz',
    type: 'variant',
    _url: '/slug/p/M0E20000000DSDJ',
    count: 2,
    variant: variant,
    isGift: false,
    totalPrice: { centAmount: 71820, currencyCode: 'EUR', fractionDigits: 2 },
    price: { centAmount: 71820, currencyCode: 'EUR', fractionDigits: 2 },
  },
];

export const moneyMock: Required<Money> = { centAmount: 71820, currencyCode: 'EUR', fractionDigits: 2 };

export const shippingInfoMock: ShippingInfo = {
  shippingMethodId: 'shipping-method-mock-id',
  price: moneyMock,
  discountedPrice: moneyMock,
};

const lineItems: LineItem[] = [
  {
    lineItemId: '0',
    _url: '/',
    addedAt: new Date(),
    count: 5,
    name: 'Some Article of clothing 1',
    type: 'Clothes',
    variant: {
      sku: 'SKU',
      images: ['https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg'],
    },
  },
  {
    lineItemId: '1',
    _url: '/',
    addedAt: new Date(),
    count: 5,
    name: 'Some Article of clothing 2',
    type: 'Clothes',
    variant: {
      sku: 'SKU',
      images: ['https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg'],
    },
  },
  {
    lineItemId: '2',
    _url: '/',
    addedAt: new Date(),
    count: 5,
    name: 'Some Article of clothing 3',
    type: 'Clothes',
    variant: {
      sku: 'SKU',
      images: ['https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg'],
    },
  },
];
export const wishlist: Wishlist = {
  wishlistId: '0',
  anonymousId: 'an',
  name: 'Wishlist Items',
  accountId: 'Acc-12-43',
  wishlistVersion: 'v 1.0',
  lineItems: lineItems,
};

export const accountToken: AccountToken = {
  token: 'token',
};

export const addresses: Address[] = [
  {
    addressId: 'adrs-1',
    city: 'Munster',
    country: 'Germany',
    firstName: 'Peter',
    lastName: 'Parker',
    phone: '+4 1233455666',
    state: 'MUNSTER',
    postalCode: '12345',
    streetName: 'Baker Street',
    streetNumber: '21st',
  },
];
export const groups: Group[] = [
  {
    groupId: 'grp-1',
    groupNameAll: '__SYSTEM_ALL',
    name: 'Name',
  },
  {
    groupId: 'grp-2',
    groupNameAll: '__SYSTEM_ALL',
    name: 'Name 2',
  },
];
export const account: Account = {
  email: 'spiderman@friendlyNeighbourhood.com',
  accountId: 'usr-12345',
  firstName: 'Peter',
  lastName: 'Parker',
  password: '123456789',
  birthday: new Date('1995, 11, 17'),
  apiToken: 'token',
  confirmationToken: accountToken,
  confirmed: true,
  salutation: 'Salutations',
  groups: groups,
  addresses: addresses,
};

export const frontasticImage: NextFrontasticImage = {
  media: {
    file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1646648997/m1qzalyiebn9boow3tth.webp',
    height: 66,
    mediaId: 'm1qzalyiebn9boow3tth',
    name: 'Logo',
    width: 142,
  },
};

export const headerLogo = { media: 'https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/test.png' };

export const headerButtonLink = {
  type: 'page-folder',
  pageFolder: {
    pageFolderId: '595b5c44de02a8957bc5821913e58fa2',
    name: 'Start',
    _urls: { de_CH: '/', fr_CH: '/', it_CH: '/', de_LI: '/' },
    _url: '/',
  },
  openInNewWindow: false,
};

export const headerAccountLink = {
  type: 'link',
  link: '/account',
  openInNewWindow: false,
};

export const headerLinks = [
  {
    name: 'Men',
    reference: {
      type: 'page-folder',
      pageFolder: {
        pageFolderId: 'b27378fbe05639798e9b23399a373bc0',
        name: 'Men',
        _urls: { de_CH: '/men', fr_CH: '/men', it_CH: '/men', de_LI: '/men' },
        _url: '/men',
      },
      openInNewWindow: false,
    },
  },
  {
    name: 'Women',
    reference: {
      type: 'page-folder',
      pageFolder: {
        pageFolderId: 'b27378fbe05639798e9b23399a373bc0',
        name: 'Men',
        _urls: { de_CH: '/men', fr_CH: '/men', it_CH: '/men', de_LI: '/men' },
        _url: '/men',
      },
      openInNewWindow: false,
    },
  },
];
