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
  const visible = active === 'All' ? products : products.filter(p => p.category === active);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <SEO page="/shop" />

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
            <div key={product.id}
              id={product.id} className="group flex flex-col h-full">
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