import React, { useState } from 'react';
import { Product } from '../types';
import { Instagram } from 'lucide-react';
import SEO from '../components/SEO';
import { INSTAGRAM_DM } from '../constants';
import site from '../data/site.json';

const products: Product[] = site.products;

const categories = ['All', 'Weddings', 'Home Decor', 'Accessories', 'Stationery', 'Gifts'];

const Shop: React.FC = () => {
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? products : products.filter((p) => p.category === active);

  return (
    <div className="w-full bg-ivory text-ink">
      <SEO page="/shop" />

      {/* Intro */}
      <section className="wrap flex flex-col items-center gap-6 pb-14 pt-32 text-center sm:pt-40 lg:pb-16">
        <span className="eyebrow">The catalogue</span>
        <h1 className="display text-[3rem] sm:text-7xl lg:text-[5.5rem]">
          Curated <em className="text-teal-700">collections</em>
        </h1>
        <p className="lead max-w-[36em]">
          A selection of handmade resin pieces, each one unique and finished with care in our Ilorin studio. Prices start from the amounts shown and vary with size and personalisation. Orders are placed by Instagram DM.
        </p>
      </section>

      {/* Filters */}
      <section className="wrap pb-12">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap justify-center gap-2 border-b border-mist pb-10 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`min-h-[44px] rounded-full border px-5 text-[14px] tracking-[0.04em] transition-colors sm:px-6 ${
                active === cat ? 'border-teal-700 bg-teal-700 text-white' : 'border-teal-200 text-ink hover:border-teal-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-[#5b6563]">
          Showing {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
        </p>
      </section>

      {/* Grid */}
      <section className="wrap pb-24 lg:pb-32">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {visible.map((product) => (
            <article key={product.id} id={product.id} className="group flex flex-col gap-4">
              <a
                href={INSTAGRAM_DM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Order ${product.name} on Instagram`}
                className="relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-mist"
              >
                <img src={product.image} alt={product.name} loading="lazy" className="ph-zoom h-full w-full object-cover" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-teal-800">
                  {product.category}
                </span>
              </a>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl leading-tight">{product.name}</h2>
                <span className="whitespace-nowrap text-[15px] text-teal-700">{product.priceRange}</span>
              </div>
              <p className="flex-grow text-[15px] leading-[1.7] text-[#4a5553]">{product.description}</p>
              <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="text-link self-start text-teal-700 hover:text-teal-900">
                <Instagram size={14} /> Order via DM
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Bespoke */}
      <section className="bg-teal-700 text-white">
        <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="w-full aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[16/11] lg:aspect-[5/4]">
            <img src="/images/wedding-platter.jpg" alt="Personalised resin wedding platter with flowers" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col items-start gap-6">
            <span className="eyebrow text-teal-100">Made for you</span>
            <h2 className="h2">Looking for something bespoke?</h2>
            <p className="text-[17px] leading-[1.75] text-teal-50 sm:text-lg">
              We create custom pieces for weddings, corporate gifts and personal milestones. Share your idea and we will bring it to life in resin.
            </p>
            <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="btn-light">Request a custom order</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
