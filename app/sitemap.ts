const SITE_URL = 'https://tatenda.com';

export default async function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString()
    }
  ];
}
