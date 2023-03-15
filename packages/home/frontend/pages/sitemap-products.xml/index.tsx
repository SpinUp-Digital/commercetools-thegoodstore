import { GetServerSideProps } from 'next';
import { Result } from '@commercetools/frontend-domain-types/product/Result';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { siteUrl } from 'next-sitemap.config';
import { getLocalizationInfo } from 'project.config';
import { fetchApiHubServerSide } from 'frontastic';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const fields = [] as ISitemapField[];

  let nextCursor: string | undefined;

  const { locale } = getLocalizationInfo(context.locale);

  do {
    /* TODO: Use SDK instead of fetchApiHubServerSide */

    // const extensions = SDK.getExtensions();

    // const response = await extensions.product.query({ query: { cursor: nextCursor, limit: 12 } });

    // const items = response.isError ? [] : response.data.items;

    const response = (await fetchApiHubServerSide(
      `/action/product/query?cursor=${nextCursor}&limit=128&locale=${locale}`,
      locale,
      {
        req: context.req,
        res: context.res,
      },
    )) as Result;

    fields.push(
      ...response.items.map((product) => ({
        loc: `${siteUrl}/${context.locale}${product._url}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as const,
      })),
    );

    nextCursor = response.nextCursor;
  } while (nextCursor);

  context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');

  return getServerSideSitemap(context, fields);
};

//eslint-disable-next-line @typescript-eslint/no-empty-function
export default function SitemapCategories() {}
