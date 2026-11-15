import React from 'react';
import { Target, Heart, Leaf, Quote, ArrowRight, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { INSTAGRAM_DM, SITE_URL } from '../constants';

const About: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hautezelle Studio",
    "url": "https://hautezelle.com", // Placeholder URL
    "logo": `${SITE_URL}/images/studio-wall.jpg`,
    "founder": {
      "@type": "Person",
      "name": "Zainab Yinusa"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hautezelle@gmail.com",
      "contactType": "customer service"
    }
  };

  return (
    <div className="w-full bg-white">
      <SEO 
        title="Our Story | Hautezelle Studio" 
        description="Learn about Hautezelle Studio's journey, our mission to redefine resin art in Nigeria, and the passionate team behind the brand."
        schema={schema}
      />

       {/* Hero Section */}
       <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
          <span className="text-teal-600 tracking-widest text-xs uppercase font-bold mb-4 block">The Hautezelle Story</span>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-tight">
            Crafting Elegance <br/> <span className="italic text-teal-700">Defining Artistry</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light">
            Born from a desire to blend creativity with global identity, Hautezelle Studio has grown into Nigeria's premier provider of luxury resin decor and artistic education.
          </p>
        </div>

        <div className="w-full h-[60vh] relative overflow-hidden mb-24">
             <img 
              src="/images/studio-wall.jpg" 
              alt="Studio Workshop" 
              className="w-full h-full object-cover attachment-fixed"
            />
            <div className="absolute inset-0 bg-teal-900/10"></div>
        </div>

        {/* Philosophy Cards Section */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          {/* Quote Section */}
          <div className="relative mb-24">
             <div className="bg-teal-950 text-white p-12 md:p-20 relative z-10 shadow-2xl rounded-[3rem] text-center overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                
                <Quote size={48} className="text-teal-400 mb-8 opacity-50 mx-auto" />
                <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-relaxed max-w-4xl mx-auto">
                  "Resin allows for a fluidity and depth that few other mediums can achieve. It captures movement in a solid state, preserving moments of color and emotion forever."
                </h2>
                <div className="w-24 h-1 bg-teal-500 mx-auto mb-6"></div>
             </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Mission Card */}
            <div className="bg-white border border-slate-100 p-12 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-teal-100 transition-colors"></div>
              <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-800 mb-8 relative z-10 group-hover:bg-teal-900 group-hover:text-white transition-colors duration-500">
                <Target size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-4 relative z-10">Our Mission</h3>
              <p className="text-slate-500 leading-loose relative z-10 text-lg font-light">
                To create captivating and distinctive art and craft pieces that inspire passion, love, and global identity. We strive to push the boundaries of what is possible with resin.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white border border-slate-100 p-12 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-teal-100 transition-colors"></div>
              <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-800 mb-8 relative z-10 group-hover:bg-teal-900 group-hover:text-white transition-colors duration-500">
                <Leaf size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-4 relative z-10">Our Vision</h3>
              <p className="text-slate-500 leading-loose relative z-10 text-lg font-light">
                 To become the premier provider of resin art pieces and educational programs in Nigeria, while cultivating a vibrant community of artists and enthusiasts.
              </p>
            </div>

            {/* Values Card */}
            <div className="bg-white border border-slate-100 p-12 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-teal-100 transition-colors"></div>
              <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-800 mb-8 relative z-10 group-hover:bg-teal-900 group-hover:text-white transition-colors duration-500">
                <Heart size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-4 relative z-10">Our Values</h3>
              <p className="text-slate-500 leading-loose relative z-10 text-lg font-light">
                Creativity, Quality, Passion, Community, Sustainability. These core values guide every pour, every design, and every workshop we host.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-slate-50 py-32 rounded-t-[4rem]">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <span className="text-teal-600 tracking-widest text-xs uppercase font-bold mb-3 block">Leadership</span>
                <h2 className="text-4xl font-serif text-slate-900">The Minds Behind The Art</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Founder */}
                <div className="bg-white p-12 shadow-xl border border-slate-100 text-center group hover:-translate-y-2 transition-transform duration-300 rounded-[2.5rem]">
                  <div className="w-48 h-48 bg-slate-200 rounded-full mx-auto mb-10 overflow-hidden border-8 border-slate-50 shadow-inner">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-800 to-teal-950" role="img" aria-label="Zainab Yinusa"><span className="font-serif text-6xl text-white">ZY</span></div>
                  </div>
                  <h3 className="text-3xl font-serif text-slate-900 mb-2">Zainab Yinusa</h3>
                  <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-8">Founder & Creative Director</p>
                  <p className="text-slate-500 text-sm leading-loose font-light px-4">
                    With extensive experience in resin art and a strong passion for entrepreneurship, Zainab leads the creative direction of the studio. Her unique vision blends traditional Nigerian aesthetics with modern resin techniques.
                  </p>
                </div>

                 {/* Strategy */}
                 <div className="bg-white p-12 shadow-xl border border-slate-100 text-center group hover:-translate-y-2 transition-transform duration-300 rounded-[2.5rem]">
                  <div className="w-48 h-48 bg-slate-200 rounded-full mx-auto mb-10 overflow-hidden border-8 border-slate-50 shadow-inner">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-800 to-teal-950" role="img" aria-label="Kolapo Imam"><span className="font-serif text-6xl text-white">KI</span></div>
                  </div>
                  <h3 className="text-3xl font-serif text-slate-900 mb-2">Kolapo Imam</h3>
                  <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-8">Consultant & Strategy Officer</p>
                  <p className="text-slate-500 text-sm leading-loose font-light px-4">
                    Bringing nearly a decade of experience in marketing, business development, and operations, Kolapo drives the strategic growth and global positioning of Hautezelle, ensuring operational excellence.
                  </p>
                </div>
              </div>
           </div>
        </div>

        {/* Join The Team CTA - Compact Luxury Card */}
        <div className="bg-white pb-24 pt-12">
           <div className="max-w-5xl mx-auto px-6">
             {/* Reduced padding from py-24 to py-16 to make it less tall */}
             <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-teal-950 via-teal-900 to-slate-950 px-8 py-16 text-center shadow-2xl">
               {/* Background Decorative Elements */}
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-overlay opacity-20 blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400 rounded-full mix-blend-overlay opacity-20 blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>
               
               <div className="relative z-10 flex flex-col items-center">
                 <div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-200 mb-6 shadow-inner">
                   <Sparkles size={24} />
                 </div>
                 
                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 tracking-tight">
                   Join Our Creative <span className="text-teal-300 italic">Legacy</span>
                 </h2>
                 
                 <p className="text-teal-100/80 text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
                   Are you passionate about art or business management? We are always looking for visionary individuals to help us elevate the art of resin.
                 </p>
                 
                 <a 
                   href={INSTAGRAM_DM}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative inline-flex items-center gap-3 bg-white text-teal-950 px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-teal-50 transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
                 >
                   <span className="relative z-10">Ignite Your Potential</span>
                   <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                 </a>
               </div>
             </div>
           </div>
        </div>
    </div>
  );
};

export default About;