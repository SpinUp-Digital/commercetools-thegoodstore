import type { IncomingMessage, ServerResponse } from 'http';
import { Result } from 'shared/types/product/Result';
import { serverSession, ServerOptions } from '@commercetools/frontend-sdk';
import { AcceptedQueryTypes } from '@commercetools/frontend-sdk/lib/types/Query';
import { sdk } from 'sdk';
import { PageDataResponse, PagePreviewDataResponse, RedirectResponse, PageFolderStructureResponse } from '../types';

export const getRouteData =
  () =>
  async (
    slug: string[],
    query?: AcceptedQueryTypes,
    req?: IncomingMessage,
    res?: ServerResponse,
  ): Promise<RedirectResponse | PageDataResponse> => {
    const pageSlug = (slug as string[])?.join('/') || '';
    const path = `/${pageSlug !== 'index' ? pageSlug : ''}`;
    const serverOptions: ServerOptions = {
      req: req,
      res: res,
    };

    const response = await sdk.page.getPage({
      path,
      query,
      serverOptions: req && res ? serverOptions : undefined,
    });

    return (response.isError ? {} : response.data) as RedirectResponse | PageDataResponse;
  };

export const getPreview =
  () =>
  async (previewId: string): Promise<PagePreviewDataResponse> => {
    const res = await sdk.page.getPreview({ previewId });

    return (res.isError ? {} : res.data) as PagePreviewDataResponse;
  };

export const getCategories =
  () =>
  async (req?: IncomingMessage, res?: ServerResponse): Promise<Result> => {
    const extensions = sdk.composableCommerce;

    const serverOptions: ServerOptions = {
      req: req,
      res: res,
    };

    const response = await extensions.product.queryCategories({ limit: 99 }, { serverOptions: serverOptions });

    return (response.isError ? [] : response.data) as Result;
  };

export const getStructure =
  () =>
  async (path: string, depth: number): Promise<PageFolderStructureResponse> => {
    const res = await sdk.page.getPages({ path, depth });

    return (res.isError ? {} : res.data) as PageFolderStructureResponse;
  };
