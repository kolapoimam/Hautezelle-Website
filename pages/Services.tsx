import React from 'react';
import { Brush, Briefcase, Gift, Wine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoutes } from '../types';
import SEO from '../components/SEO';
import { INSTAGRAM_DM } from '../constants';

const Services: React.FC = () => {

  return (
    <div className="w-full bg-white">
      <SEO page="/services" />

      {/* Services Hero */}
       <div className="pt-48 pb-24 px-6 max-w-7xl mx-auto text-center">
          <span className="text-teal-600 tracking-widest text-xs uppercase font-bold mb-4 block">What We Do</span>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-tight">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light">
             Beyond creating beautiful art, we cultivate creativity through education, strategic partnerships, and immersive experiences.
          </p>
        </div>

      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-32">
        {/* Resin N Sip */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 order-2 md:order-1">
             <div className="relative">
                <div className="absolute top-0 right-0 w-full h-full bg-teal-50 rounded-[2.5rem] transform translate-x-4 -translate-y-4"></div>
                <img src="/images/keychain.jpg" alt="Resin N Sip" className="w-full rounded-[2.5rem] shadow-2xl relative z-10" />
             </div>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-800 mb-8">
              <Wine size={32} />
            </div>
            <h2 className="text-4xl font-serif text-slate-900 mb-6">Resin N Sip</h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg font-light">
              Our signature outdoor event designed to introduce the public to resin art. Enjoy a relaxed atmosphere with drinks while learning to create your own masterpiece. Perfect for team bonding, bridal showers, or a creative weekend out.
            </p>
            <ul className="space-y-3 mb-10 text-sm text-slate-500 font-bold uppercase tracking-widest">
              <li className="flex items-center"><span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span> Hands-on demonstration</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span> All materials provided</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span> Take home your art</li>
            </ul>
             <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="text-teal-900 font-bold text-xs uppercase tracking-widest border-b border-teal-900 pb-1 hover:text-teal-600 hover:border-teal-600 transition-colors">
              Book a Session
            </a>
          </div>
        </div>

         {/* Training Programs */}
         <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
             <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-800 mb-8">
              <Brush size={32} />
            </div>
            <h2 className="text-4xl font-serif text-slate-900 mb-6">Training Academy</h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg font-light">
              Comprehensive online and offline courses for aspiring resin artists. We cover everything from safety and materials to advanced techniques and business strategies for selling your art.
            </p>
             <ul className="space-y-3 mb-10 text-sm text-slate-500 font-bold uppercase tracking-widest">
              <li className="flex items-center"><span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span> Beginner to Advanced levels</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span> Business of Art modules</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span> Certification Included</li>
            </ul>
            <Link to={PageRoutes.ACADEMY} className="text-teal-900 font-bold text-xs uppercase tracking-widest border-b border-teal-900 pb-1 hover:text-teal-600 hover:border-teal-600 transition-colors">
              View Curriculum
            </Link>
          </div>
          <div className="md:w-1/2">
             <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-100 rounded-[2.5rem] transform -translate-x-4 translate-y-4"></div>
                <img src="/images/bookmark.jpg" alt="Academy" className="w-full rounded-[2.5rem] shadow-2xl relative z-10" />
             </div>
          </div>
        </div>

         {/* Corporate */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 order-2 md:order-1">
             <div className="relative">
                <div className="absolute top-0 right-0 w-full h-full bg-teal-900 rounded-[2.5rem] transform translate-x-4 -translate-y-4 opacity-10"></div>
                <img src="/images/resin-pens.jpg" alt="Corporate" className="w-full rounded-[2.5rem] shadow-2xl relative z-10" />
             </div>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
             <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-800 mb-8">
              <Briefcase size={32} />
            </div>
            <h2 className="text-4xl font-serif text-slate-900 mb-6">Corporate Partnerships</h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg font-light">
              We collaborate with brands, associations, and organizations to create custom resin souvenirs and promotional items. Elevate your corporate gifting with handmade, branded excellence.
            </p>
            <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="text-teal-900 font-bold text-xs uppercase tracking-widest border-b border-teal-900 pb-1 hover:text-teal-600 hover:border-teal-600 transition-colors">
              Contact for Inquiry
            </a>
          </div>
        </div>

         {/* Custom Gifts */}
         <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
             <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-800 mb-8">
              <Gift size={32} />
            </div>
            <h2 className="text-4xl font-serif text-slate-900 mb-6">Bespoke Gifting</h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg font-light">
              From wedding souvenirs to personalized home decor, we bring your specific ideas to life. Our custom order process ensures your vision is perfectly translated into resin.
            </p>
            <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="text-teal-900 font-bold text-xs uppercase tracking-widest border-b border-teal-900 pb-1 hover:text-teal-600 hover:border-teal-600 transition-colors">
              Start a Project
            </a>
          </div>
          <div className="md:w-1/2">
             <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-pink-50 rounded-[2.5rem] transform -translate-x-4 translate-y-4"></div>
                <img src="/images/couples-keychain-box.jpg" alt="Gifting" className="w-full rounded-[2.5rem] shadow-2xl relative z-10" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;