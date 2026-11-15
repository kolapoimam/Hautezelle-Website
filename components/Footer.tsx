import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoutes } from '../types';
import { INSTAGRAM_DM, WHATSAPP_CHAT } from '../constants';
import { SocialLinks } from './SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-800 text-teal-50">
      <div className="wrap pb-10 pt-20 lg:pt-24">
        <div className="grid gap-12 border-b border-teal-700 pb-14 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-10 lg:pb-16">
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <Link to={PageRoutes.HOME} aria-label="Hautezelle Studio home" className="flex flex-col items-center leading-none text-white sm:items-start">
              <span className="text-[26px] tracking-[0.08em]">HAUTEZELLE</span>
              <span className="mt-2 text-[10px] tracking-[0.55em] text-teal-300">STUDIO</span>
            </Link>
            <p className="mx-auto max-w-xs text-[15px] sm:mx-0 leading-[1.75] text-teal-100">
              Captivating art pieces that inspire passion, love and global identity. The premier provider of resin art in Nigeria.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-[15px] sm:items-start">
            <span className="mb-2 text-xs uppercase tracking-[0.24em] text-white">Explore</span>
            <Link to={PageRoutes.SHOP} className="text-teal-100 hover:text-white">Shop collections</Link>
            <Link to={PageRoutes.ACADEMY} className="text-teal-100 hover:text-white">The academy</Link>
            <Link to={PageRoutes.SERVICES} className="text-teal-100 hover:text-white">Services</Link>
            <Link to={PageRoutes.ABOUT} className="text-teal-100 hover:text-white">Our story</Link>
            <Link to={PageRoutes.CONTACT} className="text-teal-100 hover:text-white">Contact</Link>
          </div>

          <div className="flex flex-col items-center gap-3 text-[15px] sm:items-start">
            <span className="mb-2 text-xs uppercase tracking-[0.24em] text-white">Visit</span>
            <span className="text-teal-100">Ilorin, Kwara State, Nigeria</span>
            <a href="mailto:hautezelle@gmail.com" className="text-teal-100 hover:text-white">hautezelle@gmail.com</a>
            <a href={WHATSAPP_CHAT} target="_blank" rel="noopener noreferrer" className="text-teal-100 hover:text-white">Chat on WhatsApp</a>
          </div>

          <div className="flex flex-col items-center gap-4 text-[15px] sm:items-start">
            <span className="mb-1 text-xs uppercase tracking-[0.24em] text-white">Stay in touch</span>
            <p className="leading-[1.7] text-teal-100">Send us a DM for new collections and workshop dates.</p>
            <div>
              <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="btn-light">
                <Instagram size={16} /> Message us
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 pt-8 text-[13px] text-teal-200 sm:flex-row">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row">
            <span>&copy; {new Date().getFullYear()} Hautezelle Studio. All rights reserved.</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <a href="https://getmvps.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Built by GetMVPs</a>
          </div>
          <SocialLinks itemClassName="flex h-11 w-11 items-center justify-center rounded-full border border-teal-600 text-teal-100 transition-colors hover:border-white hover:text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
