import React from 'react';
import { Instagram, Mail, MapPin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoutes } from '../types';
import { INSTAGRAM_DM, INSTAGRAM_PROFILE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-teal-800 pb-12 text-center md:text-left">
        <div className="space-y-6 flex flex-col items-center md:items-start">
           <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl font-bold font-serif tracking-tighter text-white">
              HAUTEZELLE
            </span>
            <span className="text-xs tracking-[0.4em] font-light text-teal-300">
              STUDIO
            </span>
          </div>
          <p className="text-teal-100/70 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Creating captivating and distinctive art pieces that inspire passion, love, and global identity. The premier provider of resin art in Nigeria.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-serif mb-6 tracking-wide text-teal-200">Explore</h4>
          <ul className="space-y-3 text-teal-100/70 text-sm">
            <li><Link to={PageRoutes.SHOP} className="hover:text-white transition-colors">Shop Collections</Link></li>
            <li><Link to={PageRoutes.ACADEMY} className="hover:text-white transition-colors">The Academy</Link></li>
            <li><Link to={PageRoutes.SERVICES} className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to={PageRoutes.ABOUT} className="hover:text-white transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif mb-6 tracking-wide text-teal-200">Contact</h4>
          <ul className="space-y-4 text-teal-100/70 text-sm flex flex-col items-center md:items-start">
            <li className="flex items-center md:items-start">
              <MapPin size={18} className="mr-3 mt-0.5 shrink-0 hidden md:block" />
              <span>Ilorin, Kwara State<br />Nigeria</span>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="mr-3 shrink-0 hidden md:block" />
              <span>hautezelle@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif mb-6 tracking-wide text-teal-200">Stay in Touch</h4>
          <p className="text-teal-100/70 text-sm mb-4">Send us a DM for new collections and workshop dates.</p>
          <a
            href={INSTAGRAM_DM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-teal-950 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-teal-50 transition-colors rounded-sm"
          >
            Message us on Instagram
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-teal-100/40 text-xs">
        <div className="order-2 md:order-1 mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-2">
            <p>&copy; {new Date().getFullYear()} Hautezelle Studio. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <a href="https://getmvps.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition-colors">
                Built by GetMVPs
            </a>
        </div>
        <div className="flex space-x-6 order-1 md:order-2">
          <a href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;