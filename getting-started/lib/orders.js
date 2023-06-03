import { ordersService, ordersImportService } from './services';
import { logAndExit, execute, createStandardDelete } from './helpers';
const nconf = require('nconf');

export const deleteAllOrders = createStandardDelete({
  itemName: 'orders',
  service: ordersService,
});

const lineItemDraft = (item) => {
  const [currencyCode, centAmount] = item.lineItems.price.split(' ');

  return {
    name: item.lineItems.name,
    variant: {
      sku: item.lineItems.variant.sku,
    },
    price: {
      value: {
        currencyCode,
        centAmount: +centAmount,
        fractionDigits: 2,
      },
    },
    quantity: parseInt(item.lineItems.quantity),
  };
};

const orderDraft = (item) => {
  const [currencyCode, centAmount] = item.totalPrice.split(' ');
  const [itemCurrencyCode, itemCentAmount] = item.lineItems.price.split(' ');

  return {
    /* eslint quote-props: ["error", "consistent"] */
    customerEmail: item.customerEmail,
    orderNumber: item.orderNumber,
    lineItems: [
      {
        name: item.lineItems.name,
        variant: {
          sku: item.lineItems.variant.sku,
        },
        price: {
          value: {
            currencyCode: itemCurrencyCode,
            centAmount: +itemCentAmount,
            fractionDigits: 2,
          },
        },
        quantity: parseInt(item.lineItems.quantity),
      },
    ],
    totalPrice: {
      currencyCode,
      centAmount: +centAmount,
      fractionDigits: 2,
    },
  };
};

export const importOrders = () =>
  require('csvtojson')()
    .fromFile(process.cwd() + '/data/orders.csv')
    .then((rawJson) => [
      ...rawJson
        .reduce((result, item) => {
          const order = result.get(item.orderNumber);
          if (order) {
            order.lineItems.push(lineItemDraft(item));
            order.store = {
              typeId: 'store',
              key: 'the-good-store',
            };
            return result;
          }
          return result.set(item.orderNumber, orderDraft(item));
        }, new Map())
        .values(),
    ])
    .then((orders) =>
      Promise.all(
        orders.map((order) =>
          execute({
            uri: ordersImportService.build(),
            method: 'POST',
            body: order,
          }),
        ),
      ),
    )
    .then(() =>
      // eslint-disable-next-line no-console
      console.log('\x1b[32m%s\x1b[0m', 'Orders imported'),
    )
    .catch((err) => logAndExit(err, 'Failed to import orders'));

if (nconf.get('clean')) {
  deleteAllOrders();
} else if (nconf.get('import')) {
  // eslint-disable-next-line no-console
  console.log('\x1b[32m%s\x1b[0m', 'Importing orders...');
  importOrders();
}
