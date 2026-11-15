import React, { useState } from 'react';
import { Product } from '../types';
import { Instagram } from 'lucide-react';
import SEO from '../components/SEO';
import { INSTAGRAM_DM, SITE_URL, img } from '../constants';

const products: Product[] = [
  {
    id: 'resin-wedding-plaque',
    name: 'Resin Wedding Plaque',
    description: 'A keepsake for your union, finished with pressed flowers, pearls and gold flakes. Personalised with your names, date and a verse of your choice.',
    priceRange: 'From ₦65,000',
    category: 'Weddings',
    image: img('wedding-plaque.jpg')
  },
  {
    id: 'acrylic-wedding-plaque',
    name: 'Acrylic Wedding Plaque',
    description: 'A clear arched plaque framed with pearls, crystals and floral sprays. Printed with your names, wedding date and Arabic calligraphy.',
    priceRange: 'From ₦45,000',
    category: 'Weddings',
    image: img('acrylic-wedding-plaque.jpg')
  },
  {
    id: 'mini-wedding-plaque',
    name: 'Mini Wedding Plaque',
    description: 'A glowing resin disc hung in a floral ring stand, with gold leaf and soft fairy lights. A lovely gift for the couple.',
    priceRange: 'From ₦35,000',
    category: 'Weddings',
    image: img('mini-wedding-plaque.jpg')
  },
  {
    id: 'resin-wedding-platter',
    name: 'Resin Wedding Platter',
    description: 'A full wedding set with a floral moon plaque and a matching resin platter, finished with gold edging and crystal clusters.',
    priceRange: 'From ₦130,000',
    category: 'Weddings',
    image: img('wedding-platter.jpg')
  },
  {
    id: 'resin-clock',
    name: 'Table Top / Wall Clock',
    description: 'A handmade resin clock with Roman numerals and silver flakes. Add a message to mark a promotion, a graduation or a new home.',
    priceRange: 'From ₦60,000',
    category: 'Home Decor',
    image: img('resin-clock.jpg')
  },
  {
    id: 'tabletop-plaque',
    name: 'Table Top Plaque',
    description: 'A standing resin plaque with gold leaf, made for graduations, awards and special thank yous.',
    priceRange: 'From ₦12,000',
    category: 'Home Decor',
    image: img('tabletop-plaque.jpg')
  },
  {
    id: 'luxury-pearl-bag',
    name: 'Luxury Pearl Bag',
    description: 'A statement bag of pearl filled resin swirls with a satin pouch inside. Made for weddings and evening events.',
    priceRange: 'From ₦120,000',
    category: 'Accessories',
    image: img('pearl-bag.jpg')
  },
  {
    id: 'resin-clutch',
    name: 'Resin Clutch',
    description: 'A round glitter resin clutch with gold marbling, a bangle handle and a gold chain strap.',
    priceRange: 'From ₦70,000',
    category: 'Accessories',
    image: img('resin-clutch.jpg')
  },
  {
    id: 'journal-gift-set',
    name: 'Journal Gift Set',
    description: 'A matching set of journal, keychain, pen and bookmark, all personalised with a name or a word you love.',
    priceRange: 'From ₦30,000',
    category: 'Stationery',
    image: img('journal-gift-set.jpg')
  },
  {
    id: 'resin-journal',
    name: 'Resin Journal',
    description: 'A refillable ring journal with a hand poured resin cover, glitter edges and your custom text.',
    priceRange: 'From ₦16,000',
    category: 'Stationery',
    image: img('journal.jpg')
  },
  {
    id: 'resin-pen',
    name: 'Personalised Resin Pen',
    description: 'A refillable pen with a resin barrel, silver flakes and a printed name. Great for doctors, teams and graduates.',
    priceRange: 'From ₦2,500',
    category: 'Stationery',
    image: img('resin-pens.jpg')
  },
  {
    id: 'resin-bookmark',
    name: 'Resin Bookmark',
    description: 'A glitter resin bookmark with a butterfly topper and your custom text. ₦1,500 each for orders above 10.',
    priceRange: 'From ₦2,000',
    category: 'Stationery',
    image: img('bookmark.jpg')
  },
  {
    id: 'couples-keychain-box',
    name: 'Couples Keychain Box',
    description: 'A two piece heart keychain that fits together, presented in a gift box. Personalised for the two of you.',
    priceRange: 'From ₦10,000',
    category: 'Gifts',
    image: img('couples-keychain-box.jpg')
  },
  {
    id: 'keychain-pen-gift-box',
    name: 'Keychain & Pen Gift Box',
    description: 'A named keychain and matching pen in a window gift box. A neat choice for staff and corporate gifts.',
    priceRange: 'From ₦7,500',
    category: 'Gifts',
    image: img('keychain-pen-gift-box.jpg')
  },
  {
    id: 'custom-keychain',
    name: 'Custom Keychain',
    description: 'A resin keychain with a pressed flower charm and your name or initials. ₦1,700 each for orders above 50.',
    priceRange: 'From ₦2,500',
    category: 'Gifts',
    image: img('keychain.jpg')
  }
];

