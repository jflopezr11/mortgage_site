/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://joshualopezloans.com', // Your domain
    generateRobotsTxt: true, // Generate a robots.txt file
    sitemapSize: 7000, // Adjust the sitemap size if needed
  };
  