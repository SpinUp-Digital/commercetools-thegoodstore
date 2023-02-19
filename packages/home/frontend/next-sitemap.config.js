const siteUrl = process.env.SITE_URL;

/* Site map generator configuration */

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  exclude: ['/sitemap-static.xml', '/sitemap-categories.xml', '/sitemap-products.xml', '/verify', '/__preview'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api', '/__preview'],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap-static.xml`,
      `${siteUrl}/sitemap-categories.xml`,
      `${siteUrl}/sitemap-products.xml`,
    ],
  },
};

module.exports = config;
