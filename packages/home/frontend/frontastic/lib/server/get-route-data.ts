import type { IncomingMessage, ServerResponse } from 'http';
import { Result } from '@commercetools/frontend-domain-types/product/Result';
import { serverSession } from '@commercetools/frontend-sdk';
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

    const response = await sdk.page.getPage({
      path,
      query,
      serverSession: req && res ? serverSession.get(req, res) : undefined,
    });

    return (response.isError ? {} : response.data) as RedirectResponse | PageDataResponse;
  };

export const getPreview =
  () =>
  async (previewId: string): Promise<PagePreviewDataResponse> => {
    const res = await sdk.page.getPreview({ previewId });

    return (res.isError ? {} : res.data) as PagePreviewDataResponse;
  };

export const getCategories = () => async (): Promise<Result> => {
  const extensions = sdk.composableCommerce;

  const res = await extensions.product.queryCategories({ limit: 99 });

  return (res.isError ? [] : res.data) as Result;
};

export const getStructure =
  () =>
  async (path: string, depth: number): Promise<PageFolderStructureResponse> => {
    const res = await sdk.page.getPages({ path, depth });

    return (res.isError ? {} : res.data) as PageFolderStructureResponse;
  };
