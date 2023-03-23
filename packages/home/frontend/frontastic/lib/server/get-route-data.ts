import { Result } from '@commercetools/frontend-domain-types/product/Result';
import { SDK, sdk } from 'sdk';
import { PageDataResponse, PagePreviewDataResponse, RedirectResponse, PageFolderStructureResponse } from '../types';

export const getRouteData =
  () =>
  async (slug: string[]): Promise<RedirectResponse | PageDataResponse> => {
    const pageSlug = (slug as string[])?.join('/') || '';
    const path = `/${pageSlug !== 'index' ? pageSlug : ''}`;

    const res = await sdk.page.getPage({ path });

    return (res.isError ? {} : res.data) as RedirectResponse | PageDataResponse;
  };

export const getPreview =
  () =>
  async (previewId: string): Promise<PagePreviewDataResponse> => {
    const res = await sdk.page.getPreview({ previewId });

    return (res.isError ? {} : res.data) as PagePreviewDataResponse;
  };

export const getCategories = () => async (): Promise<Result> => {
  const extensions = SDK.getExtensions();

  const res = await extensions.product.queryCategories({ limit: 99 });

  return (res.isError ? [] : res.data) as Result;
};

export const getStructure =
  () =>
  async (path: string, depth: number): Promise<PageFolderStructureResponse> => {
    const res = await sdk.page.getPages({ path, depth });

    return (res.isError ? {} : res.data) as PageFolderStructureResponse;
  };
