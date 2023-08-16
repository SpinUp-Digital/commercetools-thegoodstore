import { SingleBar, Presets } from 'cli-progress';
import { productsService, productTypesService, customerGroupService, channelsService } from './services';
import { execute, NONE, getAll, setByKey, setBy, readJson, logAndExit, createStandardDelete } from './helpers';

require('dotenv').config();
const nconf = require('nconf');

export const deleteAllProducts = createStandardDelete({
  itemName: 'products',
  service: productsService,
  deleteFunction: (product) =>
    Promise.resolve(
      product.masterData.published
        ? execute({
            uri: productsService.byId(product.id).build(),
            method: 'POST',
            body: {
              version: product.version,
              actions: [
                {
                  action: 'unpublish',
                },
              ],
            },
          }).then(({ body }) => body)
        : product,
    ).then((product) =>
      execute({
        uri: productsService.byId(product.id).withVersion(product.version).build(),
        method: 'DELETE',
      }),
    ),
});

export const deleteAllProductTypes = createStandardDelete({
  itemName: 'product types',
  service: productTypesService,
});

export const importProductTypes = () => {
  const typesPath = process.cwd() + '/data/product-type.json';

  return readJson(typesPath)
    .then((productTypes) =>
      Promise.all(
        productTypes.map((element) => {
          const updateRequest = {
            uri: productTypesService.build(),
            method: 'POST',
            body: element,
          };
          return execute(updateRequest);
        }),
      ),
    )
    .then(() =>
      // eslint-disable-next-line no-console
      console.log('\x1b[32m%s\x1b[0m', 'Product types imported'),
    )
    .catch((error) => logAndExit(error, 'Failed to import product types'));
};
const asSlugsEn = (categoryString) =>
  categoryString
    .toLowerCase()
    .split(';')
    .filter((c) => c)
    .map((c) => c.replace(/>|\s/g, '-'));
const withCategories = (allCategories, categories) => {
  return asSlugsEn(categories)
    .map((slug) => {
      const category = allCategories.get(slug);
      if (!category) return;
      return { key: category.key };
    })
    .filter(Boolean);
};
const groupProducts = (products) =>
  products
    .map((p) => ({
      ...p,
      variantIdNum: Number(p.variantId),
    }))
    .reduce((grouped, product) => {
      if (product.variantIdNum === 1) {
        grouped.push([product]);
        return grouped;
      }

      grouped[grouped.length - 1].push(product);
      return grouped;
    }, []);

const toPrice = (customerGroups, channels) => (stringPrice) => {
  const [currencyCode, amount, custGroup] = stringPrice.split(/\s/);
  const [newAmount, channel] = amount.split('#');
  const [cntry, newCurrencyCode] = currencyCode.split(/-/);

  const channelInfo = channel && {
    channel: {
      typeId: 'channel',
      id: channels.get(channel).id,
    },
  };
  let centAmount = Number(channel ? newAmount : amount);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(centAmount)) {
    // prices like 1|2; 2 will be ignored
    centAmount = Number((channel ? newAmount : amount).split('|')[0]);
  }
  const customerGroup = custGroup
    ? {
        customerGroup: {
          typeId: 'customer-group',
          id: customerGroups.get(custGroup).id,
        },
      }
    : {};
  const country = newCurrencyCode ? { country: cntry } : {};
  return {
    value: {
      currencyCode: newCurrencyCode || currencyCode,
      centAmount,
    },
    ...customerGroup,
    ...country,
    ...channelInfo,
  };
};
const toPrices = (stringPrices, customerGroups, channels) =>
  stringPrices
    .split(';')
    .map(toPrice(customerGroups, channels))
    .filter((x) => x);

