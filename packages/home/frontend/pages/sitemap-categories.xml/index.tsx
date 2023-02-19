import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { siteUrl } from 'next-sitemap.config';
import { SDK } from 'sdk';
import { Category } from 'types/category';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const fields = [] as ISitemapField[];

  let nextCursor: string | undefined;

  SDK.configure(context.locale as string);

  const extensions = SDK.getExtensions();

  do {
    const response = await extensions.product.queryCategories({ query: { cursor: nextCursor, limit: 12 } });

    const items = ((response.isError ? [] : response.data.items) ?? []) as Category[];

    fields.push(
      ...items.map((category) => ({
        loc: `${siteUrl}/${context.locale}${category.path}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as const,
      })),
    );

    nextCursor = (!response.isError && response.data.nextCursor) as string;
  } while (nextCursor);

  context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');

  return getServerSideSitemap(context, fields);
};

//eslint-disable-next-line @typescript-eslint/no-empty-function
export default function SitemapCategories() {}
