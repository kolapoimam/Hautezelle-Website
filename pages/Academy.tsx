import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Users, Video, Star, CheckCircle, Quote, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';

const testimonials = [
  {
    name: "Amina B.",
    role: "Foundation Graduate",
    text: "The Foundation course changed my life. I went from admiring resin art to creating my own business in just 4 weeks."
  },
  {
    name: "Chioma O.",
    role: "Masterclass Student",
    text: "Hautezelle's techniques are unmatched. The geode art module alone is worth the investment. Truly world-class standard."
  },
  {
    name: "Sarah T.",
    role: "Business of Art",
    text: "I knew how to pour, but I didn't know how to sell. This academy gave me the roadmap to 7-figure sales."
  },
  {
    name: "Zainab A.",
    role: "Workshop Attendee",
    text: "The energy at the physical studio is electric. Learning directly from the team was an unforgettable experience."
  },
  {
    name: "Tunde K.",
    role: "Corporate Client",
    text: "We booked a private session for our team and it was the highlight of our year. Professional and so much fun."
  }
];

const stats = [
  { label: 'Students Trained', value: '50+' },
  { label: 'Curriculum Modules', value: '15' },
  { label: 'Success Rate', value: '99%' },
  { label: 'Community', value: 'Active' },
];

const WHATSAPP_LINK = "https://wa.me/2349030299342?text=Hello%20Hautezelle%20Studio,%20I'm%20interested%20in%20the%20Academy%20programs.";

