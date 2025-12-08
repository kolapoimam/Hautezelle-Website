import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Instagram } from 'lucide-react';
import { PageRoutes } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Pages that have a dark hero image at the top (White Text)
  const isDarkHeroPage = location.pathname === PageRoutes.HOME || location.pathname === PageRoutes.ACADEMY;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: PageRoutes.HOME },
    { name: 'Shop', path: PageRoutes.SHOP },
    { name: 'Academy', path: PageRoutes.ACADEMY },
    { name: 'Services', path: PageRoutes.SERVICES },
    { name: 'About', path: PageRoutes.ABOUT },
  ];

  // Logic to determine if we should use the Dark Theme (Teal Text/White Backgrounds)
  // We use Dark Theme if:
  // 1. The Mobile Menu is OPEN (Background is white, so we need dark text)
  // 2. We have Scrolled down (Navbar background becomes white/glass)
  // 3. We are on a Light Page (not Home or Academy hero sections)
  const useDarkNav = isOpen || isScrolled || !isDarkHeroPage;

  const textColorClass = useDarkNav ? 'text-teal-950' : 'text-white';
  const subTextColorClass = useDarkNav ? 'text-teal-700' : 'text-teal-100';
  
  // Desktop Pill logic remains based on scroll/page mainly
  const glassBgClass = isScrolled 
    ? 'bg-white/90 border-white/40 shadow-sm' 
    : (isDarkHeroPage ? 'bg-black/20 border-white/20' : 'bg-teal-950/5 border-teal-900/10');

  const pillTextClass = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
        return isScrolled || !isDarkHeroPage ? 'bg-teal-900 text-white' : 'bg-white text-teal-900';
    }
    return isScrolled || !isDarkHeroPage ? 'text-slate-600 hover:text-teal-900 hover:bg-teal-50' : 'text-white hover:bg-white/20';
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 pt-6 px-4 md:px-12 flex justify-between items-center pointer-events-none`}
      >
        {/* Brand Logo - Left (Standalone) */}
        <Link to={PageRoutes.HOME} className="pointer-events-auto z-50 group" onClick={() => setIsOpen(false)}>
          <div className={`transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-2 px-4 rounded-xl shadow-sm' : ''}`}>
            <div className="flex flex-col items-start">
              <span className={`text-xl font-bold font-serif tracking-tighter transition-colors duration-300 ${textColorClass} drop-shadow-sm`}>
                HAUTEZELLE
              </span>
              <span className={`text-[0.6rem] tracking-[0.3em] font-light transition-colors duration-300 ${subTextColorClass} drop-shadow-sm`}>
                STUDIO
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Menu - Center Pill */}
        <div className={`hidden md:flex pointer-events-auto transition-all duration-500 absolute left-1/2 transform -translate-x-1/2 top-6`}>
           <div className={`
             flex items-center space-x-1 px-2 py-2 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300
             ${glassBgClass}
           `}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300
                  ${pillTextClass(link.path)}
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Actions - Right (Standalone Elements) */}
        <div className="hidden md:flex pointer-events-auto items-center gap-4">
           <a 
            href="https://instagram.com/hautezelle" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-3 rounded-full transition-all duration-300 ${isScrolled || !isDarkHeroPage ? 'bg-white/90 text-teal-900 shadow-md hover:text-teal-600 border border-slate-100' : 'bg-black/20 text-white hover:bg-white/20 backdrop-blur-sm'}`}
           >
            <Instagram size={20} />
           </a>
           <Link 
            to={PageRoutes.SHOP} 
            className="bg-teal-900 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-teal-800 text-white text-xs font-bold uppercase tracking-widest hover:bg-teal-800 transition-colors flex items-center gap-2 hover:-translate-y-0.5 transform duration-300"
           >
            <ShoppingBag size={16} />
            <span>Shop</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden pointer-events-auto z-50 backdrop-blur-md p-3 rounded-full shadow-lg transition-colors duration-300 ${useDarkNav ? 'bg-white text-teal-900 shadow-md border border-slate-100' : 'bg-white/20 text-white'}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-slate-50 z-40 transform transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col justify-center items-center space-y-8`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className="text-4xl font-serif text-teal-950 hover:text-teal-600 transition-colors relative group"
          >
            {link.name}
            <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
        ))}
         <Link 
            to={PageRoutes.CONTACT}
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold uppercase tracking-widest text-slate-400 mt-8"
         >
            Contact Us
         </Link>
         
         <div className="flex gap-6 mt-8">
            <a href="https://instagram.com/hautezelle" target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full text-teal-900 shadow-md"><Instagram size={24} /></a>
            <Link to={PageRoutes.SHOP} onClick={() => setIsOpen(false)} className="p-3 bg-teal-900 rounded-full text-white shadow-md"><ShoppingBag size={24} /></Link>
         </div>
      </div>
    </>
  );
};

export default Navbar;