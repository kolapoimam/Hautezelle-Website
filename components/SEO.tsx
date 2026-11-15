import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = "resin art, nigeria, luxury gifts, hautezelle, art academy, epoxy resin training, ilorin", 
  // High-quality Emerald/Teal & Gold Abstract Resin Texture for luxurious preview
  image = "https://hautezelle.com/images/studio-wall.jpg", 
  type = 'website', 
  schema 
}) => {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;
  const siteName = "Hautezelle Studio";

  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOgMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    setMeta('description', description);
    setMeta('keywords', keywords);

    // Open Graph
    setOgMeta('og:site_name', siteName);
    setOgMeta('og:title', title);
    setOgMeta('og:description', description);
    setOgMeta('og:url', canonicalUrl);
    setOgMeta('og:type', type);
    setOgMeta('og:image', image);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Canonical Link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // Structured Data (JSON-LD)
    if (schema) {
      const scriptId = 'structured-data';
      let script = document.getElementById(scriptId);
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('id', scriptId);
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

  }, [title, description, keywords, image, type, canonicalUrl, schema]);

  return null;
};

export default SEO;