import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { siteUrl } from 'next-sitemap.config';
import { sdk } from 'sdk';
import { createClient } from 'frontastic';

export const getServerSideProps: GetServerSideProps = async (context) => {
  sdk.configureForNext(context.locale as string);

  const fields = [] as ISitemapField[];
  const path = '/';
  const depth = 1;

  const frontastic = createClient();

  const data = await frontastic.getStructure(path, depth);

  if (data?.pageFolderStructure) {
    fields.push(
      ...data.pageFolderStructure?.map((pageFolderStructureValue) => ({
        loc: `${siteUrl}/${context.locale}${pageFolderStructureValue._url}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as const,
      })),
    );
  }

  context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');

  return getServerSideSitemap(context, fields);
};

//eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {}
