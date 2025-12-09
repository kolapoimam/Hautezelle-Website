import React from 'react';
import { Product } from '../types';
import { Instagram } from 'lucide-react';
import SEO from '../components/SEO';

const products: Product[] = [
  {
    id: '1',
    name: 'Luxury Wedding Plaque',
    description: 'Personalized resin plaques perfect for commemorating special unions. Customizable with names and dates.',
    priceRange: '₦40,000 - ₦50,000',
    category: 'Decor',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765287799/IMG_0978_gsa9fj.jpg'
  },
  {
    id: '2',
    name: 'Elegant Quran Stand',
    description: 'A spiritual masterpiece. Heavy duty resin stand with gold leaf detailing and Arabic calligraphy.',
    priceRange: '₦45,000',
    category: 'Religious',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765287776/597F0139-85A7-4A82-8172-F88A8D7303B9_qu7klr.jpg'
  },
  {
    id: '3',
    name: 'Oversized Wall Clock',
    description: '15 inches+ statement piece for your living room or office. Silent mechanism and durable finish.',
    priceRange: '₦45,000+',
    category: 'Decor',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765287717/IMG_1086_r2xglo.jpg'
  },
  {
    id: '4',
    name: 'A6 Artisan Journal',
    description: 'Handmade resin-covered journal for your thoughts and dreams. Refillable pages.',
    priceRange: '₦10,000',
    category: 'Stationery',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765286883/IMG_7880_floeih.jpg'
  },
  {
    id: '5',
    name: 'Charcuterie Board',
    description: 'Elegant serving board for appetizers and cheeses. Food safe and heat resistant.',
    priceRange: '₦15,000',
    category: 'Homeware',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765287717/IMG_4663_oidm7n.jpg'
  },
  {
    id: '6',
    name: 'Luxury Resin Bag',
    description: 'A stunning handmade bag encased in resin designs. The perfect accessory for special occasions.',
    priceRange: '₦35,000 - ₦55,000',
    category: 'Accessories',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765287706/IMG_9407_znnhxv.jpg'
  },
  {
    id: '7',
    name: 'Custom Keychains',
    description: 'Personalized initials and designs with floral or gold flake inclusions. Perfect for gifts.',
    priceRange: '₦2,500 - ₦5,000',
    category: 'Accessories',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765287611/IMG_6399_iil20x.jpg'
  },
  {
    id: '8',
    name: 'Coaster',
    description: 'Large decorative tray with handles. Perfect for serving guests or as a centerpiece.',
    priceRange: '₦25,000 - ₦35,000',
    category: 'Homeware',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765313779/IMG_2121_e0nvzo.jpg'
  },
  {
    id: '9',
    name: 'Geode Art Canvas',
    description: 'Textured wall art mimicking natural geode formations with crystals and glass.',
    priceRange: '₦60,000+',
    category: 'Decor',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765287097/IMG_1023_dmxj5q.jpg'
  },
  {
    id: '10',
    name: 'Resin Bookmark',
    description: 'Elegant bookmark with real pressed flowers and gold leaf. A beautiful companion for your reading.',
    priceRange: '₦3,000 - ₦5,000',
    category: 'Stationery',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765286657/IMG_2454_gstsrx.jpg'
  },
  {
    id: '11',
    name: 'Custom Phone Case',
    description: 'Protective case with a unique resin back art. Available for various phone models.',
    priceRange: '₦12,000 - ₦18,000',
    category: 'Accessories',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765286842/98835547-B853-4C3D-9395-B7AA594880D4_clynng.jpg'
  },
  {
    id: '12',
    name: 'Bespoke Resin Pen',
    description: 'Refillable ballpoint pen with custom resin barrel. Smooth writing with a touch of luxury.',
    priceRange: '₦4,000 - ₦6,000',
    category: 'Stationery',
    image: 'https://res.cloudinary.com/dfribrcrt/image/upload/v1765287769/E13CF2D7-66DA-417E-92D9-93EFADF1335F_mxpurw.jpg'
  }
];

const Shop: React.FC = () => {
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
        "image": p.image,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "NGN",
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
            Explore our curated selection of handmade resin masterpieces. Each piece is unique, crafted with passion and precision in our Ilorin studio.
          </p>
        </div>

        {/* Filter Categories (Visual only for now) */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-20 border-b border-slate-100 pb-8">
          {['All', 'Decor', 'Homeware', 'Accessories', 'Religious', 'Stationery'].map((cat, idx) => (
            <button 
              key={cat}
              className={`text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-teal-900 text-white' : 'bg-transparent text-slate-400 hover:text-teal-900 hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col h-full">
              <div className="relative overflow-hidden aspect-[4/5] bg-slate-100 mb-8 rounded-[2.5rem] shadow-lg">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                
                {/* Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a 
                      href="https://instagram.com/hautezelle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 backdrop-blur-md text-teal-900 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2 shadow-xl hover:bg-white"
                    >
                      <Instagram size={16} /> Buy on Instagram
                    </a>
                </div>
              </div>

              <div className="flex flex-col flex-grow px-2">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-serif text-slate-900 group-hover:text-teal-700 transition-colors">{product.name}</h3>
                  {/* Price tag removed as requested */}
                </div>
                <p className="text-slate-500 mb-6 flex-grow leading-relaxed font-light">{product.description}</p>
                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                   <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">{product.category}</p>
                   <a href="https://instagram.com/hautezelle" target="_blank" rel="noreferrer" className="text-teal-600 text-xs uppercase tracking-widest font-bold hover:text-teal-900">Details</a>
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
              href="https://instagram.com/hautezelle"
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