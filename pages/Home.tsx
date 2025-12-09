import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Quote } from 'lucide-react';
import { PageRoutes } from '../types';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hautezelle Studio",
    "url": "https://hautezelle.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hautezelle.com/shop?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="w-full">
      <SEO 
        title="Hautezelle Studio | Luxury Resin Art & Education in Nigeria" 
        description="Discover bespoke resin art, wedding plaques, and jewelry. Join Nigeria's premier resin art academy. Handmade luxury crafted to inspire passion."
        schema={schema}
      />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/dfribrcrt/image/upload/v1765301651/Image_fx_3_uzalsg.jpg" 
            alt="Resin Art Texture" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-teal-950/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-teal-200 tracking-[0.4em] text-xs md:text-sm uppercase font-medium mb-6 block border border-teal-200/30 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
              Handmade Luxury from Nigeria
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-8 leading-tight">
              Timeless <br className="hidden md:block"/> Luxurious <span className="italic text-teal-100 font-light">Masterpieces</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Discover bespoke resin art pieces, jewelry, and home décor crafted to inspire passion and celebrate global identity.
            </p>
            <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
              <Link 
                to={PageRoutes.SHOP} 
                className="bg-white text-teal-950 px-8 py-4 min-w-[180px] text-xs font-bold uppercase tracking-widest hover:bg-teal-50 transition-colors shadow-lg rounded-full"
              >
                Shop Collection
              </Link>
              <Link 
                to={PageRoutes.ACADEMY} 
                className="bg-transparent border border-white text-white px-8 py-4 min-w-[180px] text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors rounded-full flex items-center justify-center gap-2"
              >
                <Play size={14} fill="currentColor" /> Visit Academy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Refined Mission Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-24 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-8">Curating Elegance & Passion</h2>
              <p className="text-slate-600 text-lg md:text-xl leading-loose font-light">
                At Hautezelle Studio, our mission is to create captivating and distinctive art and craft pieces that inspire passion, love, and global identity. We are more than an art studio; we are a movement.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                 <img src="https://res.cloudinary.com/dfribrcrt/image/upload/v1765287614/IMG_7587_d9ndes.jpg" alt="Unique Design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-10">
                    <h3 className="text-3xl font-serif text-white mb-3">Unique Design</h3>
                    <div className="w-12 h-1 bg-teal-500 mb-4 transform scale-0 group-hover:scale-100 transition-transform origin-left duration-500"></div>
                    <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                      Each piece is handcrafted with attention to detail, ensuring no two items are exactly alike, offering you exclusive ownership of art.
                    </p>
                 </div>
              </div>

              {/* Card 2 */}
              <div className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer md:-mt-12 shadow-2xl">
                 <img src="https://res.cloudinary.com/dfribrcrt/image/upload/v1765287097/IMG_1023_dmxj5q.jpg" alt="Community" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-10">
                    <h3 className="text-3xl font-serif text-white mb-3">Community</h3>
                    <div className="w-12 h-1 bg-teal-500 mb-4 transform scale-0 group-hover:scale-100 transition-transform origin-left duration-500"></div>
                     <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                      Through our "Resin N Sip" events and Academy, we foster a vibrant community of artists, bringing people together through creativity.
                    </p>
                 </div>
              </div>

              {/* Card 3 */}
              <div className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                 <img src="https://res.cloudinary.com/dfribrcrt/image/upload/v1765287690/IMG_9173_plxwee.jpg" alt="Global Identity" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-10">
                    <h3 className="text-3xl font-serif text-white mb-3">Global Identity</h3>
                    <div className="w-12 h-1 bg-teal-500 mb-4 transform scale-0 group-hover:scale-100 transition-transform origin-left duration-500"></div>
                     <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                      Blending modern resin techniques with cultural elements to create art that resonates globally while celebrating our Nigerian roots.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Collection Preview */}
      <section className="py-32 bg-teal-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-900/30 skew-x-12 transform origin-top-right"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <span className="text-teal-400 tracking-widest text-xs uppercase font-bold mb-3 block">Our Masterpieces</span>
              <h2 className="text-4xl md:text-6xl font-serif">Featured Collections</h2>
            </div>
            <Link to={PageRoutes.SHOP} className="hidden md:flex items-center text-teal-200 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mt-6 md:mt-0 border-b border-teal-200/30 pb-1 hover:border-white">
              View All Products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <Link to={PageRoutes.SHOP} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/5] mb-6 shadow-2xl rounded-[2.5rem]">
                <img src="https://res.cloudinary.com/dfribrcrt/image/upload/v1765287772/B239FD18-E653-4E8B-96DD-BE95F70ADE78_fcwtju.jpg" alt="Wedding Plaque" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-serif mb-1 group-hover:text-teal-200 transition-colors">Wedding Plaques</h3>
                  <p className="text-white/70 text-sm">Bespoke Memories</p>
                </div>
              </div>
            </Link>
            {/* Feature 2 */}
            <Link to={PageRoutes.SHOP} className="group cursor-pointer md:-mt-16">
              <div className="relative overflow-hidden aspect-[4/5] mb-6 shadow-2xl rounded-[2.5rem]">
                <img src="https://res.cloudinary.com/dfribrcrt/image/upload/v1765287776/597F0139-85A7-4A82-8172-F88A8D7303B9_qu7klr.jpg" alt="Quran Stand" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                 <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-serif mb-1 group-hover:text-teal-200 transition-colors">Quran Stands</h3>
                  <p className="text-white/70 text-sm">Spiritual Elegance</p>
                </div>
              </div>
            </Link>
            {/* Feature 3 */}
            <Link to={PageRoutes.SHOP} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/5] mb-6 shadow-2xl rounded-[2.5rem]">
                <img src="https://res.cloudinary.com/dfribrcrt/image/upload/v1765287627/IMG_8758_twkz0q.jpg" alt="Wall Clock" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                 <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-serif mb-1 group-hover:text-teal-200 transition-colors">Resin Clocks</h3>
                  <p className="text-white/70 text-sm">Timeless Art</p>
                </div>
              </div>
            </Link>
          </div>
          
           <div className="mt-16 text-center md:hidden">
            <Link to={PageRoutes.SHOP} className="inline-flex items-center text-teal-200 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest border-b border-teal-200/30 pb-1">
              View All Products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quote / Vision */}
      <section className="py-40 bg-slate-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote size={48} className="text-teal-200 mx-auto mb-10" />
          <h2 className="text-3xl md:text-6xl font-serif italic text-slate-800 leading-tight mb-10">
            "We are positioned to become the premier provider of resin art pieces and educational programs in Nigeria."
          </h2>
          <div className="flex flex-col items-center">
             <div className="w-20 h-20 rounded-full bg-slate-300 mb-4 overflow-hidden shadow-lg border-2 border-white">
                <img src="https://res.cloudinary.com/dfribrcrt/image/upload/v1765300601/E941D90D-1434-40E9-B27C-53ED0724EB3E_bkr8uy.jpg" alt="Zainab" className="w-full h-full object-cover"/>
             </div>
             <p className="text-slate-900 font-bold tracking-widest text-xs uppercase">Zainab Yinusa</p>
             <p className="text-slate-500 text-xs mt-1">Founder, Hautezelle Studio</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;