import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { INSTAGRAM_DM } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <SEO page="/contact" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Info */}
        <div>
           <span className="text-teal-600 tracking-widest text-xs uppercase font-bold mb-3 block">Get In Touch</span>
           <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8">Visit Our Studio</h1>
           <p className="text-slate-600 mb-12 text-lg leading-relaxed">
             Whether you're looking to commission a bespoke piece, enroll in a workshop, or discuss a corporate partnership, we'd love to hear from you.
           </p>

           <div className="space-y-8">
             <div className="flex items-start">
               <div className="bg-teal-50 p-3 rounded-full mr-4 text-teal-800">
                 <MapPin size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 mb-1">Location</h3>
                 <p className="text-slate-600">Ilorin, Kwara State, Nigeria</p>
                 <p className="text-sm text-slate-400 mt-1">Open Mon-Fri, 9am - 5pm</p>
               </div>
             </div>

             <div className="flex items-start">
               <div className="bg-teal-50 p-3 rounded-full mr-4 text-teal-800">
                 <Phone size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                 <p className="text-slate-600"><a href="tel:+2349030799342" className="hover:text-teal-700">0903 079 9342</a></p>
                 <p className="text-sm text-slate-400 mt-1">Available for WhatsApp Support</p>
               </div>
             </div>

             <div className="flex items-start">
               <div className="bg-teal-50 p-3 rounded-full mr-4 text-teal-800">
                 <Mail size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                 <p className="text-slate-600">hautezelle@gmail.com</p>
               </div>
             </div>
           </div>
        </div>

        {/* Form */}
        <div className="bg-slate-50 p-8 md:p-12 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-serif text-slate-900 mb-6">Send us a message</h2>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.open(INSTAGRAM_DM, '_blank', 'noopener'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">First Name</label>
                <input type="text" className="w-full bg-white border border-slate-200 p-3 focus:outline-none focus:border-teal-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Last Name</label>
                <input type="text" className="w-full bg-white border border-slate-200 p-3 focus:outline-none focus:border-teal-500 transition-colors" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
              <input type="email" className="w-full bg-white border border-slate-200 p-3 focus:outline-none focus:border-teal-500 transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Subject</label>
              <select className="w-full bg-white border border-slate-200 p-3 focus:outline-none focus:border-teal-500 transition-colors text-slate-600">
                <option>General Inquiry</option>
                <option>Custom Order</option>
                <option>Workshop Registration</option>
                <option>Corporate Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Message</label>
              <textarea rows={5} className="w-full bg-white border border-slate-200 p-3 focus:outline-none focus:border-teal-500 transition-colors"></textarea>
            </div>

            <button type="submit" className="w-full bg-teal-900 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-teal-800 transition-colors">
              Send via Instagram DM
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