const toImage = (image) => {
  const [url, dimensions] = image.split('||');

  let w = 0,
    h = 0;

  if (dimensions) [w, h] = dimensions.split('x');

  return {
    url,
    dimensions: { w: +w, h: +h },
  };
};
const removeEmpty = (o) => {
  const ret = Object.entries(o ?? {}).reduce(
    (result, [key, value]) => (value !== '' ? ((result[key] = value), result) : result),
    {},
  );
  return Object.keys(ret).length === 0 ? NONE : ret;
};
const noAllEmpty = (o) => (Object.keys(o).length === 0 ? undefined : o);
const toImages = (images) => images.split(';').map(toImage);
const toAttribute = (attributeName, value, attributeType) => {
  if (value === undefined || value === '') {
    return NONE;
  }
  if (attributeType.name === 'boolean') {
    value = value === 'TRUE';
  }
  // "dateTime","lenum", "enum" and "text" don't need anything
  if (attributeType.name === 'set') {
    if (attributeType.elementType.name === 'text') {
      return {
        name: attributeName,
        value: value.split(';').filter((x) => x),
      };
    }
    // details is set of ltext but does not have a value for any product
    //  therefor it is ignored for now
    return NONE;
  }

  if (attributeType.name === 'ltext') {
    value = removeEmpty(value);
    if (Object.keys(value).length === 0) {
      return NONE;
    }
  }

  return {
    name: attributeName,
    value,
  };
};
const createVariant = (customerGroups, channels, attributesByType, productType) => (product) => {
  const { variantId, sku, prices, images, variantKey } = product;

  return {
    id: Number(variantId),
    key: variantKey || sku,
    attributes: attributesByType
      .get(productType)
      .map(([attributeName, attributeType]) => toAttribute(attributeName, product[attributeName], attributeType))
      .filter((attribute) => attribute !== NONE),
    sku,
    prices: toPrices(prices, customerGroups, channels),
    images: toImages(images),
  };
};
const toProduct = (categoriesById, customerGroups, channels, attributesByType, productTypes) => (products) => {
  const { productType: productTypeName, tax, categories, name, baseId, slug } = products[0];

  const productType = productTypes.find((t) => t.name === productTypeName).key;

  if (Object.keys(removeEmpty(name)).length === 0) {
    return {
      type: NONE,
      products,
      rejected: 'empty name',
    };
  }

  if (Object.keys(removeEmpty(slug)).length === 0) {
    return {
      type: NONE,
      products,
      rejected: 'empty slug',
    };
  }

  if (!products[0].prices || !productType || !tax) return;

  const metaDescription = noAllEmpty(removeEmpty(products[0].description));
  const metaTitle = noAllEmpty(removeEmpty(products[0].metaTitle));
  const metaKeywords = noAllEmpty(removeEmpty(products[0].metaKeywords));
  const mainProduct = {
    key: baseId,
    productType: { key: productType }, // is ok
    masterVariant: createVariant(customerGroups, channels, attributesByType, productType)(products[0]),
    taxCategory: {
      key: tax,
    },
    categories: withCategories(categoriesById, categories),
    variants: products.slice(1).map(createVariant(customerGroups, channels, attributesByType, productType)),
    name: removeEmpty(name),
    slug: removeEmpty(slug),
    publish: true,
    metaDescription,
    metaTitle,
    metaKeywords,
  };

  return mainProduct;
};

export const importProducts = (productPath, categoriesPath, typesPath, limit = Number.POSITIVE_INFINITY) => {
  const csv = require('csvtojson');

  const notifySave = new SingleBar(
    {
      format: 'Save products      {bar} |' + '| {percentage}% || {value}/{total} master variants',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
    },
    Presets.rect,
  );

  return Promise.resolve()
    .then(() =>
      Promise.all(
        [productPath, categoriesPath]
          .map((path) => csv().fromFile(path))
          .concat([
            getAll(
              execute,
              customerGroupService,
            )({
              method: 'GET',
            }),
            getAll(
              execute,
              channelsService,
            )({
              method: 'GET',
            }),
            readJson(typesPath),
          ]),
      ),
    )
    .then(([rawProducts, rawCategories, customerGroups, channels, productTypes]) => {
      const categoriesById = setBy((x) => x.key)(rawCategories);
      const customerGroupsByKey = setByKey(customerGroups);
      const channelsByKey = setByKey(channels);
      const attributesByType = [...setBy((x) => x.key)(productTypes).entries()].reduce(
        (result, [key, value]) =>
          result.set(
            key,
            value.attributes.map((v) => [v.name, v.type]),
          ),
        new Map(),
      );

      const groupedProducts = groupProducts(rawProducts).slice(0, limit);
      notifySave.start(groupedProducts.length, 0, {});
      let processed = 0;
      const productsToSave = groupedProducts
        .map(toProduct(categoriesById, customerGroupsByKey, channelsByKey, attributesByType, productTypes))
        .filter(Boolean);

      return Promise.all(
        productsToSave.map(
          // product => product
          (product) =>
            execute({
              uri: productsService.build(),
              method: 'POST',
              body: product,
            }).then((item) => {
              notifySave.update(++processed);
              return item;
            }),
        ),
      ).then(() => {
        notifySave.stop();
      });
    })
    .then(() =>
      // eslint-disable-next-line no-console
      console.log('\x1b[32m%s\x1b[0m', 'Products imported'),
    )
    .catch((reject) => {
      notifySave.stop();
      return logAndExit(reject, 'Failed to import products');
    });
};
export const importAllProducts = () => {
  const categoriesPath = process.cwd() + '/data/categories.csv';
  const typesPath = process.cwd() + '/data/product-type.json';

  return Promise.all(
    ['/data/products/Furniture-and-decor.csv', '/data/products/Product-sets.csv'].map((productPath) => {
      importProducts(process.cwd() + productPath, categoriesPath, typesPath);
    }),
  );
};
if (nconf.get('clean')) {
  deleteAllProducts().then(deleteAllProductTypes);
} else if (nconf.get('importtypes')) {
  console.log('\x1b[32m%s\x1b[0m', 'Importing product types...');
  importProductTypes();
} else if (nconf.get('import')) {
  // eslint-disable-next-line no-console
  console.log('\x1b[32m%s\x1b[0m', 'Importing products...');
  importAllProducts();
}
