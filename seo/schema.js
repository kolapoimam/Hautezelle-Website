// Builds schema.org JSON-LD for each page from data/site.json.
// Plain JS so both the React app and the build-time prerender script can use it.

const abs = (base, path) => (/^https?:/.test(path) ? path : `${base}${path}`);

export const orgId = (b) => `${b.url}/#organization`;

export function organization(site) {
  const b = site.business;
  return {
    '@type': ['Store', 'LocalBusiness'],
    '@id': orgId(b),
    name: b.name,
    alternateName: ['Hautezelle', 'Hautezelle Resin Art', 'Hautezelle Academy'],
    description: b.description,
    url: b.url,
    logo: abs(b.url, b.logo),
    image: abs(b.url, b.image),
    email: b.email,
    priceRange: b.priceRange,
    currenciesAccepted: 'NGN',
    address: {
      '@type': 'PostalAddress',
      addressLocality: b.address.locality,
      addressRegion: b.address.region,
      addressCountry: b.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: b.hours.days,
        opens: b.hours.opens,
        closes: b.hours.closes,
      },
    ],
    areaServed: b.areaServed.map((name) => ({ '@type': 'Place', name })),
    sameAs: [b.instagram, b.tiktok],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: b.email,
        url: b.instagramDM,
        areaServed: 'NG',
        availableLanguage: ['English'],
      },
    ],
    founder: { '@type': 'Person', name: b.founders[0].name, jobTitle: b.founders[0].jobTitle },
    employee: b.founders.map((f) => ({
      '@type': 'Person',
      name: f.name,
      jobTitle: f.jobTitle,
      image: abs(b.url, f.image),
      ...(f.url ? { url: f.url } : {}),
    })),
    knowsAbout: b.keywords,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Handmade resin art',
      itemListElement: site.products.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Product', name: p.name, url: `${b.url}/shop#${p.id}` },
        price: p.price,
        priceCurrency: 'NGN',
      })),
    },
  };
}

function website(site) {
  const b = site.business;
  return {
    '@type': 'WebSite',
    '@id': `${b.url}/#website`,
    name: b.name,
    url: b.url,
    description: b.description,
    inLanguage: 'en-NG',
    publisher: { '@id': orgId(b) },
  };
}

function webpage(site, path, type = 'WebPage') {
  const b = site.business;
  const p = site.pages[path];
  return {
    '@type': type,
    '@id': `${b.url}${path === '/' ? '' : path}#webpage`,
    url: `${b.url}${path === '/' ? '' : path}`,
    name: p.title,
    description: p.description,
    inLanguage: 'en-NG',
    isPartOf: { '@id': `${b.url}/#website` },
    about: { '@id': orgId(b) },
    primaryImageOfPage: abs(b.url, b.image),
  };
}

function breadcrumbs(site, path) {
  const b = site.business;
  const name = { '/shop': 'Shop', '/academy': 'Academy', '/services': 'Services', '/about': 'About', '/contact': 'Contact' }[path];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: b.url },
      { '@type': 'ListItem', position: 2, name, item: `${b.url}${path}` },
    ],
  };
}

export function faqPage(site) {
  return {
    '@type': 'FAQPage',
    mainEntity: site.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function productList(site) {
  const b = site.business;
  return {
    '@type': 'ItemList',
    name: 'Hautezelle handmade resin art',
    numberOfItems: site.products.length,
    itemListElement: site.products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        '@id': `${b.url}/shop#${p.id}`,
        name: p.name,
        description: p.description,
        image: abs(b.url, p.image),
        category: p.category,
        brand: { '@type': 'Brand', name: 'Hautezelle' },
        manufacturer: { '@id': orgId(b) },
        countryOfOrigin: 'NG',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: p.price,
          priceCurrency: 'NGN',
          offerCount: 1,
          availability: 'https://schema.org/MadeToOrder',
          seller: { '@id': orgId(b) },
          url: b.instagramDM,
        },
      },
    })),
  };
}

function courses(site) {
  const b = site.business;
  return site.courses.map((c) => ({
    '@type': 'Course',
    name: `${c.name} (Hautezelle Resin Art Academy)`,
    description: c.description,
    educationalLevel: c.level,
    teaches: c.topics,
    inLanguage: 'en',
    provider: { '@id': orgId(b) },
    offers: {
      '@type': 'Offer',
      price: c.price,
      priceCurrency: 'NGN',
      category: 'Paid',
      url: b.instagramDM,
    },
    hasCourseInstance: [
      { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: 'Self paced' },
      {
        '@type': 'CourseInstance',
        courseMode: 'Onsite',
        location: { '@type': 'Place', name: 'Hautezelle Studio, Ilorin', address: { '@type': 'PostalAddress', addressLocality: 'Ilorin', addressRegion: 'Kwara State', addressCountry: 'NG' } },
      },
    ],
  }));
}

function services(site) {
  const b = site.business;
  return site.services.map((s) => ({
    '@type': 'Service',
    name: s.name,
    description: s.description,
    provider: { '@id': orgId(b) },
    areaServed: { '@type': 'Country', name: 'Nigeria' },
  }));
}

/** Full JSON-LD graph for a route. */
export function buildSchema(site, path) {
  const graph = [organization(site), website(site)];
  switch (path) {
    case '/':
      graph.push(webpage(site, '/'), faqPage(site));
      break;
    case '/shop':
      graph.push(webpage(site, path, 'CollectionPage'), breadcrumbs(site, path), productList(site));
      break;
    case '/academy':
      graph.push(webpage(site, path), breadcrumbs(site, path), ...courses(site));
      break;
    case '/services':
      graph.push(webpage(site, path), breadcrumbs(site, path), ...services(site));
      break;
    case '/about':
      graph.push(webpage(site, path, 'AboutPage'), breadcrumbs(site, path));
      break;
    case '/contact':
      graph.push(webpage(site, path, 'ContactPage'), breadcrumbs(site, path));
      break;
    default:
      graph.push(webpage(site, '/'));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
