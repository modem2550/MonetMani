import type { Event } from '@/types/event';

export const SITE_URL = 'https://monimonetfans.vercel.app';

function origin(site: string): string {
  return site.replace(/\/$/, '');
}

export function buildPageSchema(description: string, site = SITE_URL) {
  const base = origin(site);

  return {
    personSchema: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${base}/#person`,
      name: 'Monet BNK48',
      alternateName: [
        'Monet',
        'โมเน่ต์',
        'โมเน่ต์ BNK48',
        'โมเน่ต์ บีเอ็นเค48',
        'Manimonet BNK48',
        'Parita Rirermkul',
        'ภาริตา ริเริ่มกุล',
      ],
      description: 'สมาชิกวง BNK48 (Idol, Artist, Actress)',
      jobTitle: 'Idol / Artist',
      image: `${base}/img/profile.webp`,
      worksFor: {
        '@type': 'Organization',
        name: 'BNK48',
        url: 'https://www.bnk48.com/',
      },
      memberOf: {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
      },
      url: `${base}/`,
      sameAs: [
        'https://www.instagram.com/monet.bnk48official/',
        'https://www.facebook.com/bnk48official.monet',
        'https://www.tiktok.com/@monet.bnk48official',
      ],
    },
    websiteSchema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      name: 'Monet BNK48 - Fan Website',
      alternateName: ['Monet BNK48 Fan Website', 'โมเน่ต์ BNK48 แฟนคลับ', 'Monet Fansite'],
      description,
      url: `${base}/`,
      inLanguage: 'th-TH',
      publisher: {
        '@type': 'Organization',
        name: 'Monet BNK48 Fan Website',
        logo: `${base}/android-chrome-512x512.png`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${base}/?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      author: {
        '@type': 'Person',
        name: 'Monet BNK48 Fan Community',
      },
    },
    breadcrumbSchema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: 'Events', item: `${base}/#event` },
        { '@type': 'ListItem', position: 3, name: 'About', item: `${base}/#info` },
        { '@type': 'ListItem', position: 4, name: 'Social', item: `${base}/#social` },
        { '@type': 'ListItem', position: 5, name: 'Highlights', item: `${base}/#library` },
        { '@type': 'ListItem', position: 6, name: 'Schedule', item: `${base}/schedule` },
      ],
    },
    organizationSchema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: 'Monet - Parita Rirermkul Fansite',
      url: `${base}/`,
      logo: `${base}/android-chrome-512x512.png`,
      description: 'Monet - Parita Rirermkul Fansite',
      founder: {
        '@type': 'Person',
        name: 'Monet BNK48',
      },
    },
  };
}

export function buildEventSchemas(events: Event[], site = SITE_URL, limit = 10) {
  const base = origin(site);

  return events.slice(0, limit).map((evt) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: evt.title || 'Monet BNK48 Event',
    startDate: evt.date,
    ...(evt.end_date ? { endDate: evt.end_date } : {}),
    description: evt.description || `${evt.title || 'Event'} - Monet BNK48`,
    location: {
      '@type': 'Place',
      name: evt.location || 'Thailand',
      address: evt.location || 'Thailand',
    },
    ...(evt.image_url || evt.image_urls?.large
      ? { image: [evt.image_urls?.large || evt.image_url] }
      : {}),
    performer: {
      '@type': 'Person',
      name: 'Monet BNK48',
      url: `${base}/#person`,
    },
    organizer: {
      '@type': 'Organization',
      name: 'BNK48',
      url: 'https://www.bnk48.com/',
    },
  }));
}
