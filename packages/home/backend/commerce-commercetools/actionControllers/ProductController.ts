import { Request, Response } from '@frontastic/extension-types';
import { ProductApi } from '../apis/ProductApi';
import { ActionContext } from '@frontastic/extension-types';
import { ProductQueryFactory } from '../utils/ProductQueryFactory';
import { ProductQuery } from '@commercetools/frontend-domain-types/query/ProductQuery';
import { CategoryQuery } from '../interfaces/CategoryQuery';
import { getCurrency, getLocale } from '../utils/Request';
import { ResponseAdditionalData3DSecure } from '@adyen/api-library/lib/src/typings/checkout/responseAdditionalData3DSecure';

type ActionHook = (request: Request, actionContext: ActionContext) => Promise<Response>;

export const getProduct: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const productApi = new ProductApi(actionContext.frontasticContext, getLocale(request), getCurrency(request));

  let productQuery: ProductQuery = {};

  if ('id' in request.query) {
    productQuery = {
      productIds: [request.query['id']],
    };
  }

  if ('sku' in request.query) {
    productQuery = {
      skus: [request.query['sku']],
    };
  }

  const product = await productApi.getProduct(productQuery);

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(product),
    sessionData: request.sessionData,
  };

  return response;
};

export const query: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const productApi = new ProductApi(actionContext.frontasticContext, getLocale(request), getCurrency(request));

  const productQuery = ProductQueryFactory.queryFromParams(request);

  const queryResult = await productApi.query(productQuery);

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(queryResult),
    sessionData: request.sessionData,
  };

  return response;
};

export const queryCategories: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const productApi = new ProductApi(actionContext.frontasticContext, getLocale(request), getCurrency(request));

  const categoryQuery: CategoryQuery = {
    limit: request.query?.limit ?? undefined,
    cursor: request.query?.cursor ?? undefined,
    slug: request.query?.slug ?? undefined,
    parentId: request.query?.parentId ?? undefined,
  };

  const queryResult = await productApi.queryCategories(categoryQuery);

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(queryResult),
    sessionData: request.sessionData,
  };

  return response;
};

export const searchableAttributes: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const productApi = new ProductApi(actionContext.frontasticContext, getLocale(request), getCurrency(request));

  const result = await productApi.getSearchableAttributes();

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(result),
    sessionData: request.sessionData,
  };

  return response;
};

export const getInventory: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const productApi = new ProductApi(actionContext.frontasticContext, getLocale(request), getCurrency(request));

  const sku = request.query.sku;

  const data = await productApi.getInventory(sku);

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(data),
    sessionData: request.sessionData,
  };

  return response;
};
