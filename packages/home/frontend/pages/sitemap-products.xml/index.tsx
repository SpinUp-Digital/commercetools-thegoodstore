import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { siteUrl } from 'next-sitemap.config';
import { SDK } from 'sdk';

export const getServerSideProps: GetServerSideProps = async (context) => {
  SDK.configure(context.locale as string);

  const fields = [] as ISitemapField[];

  let nextCursor: string | undefined;

  do {
    const extensions = SDK.getExtensions();

    const response = await extensions.product.query({ cursor: nextCursor, limit: 12 });

    const items = response.isError ? [] : response.data.items;

    fields.push(
      ...items.map((product) => ({
        loc: `${siteUrl}/${context.locale}${product._url}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as const,
      })),
    );

    nextCursor = !response.isError ? response.data.nextCursor : undefined;
  } while (nextCursor);

  context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');

  return getServerSideSitemap(context, fields);
};

//eslint-disable-next-line @typescript-eslint/no-empty-function
export default function SitemapCategories() {}