const Academy: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Hautezelle Resin Art Academy",
    "description": "Learn professional resin art techniques from beginner to masterclass levels in Nigeria.",
    "provider": {
      "@type": "Organization",
      "name": "Hautezelle Studio",
      "sameAs": "https://hautezelle.com"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "NGN",
      "lowPrice": "150000",
      "highPrice": "500000"
    }
  };

  return (
    <div className="w-full bg-slate-50">
      <SEO 
        title="Resin Art Academy & Workshops | Hautezelle Studio" 
        description="Join the best resin art school in Nigeria. Online and offline courses available. Master resin pouring, safety, and business."
        schema={schema}
      />

       <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Hero */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080?random=50" 
            alt="Art Workshop" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-teal-400 tracking-[0.3em] text-xs md:text-sm uppercase font-bold mb-4 block">
              Hautezelle Academy
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-8">
              Master the Art <br/> of <span className="text-teal-200 italic">Resin</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Join the premier resin art educational program in Nigeria. From foundational techniques to the business of art, we mold enthusiasts into professionals.
            </p>
            <a 
              href={WHATSAPP_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-teal-500 text-teal-950 px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-full shadow-[0_0_20px_rgba(20,184,166,0.5)]"
            >
              Enroll Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Intro Stats - Redesigned */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="group relative p-8 rounded-[2.5rem] bg-slate-50 hover:bg-teal-950 transition-all duration-500 text-center border border-slate-100 hover:border-teal-800 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute top-4 right-4 text-teal-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Star size={16} fill="currentColor" />
                </div>
                <h3 className="text-4xl md:text-6xl font-serif text-teal-900 group-hover:text-white mb-2 transition-colors">{stat.value}</h3>
                <p className="text-xs uppercase tracking-widest text-slate-500 group-hover:text-teal-400 transition-colors font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">Our Curriculum</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">Designed for all skill levels, our programs offer a blend of technical mastery and creative exploration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Beginner */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 shadow-xl rounded-[2.5rem] border border-slate-100"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-700 mb-8">
                <BookOpen size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-4">The Foundation</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Perfect for complete beginners. Learn safety protocols, mixing ratios, and fundamental pouring techniques to create your first coaster set and tray.
              </p>
              <ul className="space-y-4 mb-10">
                {['Material Safety', 'Mixing & Pouring', 'Color Theory', 'Finishing Touches'].map(item => (
                  <li key={item} className="flex items-center text-sm text-slate-700">
                    <CheckCircle size={18} className="text-teal-500 mr-3 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-100 pt-8">
                 <span className="block text-3xl font-serif text-teal-900 mb-6">₦200,000</span>
                 <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full text-center py-4 border border-teal-900 text-teal-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-teal-900 hover:text-white transition-colors">
                    Register Now <ArrowUpRight size={16} className="ml-2" />
                 </a>
              </div>
            </motion.div>

             {/* Advanced */}
             <motion.div 
              whileHover={{ y: -10 }}
              className="bg-teal-900 text-white p-10 shadow-2xl rounded-[2.5rem] relative overflow-hidden transform md:-translate-y-8 ring-4 ring-teal-100/50"
            >
               <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-teal-800 rounded-full blur-3xl opacity-50"></div>
              <div className="w-16 h-16 bg-teal-800 rounded-2xl flex items-center justify-center text-teal-200 mb-8 relative z-10">
                <Star size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif text-white mb-4 relative z-10">Masterclass</h3>
              <p className="text-teal-100/70 text-sm leading-relaxed mb-8 relative z-10">
                Elevate your craft. Deep dive into geode art, ocean waves, preservation techniques, and working with complex 3D molds and layers.
              </p>
              <ul className="space-y-4 mb-10 relative z-10">
                {['Geode Techniques', 'Ocean Effects', 'Flower Preservation', 'Large Scale Art'].map(item => (
                  <li key={item} className="flex items-center text-sm text-teal-100">
                    <CheckCircle size={18} className="text-teal-400 mr-3 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-teal-800 pt-8 relative z-10">
                 <span className="block text-3xl font-serif text-white mb-6">₦500,000</span>
                 <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full text-center py-4 bg-white text-teal-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-teal-50 transition-colors">
                    Register Now <ArrowUpRight size={16} className="ml-2" />
                 </a>
              </div>
            </motion.div>

             {/* Business */}
             <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 shadow-xl rounded-[2.5rem] border border-slate-100"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-700 mb-8">
                <Award size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-4">Business of Art</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Turn your passion into profit. Learn how to price your work, market on social media, packaging, and handling shipping logistics.
              </p>
              <ul className="space-y-4 mb-10">
                {['Pricing Strategy', 'Social Media Marketing', 'Photography', 'Client Management'].map(item => (
                  <li key={item} className="flex items-center text-sm text-slate-700">
                    <CheckCircle size={18} className="text-teal-500 mr-3 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-100 pt-8">
                 <span className="block text-3xl font-serif text-teal-900 mb-6">₦300,000</span>
                 <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full text-center py-4 border border-teal-900 text-teal-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-teal-900 hover:text-white transition-colors">
                    Register Now <ArrowUpRight size={16} className="ml-2" />
                 </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Online vs Offline */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2 relative">
             <div className="absolute top-0 left-0 w-full h-full border-2 border-teal-100 rounded-[2.5rem] transform -translate-x-4 -translate-y-4"></div>
            <img 
              src="https://picsum.photos/800/800?random=52" 
              alt="Online Learning" 
              className="rounded-[2.5rem] shadow-2xl relative z-10 w-full"
            />
          </div>
          <div className="md:w-1/2">
            <span className="text-teal-600 tracking-widest text-xs uppercase font-bold mb-3 block">Flexible Learning</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8">Learn Your Way</h2>
            <div className="space-y-10">
              <div className="flex group">
                <div className="mr-8">
                  <div className="bg-teal-50 p-5 rounded-2xl shadow-sm text-teal-700 group-hover:bg-teal-900 group-hover:text-white transition-colors duration-300"><Video size={28} /></div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Online Academy</h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Access high-definition video tutorials from anywhere in the world. Learn at your own pace with lifetime access to course materials and our private community group.
                  </p>
                </div>
              </div>
              <div className="flex group">
                <div className="mr-8">
                  <div className="bg-teal-50 p-5 rounded-2xl shadow-sm text-teal-700 group-hover:bg-teal-900 group-hover:text-white transition-colors duration-300"><Users size={28} /></div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3 font-serif">In-Studio Workshops</h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Experience the magic firsthand in our Ilorin studio. Benefit from direct guidance, immediate feedback, and the inspiring company of fellow artists.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-teal-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-teal-800 transition-colors rounded-full shadow-lg inline-flex items-center gap-2"
                >
                  Start Your Journey <ArrowUpRight size={16} />
                </a>
            </div>
          </div>
        </div>
      </section>

      {/* Distinct Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 to-white overflow-hidden relative border-t border-slate-200">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-200 via-teal-500 to-teal-200 opacity-30"></div>
        <div className="text-center mb-16 relative z-10">
          <Quote size={40} className="mx-auto text-teal-200 mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Student Success Stories</h2>
          <p className="text-slate-500 mt-4 text-sm uppercase tracking-widest">Hear from our community</p>
        </div>
        
        <div className="relative w-full overflow-hidden">
           {/* Gradient Masks */}
           <div className="absolute top-0 left-0 h-full w-20 md:w-60 bg-gradient-to-r from-white to-transparent z-20"></div>
           <div className="absolute top-0 right-0 h-full w-20 md:w-60 bg-gradient-to-l from-white to-transparent z-20"></div>

           <div className="flex space-x-8 animate-marquee whitespace-nowrap px-4 py-8 w-fit">
              {/* Duplicate the array to ensure seamless loop */}
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="inline-block bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 w-[350px] md:w-[450px] flex-shrink-0 whitespace-normal hover:border-teal-300 transition-colors duration-300 group">
                   <div className="flex mb-4">
                     {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-current mr-1" />)}
                   </div>
                   <p className="text-slate-600 text-lg italic font-serif leading-relaxed mb-6 group-hover:text-teal-900 transition-colors">"{t.text}"</p>
                   <div className="flex items-center">
                     <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-bold mr-3 font-serif">
                        {t.name.charAt(0)}
                     </div>
                     <div>
                       <p className="text-slate-900 font-bold text-sm">{t.name}</p>
                       <p className="text-teal-500 text-[10px] uppercase tracking-widest mt-0.5">{t.role}</p>
                     </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Academy;
