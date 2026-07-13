const SITE_URL = 'https://ydntatenda.com';

export default async function sitemap() {
  return [
    { url: SITE_URL, lastModified: new Date().toISOString() },
    { url: `${SITE_URL}/ydn`, lastModified: new Date().toISOString() }
  ];
}