const categories = ['All', 'Weddings', 'Home Decor', 'Accessories', 'Stationery', 'Gifts'];

const Shop: React.FC = () => {
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? products : products.filter(p => p.category === active);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Hautezelle Shop",
    "description": "Shop luxury handmade resin art, home decor, and accessories.",
    "url": "https://hautezelle.com/shop",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((p, i) => ({
        "@type": "Product",
        "position": i + 1,
        "name": p.name,
        "description": p.description,
        "image": `${SITE_URL}${p.image}`,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "NGN",
          "price": p.priceRange.replace(/[^0-9]/g, ''),
          "availability": "https://schema.org/InStock"
        }
      }))
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <SEO 
        title="Shop Luxury Resin Art | Hautezelle Studio" 
        description="Browse our curated collection of resin plaques, jewelry, clocks, and home decor. Handcrafted in Nigeria."
        schema={schema}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-teal-600 tracking-widest text-xs uppercase font-bold mb-3 block">The Catalogue</span>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-6">Curated Collections</h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-lg font-light">
            Explore our curated selection of handmade resin masterpieces. Each piece is unique, crafted with passion and precision in our Ilorin studio. Prices start from the amounts shown and vary with size and personalisation.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-20 border-b border-slate-100 pb-8">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all duration-300 ${active === cat ? 'bg-teal-900 text-white' : 'bg-transparent text-slate-400 hover:text-teal-900 hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {visible.map((product) => (
            <div key={product.id} className="group flex flex-col h-full">
              <div className="relative overflow-hidden aspect-[4/5] bg-slate-100 mb-8 rounded-[2.5rem] shadow-lg">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                
                {/* Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a 
                      href={INSTAGRAM_DM}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 backdrop-blur-md text-teal-900 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2 shadow-xl hover:bg-white"
                    >
                      <Instagram size={16} /> Order via DM
                    </a>
                </div>
              </div>

              <div className="flex flex-col flex-grow px-2">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-serif text-slate-900 group-hover:text-teal-700 transition-colors pr-4">{product.name}</h3>
                  <p className="text-teal-700 font-semibold whitespace-nowrap pt-1">{product.priceRange}</p>
                </div>
                <p className="text-slate-500 mb-6 flex-grow leading-relaxed font-light">{product.description}</p>
                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                   <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">{product.category}</p>
                   <a href={INSTAGRAM_DM} target="_blank" rel="noreferrer" className="text-teal-600 text-xs uppercase tracking-widest font-bold hover:text-teal-900">Order via DM</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order Callout */}
        <div className="mt-40 bg-teal-950 p-12 md:p-32 text-center relative overflow-hidden rounded-[3rem]">
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-serif text-white mb-8">Looking for something bespoke?</h3>
            <p className="text-teal-100/80 mb-12 max-w-xl mx-auto leading-loose text-lg font-light">
              We specialize in custom orders for weddings, corporate gifts, and personal milestones. Let us bring your vision to life.
            </p>
            <a 
              href={INSTAGRAM_DM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-teal-950 px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-teal-50 transition-colors rounded-full shadow-2xl"
            >
              Request Custom Order
            </a>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-800 rounded-full mix-blend-screen opacity-20 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-700 rounded-full mix-blend-screen opacity-20 translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Shop;