import React from 'react';
import { Link } from 'react-router-dom';
import { PageRoutes } from '../types';
import SEO from '../components/SEO';
import { INSTAGRAM_DM } from '../constants';

type ServiceBlock = {
  num: string;
  tag: string;
  title: string;
  text: string;
  points?: string[];
  cta: string;
  href: string;
  internal?: boolean;
  img: string;
  alt: string;
  tone: 'light' | 'tint' | 'dark';
};

const blocks: ServiceBlock[] = [
  {
    num: '01', tag: 'Signature event', title: 'Resin N Sip',
    text: 'Our outdoor gathering that introduces the public to resin art. Relax with drinks as you learn to create a piece of your own. A lovely choice for team bonding, bridal showers or a creative weekend.',
    points: ['Hands on demonstration', 'All materials provided', 'Take your art home'],
    cta: 'Book a session', href: INSTAGRAM_DM,
    img: '/images/wedding-favour-keychains.jpg', alt: 'Rows of personalised resin keychains', tone: 'light',
  },
  {
    num: '02', tag: 'Education', title: 'Training academy',
    text: 'Complete online and in studio courses for aspiring resin artists, covering safety and materials through to advanced technique and selling your work.',
    points: ['Beginner to advanced levels', 'Business of Art modules', 'Certification included'],
    cta: 'View the curriculum', href: PageRoutes.ACADEMY, internal: true,
    img: '/images/resin-pens-hand.jpg', alt: 'Personalised resin pens held in a gloved hand', tone: 'tint',
  },
  {
    num: '03', tag: 'For organisations', title: 'Corporate partnerships',
    text: 'We work with brands, associations and organisations to create custom resin souvenirs and promotional pieces. Corporate gifting, handmade and beautifully branded.',
    cta: 'Make an inquiry', href: INSTAGRAM_DM,
    img: '/images/keychain-pen-gift-box.jpg', alt: 'Named keychain and pen in a window gift box', tone: 'light',
  },
  {
    num: '04', tag: 'Made to order', title: 'Bespoke gifting',
    text: 'From wedding souvenirs to personal home décor, we bring your idea to life. Our custom process makes sure your vision is translated perfectly into resin.',
    cta: 'Start a project', href: INSTAGRAM_DM,
    img: '/images/couples-keychain-box.jpg', alt: 'Couples heart keychain in a gift box', tone: 'dark',
  },
  {
    num: '05', tag: 'For your space', title: 'Custom interior décor',
    text: 'We design and create resin pieces for your home, office or event space. Wall art, clocks, plaques and statement décor, shaped around your colours, your style and your room.',
    points: ['Colours matched to your interior', 'Pieces made to your measurements', 'Homes, offices and event spaces'],
    cta: 'Book a consultation', href: INSTAGRAM_DM,
    img: '/images/mini-wedding-plaque-2.jpg', alt: 'Resin plaque with gold flakes and pearls styled with a mirror', tone: 'light',
  },
];

const toneClass = {
  light: 'bg-ivory text-ink',
  tint: 'bg-teal-50 text-ink',
  dark: 'bg-teal-700 text-white',
};

const Services: React.FC = () => {
  return (
    <div className="w-full bg-ivory text-ink">
      <SEO page="/services" />

      <section className="wrap flex flex-col items-center gap-6 pb-20 pt-32 text-center sm:pt-40 lg:pb-24">
        <span className="eyebrow">What we do</span>
        <h1 className="display text-[3rem] sm:text-7xl lg:text-[5.5rem]">
          Our <em className="text-teal-700">services</em>
        </h1>
        <p className="lead max-w-[36em]">
          Beyond creating beautiful art, we cultivate creativity through education, partnerships and immersive experiences.
        </p>
      </section>

      {blocks.map((b, i) => {
        const dark = b.tone === 'dark';
        const flip = i % 2 === 1;
        const Cta = b.internal ? (
          <Link to={b.href} className={dark ? 'btn-light' : 'btn-solid'}>{b.cta}</Link>
        ) : (
          <a href={b.href} target="_blank" rel="noopener noreferrer" className={dark ? 'btn-light' : 'btn-solid'}>{b.cta}</a>
        );
        return (
          <section key={b.num} className={`${toneClass[b.tone]} ${b.tone === 'light' ? 'border-t border-mist' : ''}`}>
            <div className="wrap grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
              <div className={`w-full aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[16/11] lg:aspect-[4/5] ${flip ? 'lg:order-2' : ''}`}>
                <img src={b.img} alt={b.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-6">
                <span className={`text-sm tracking-[0.1em] ${dark ? 'text-teal-100' : 'text-teal-700'}`}>{b.num} · {b.tag}</span>
                <h2 className="text-[2.25rem] leading-[1.1] sm:text-5xl lg:text-[3.4rem]">{b.title}</h2>
                <p className={`text-[17px] leading-[1.75] ${dark ? 'text-teal-50' : 'text-[#4a5553]'}`}>{b.text}</p>
                {b.points && (
                  <ul className={`flex flex-col gap-3 border-t pt-6 text-[15px] ${dark ? 'border-teal-600' : b.tone === 'tint' ? 'border-teal-200' : 'border-mist'}`}>
                    {b.points.map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-teal-200' : 'bg-teal-500'}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                <div>{Cta}</div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Services;
