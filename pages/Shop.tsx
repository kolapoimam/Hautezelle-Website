import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { INSTAGRAM_DM } from '../constants';
import site from '../data/site.json';
import { track, gaItem, priceFrom, naira, slug, CURRENCY } from '../lib/analytics';

const products: Product[] = site.products;

const categories = ['All', 'Weddings', 'Home Decor', 'Accessories', 'Stationery', 'Gifts'];

const Shop: React.FC = () => {
  const [active, setActive] = useState('All');
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const { add } = useCart();
  const visible = active === 'All' ? products : products.filter((p) => p.category === active);
  const listName = `Shop: ${active}`;
  const listId = `shop_${slug(active)}`;

  // The list of products a visitor is shown, sent again whenever the filter changes.
  useEffect(() => {
    // Sent just after the page_view so reports read in order.
    const t = window.setTimeout(() => {
      track('view_item_list', {
        item_list_id: listId,
        item_list_name: listName,
        items: visible.map((p, i) => gaItem(p, { index: i, item_list_name: listName, item_list_id: listId })),
      });
    }, 150);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Each product card counts as seen once, when most of it is on screen.
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !('IntersectionObserver' in window)) return;
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.productId;
          const p = id && products.find((x) => x.id === id);
          if (!e.isIntersecting || !p || seen.has(p.id)) continue;
          seen.add(p.id);
          track('product_impression', {
            item_id: p.id,
            item_name: p.name,
            item_category: p.category,
            price: priceFrom(p),
            currency: CURRENCY,
            index: visible.indexOf(p),
            item_list_name: listName,
          });
        }
      },
      { threshold: 0.6 },
    );
    grid.querySelectorAll('[data-product-id]').forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const choose = (cat: string) => {
    if (cat === active) return;
    const results = cat === 'All' ? products.length : products.filter((p) => p.category === cat).length;
    track('filter_products', { filter_category: cat, previous_category: active, results_count: results });
    setActive(cat);
  };

  const addToCart = (product: Product, index: number) => {
    add(product.id);
    track('add_to_cart', {
      currency: CURRENCY,
      value: priceFrom(product),
      add_source: 'shop_card',
      items: [gaItem(product, { index, item_list_name: listName, item_list_id: listId })],
    });
    setJustAdded(product.id);
    window.setTimeout(() => setJustAdded((cur) => (cur === product.id ? null : cur)), 1600);
  };

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
          A selection of handmade resin pieces, each one unique and finished with care in our Ilorin studio. Prices start from the amounts shown and vary with size and personalisation. Add your favourites to the cart and check out through Instagram.
        </p>
      </section>

      {/* Filters */}
      <section data-section="filters" className="wrap pb-12">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap justify-center gap-2 border-b border-mist pb-10 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => choose(cat)}
              data-track-skip
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
      <section data-section="product_grid" className="wrap pb-24 lg:pb-32">
        <div ref={gridRef} className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {visible.map((product, index) => (
            <article key={product.id} id={product.id} data-product-id={product.id} className="group flex flex-col gap-4">
              <div className="relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-mist">
                <img src={product.image} alt={product.name} loading="lazy" className="ph-zoom h-full w-full object-cover" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-teal-800">
                  {product.category}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl leading-tight">{product.name}</h2>
                <span className="whitespace-nowrap text-[15px] text-teal-700">{product.priceRange}</span>
              </div>
              <p className="flex-grow text-[15px] leading-[1.7] text-[#4a5553]">{product.description}</p>
              {product.bulkPricing && (
                <ul aria-label="Bulk prices" className="flex flex-wrap gap-2 text-[13px]">
                  {product.bulkPricing
                    .slice()
                    .sort((a, b) => a.minQty - b.minQty)
                    .map((t) => (
                      <li key={t.minQty} className="rounded-full bg-teal-50 px-3 py-1.5 text-teal-800">
                        {t.minQty}+ pieces · {naira(t.price)} each
                      </li>
                    ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => addToCart(product, index)}
                data-track-skip
                className="btn-solid w-full sm:w-auto sm:self-start"
              >
                {justAdded === product.id ? <Check size={16} /> : <ShoppingCart size={16} />}
                {justAdded === product.id ? 'Added to cart' : 'Add to cart'}
              </button>
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
