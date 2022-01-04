const siteUrl = "https://omoanifowose.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
};
