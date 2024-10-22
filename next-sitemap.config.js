module.exports = {
    siteUrl: process.env.SITE_URL || 'https://yourdomain.com',
    generateRobotsTxt: true, // (optional) Generate a robots.txt file
    sitemapSize: 7000, // Limit the number of URLs per sitemap file
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/404'], // You can exclude certain paths from the sitemap
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/404' }
      ],
    },
  };
  