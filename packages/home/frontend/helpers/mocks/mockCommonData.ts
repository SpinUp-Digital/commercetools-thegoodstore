import { LineItem } from '@commercetools/frontend-domain-types/cart/LineItem';

export const linkReferenceOne = {
  link: '/',
  openInNewWindow: false,
  type: 'link',
  _type: 'Frontastic\\Catwalk\\NextJsBundle\\Domain\\Api\\TasticFieldValue\\LinkReferenceValue',
};

export const linkReferenceTwo = {
  type: 'page-folder',
  pageFolder: {
    pageFolderId: 'b27378fbe05639798e9b23399a373bc0',
    name: 'Men',
    _urls: { de_CH: '/men', fr_CH: '/men', it_CH: '/men', de_LI: '/men' },
    _url: '/men',
  },
  openInNewWindow: false,
};

export const lineItems: LineItem[] = [
  {
    lineItemId: '2234-3333-0001',
    count: 3,
    name: 'Item number 1',
  },
  {
    lineItemId: '2234-3333-0002',
    count: 3,
    name: 'Item number 2',
  },
  {
    lineItemId: '2234-3333-0003',
    count: 3,
    name: 'Item number 3',
  },
  {
    lineItemId: '2234-3333-0004',
    count: 3,
    name: 'Item number 4',
  },
  {
    lineItemId: '2234-3333-0005',
    count: 3,
    name: 'Item number 5',
  },
];
