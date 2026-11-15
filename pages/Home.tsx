import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { PageRoutes } from '../types';
import SEO from '../components/SEO';
import site from '../data/site.json';
import { INSTAGRAM_DM } from '../constants';
import { useCurtainOpened } from '../components/CurtainIntro';

const pillars = [
  {
    n: 'I',
    title: 'Unique design',
    text: 'Every piece is handcrafted with care, so no two are ever the same. You own something made only for you.',
  },
  {
    n: 'II',
    title: 'Community',
    text: 'Through Resin N Sip events and our Academy, we bring people together to create, learn and grow as artists.',
  },
  {
    n: 'III',
    title: 'Global identity',
    text: 'Modern resin technique meets cultural heritage, in art that speaks to the world and honours our Nigerian roots.',
  },
];

const featured = [
  { title: 'Wedding plaques', note: 'From ₦35,000', img: '/images/wedding-plaque-pink.jpg', alt: 'Pink resin wedding plaque with crystal border' },
  { title: 'Luxury bags', note: 'From ₦70,000', img: '/images/pearl-bag-2.jpg', alt: 'Handmade pearl resin bag beside a mirror' },
  { title: 'Resin clocks', note: 'From ₦60,000', img: '/images/resin-clock.jpg', alt: 'Ivory resin wall clock with Roman numerals' },
];

const testimonials = [
  {
    name: 'Titi',
    place: 'Lagos',
    item: 'Resin bookstand',
    text: 'I recently purchased the Resin Bookstand from Hautezelle Studio, and I must say it has transformed my reading space. The intricate design and vibrant colors make each reading session feel like a journey into a magical world. Thank you, Hautezelle, for adding a touch of art to my literary escapes!',
  },
  {
    name: 'Aisha',
    place: 'Canada',
    item: 'Resin wall clock',
    text: "The Resin Wall Clock I ordered from Hautezelle Studio is nothing short of amazing! The attention to detail and the unique blend of colors make it a standout piece in my living room. It's more than just a clock; it's a work of art that adds character to my home. Highly recommended!",
  },
  {
    name: 'Bibit',
    place: 'Germany',
    item: 'Resin phone case',
    text: "I'm in love with my Resin Phone Case from Hautezelle Studio! The combination of functionality and artistic flair is impressive. It not only protects my phone but also turns heads wherever I go. The craftsmanship is top-notch, and I appreciate the uniqueness it brings to my daily life. Hautezelle Studio, you've gained a loyal customer!",
  },
];

const services = [
  { title: 'Resin N Sip', text: 'A relaxed creative gathering with drinks, where you pour your own piece.' },
  { title: 'Training', text: 'Online and in studio courses for every level, with certification.' },
  { title: 'Corporate gifts', text: 'Branded resin souvenirs and gifts for organisations and events.' },
  { title: 'Bespoke gifting', text: 'Wedding souvenirs and personal pieces made to your exact vision.' },
  { title: 'Interior décor', text: 'Custom resin pieces designed for your home, office or event space.' },
];

const Home: React.FC = () => {
  const curtainOpen = useCurtainOpened();

  return (
    <div className="w-full bg-ivory text-ink">
      <SEO page="/" />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 lg:pt-36">
        <div className="wrap grid items-center gap-12 pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={curtainOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7 text-center lg:text-left"
          >
            <span className="eyebrow">Handmade luxury from Ilorin, Nigeria</span>
            <h1 className="display text-[3.1rem] sm:text-7xl xl:text-[6.25rem]">
              Timeless, luxurious <em className="text-teal-700">masterpieces</em>
            </h1>
            <p className="lead mx-auto max-w-[30em] lg:mx-0">
              Bespoke resin art, jewellery and home décor, poured by hand in our Ilorin studio to inspire passion and celebrate global identity.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link to={PageRoutes.SHOP} className="btn-solid w-full sm:w-auto">Shop the collection</Link>
              <Link to={PageRoutes.ACADEMY} className="btn-line w-full sm:w-auto">Visit the academy</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={curtainOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[460px]"
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-t-[999px] bg-mist">
              <img
                src="/images/wedding-plaque.jpg"
                alt="Personalised resin wedding plaque with pearls and pressed flowers"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-2 hidden h-36 w-28 overflow-hidden rounded-t-full border-4 border-ivory shadow-xl sm:block sm:-left-10 sm:h-44 sm:w-36">
              <img src="/images/journal.jpg" alt="Teal resin journal with glitter edges" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -right-2 bottom-10 max-w-[200px] border border-mist bg-white px-5 py-4 shadow-lg sm:-right-8">
              <span className="block text-[11px] uppercase tracking-[0.24em] text-teal-700">Made to order</span>
              <span className="mt-1 block text-[17px] leading-snug">No two pieces are ever alike</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-y border-mist">
        <div className="wrap flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-6 text-[17px] italic text-[#4a5553] sm:justify-between">
          {['Wedding plaques', 'Wall clocks', 'Pearl bags', 'Journals', 'Gift sets'].map((c, i, a) => (
            <React.Fragment key={c}>
              <span>{c}</span>
              {i < a.length - 1 && <span aria-hidden="true" className="hidden text-teal-500 sm:inline">✦</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="wrap py-24 lg:py-32">
        <div className="mb-14 grid items-end gap-6 lg:mb-20 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">Our philosophy</span>
            <h2 className="h2">Curating elegance and passion</h2>
          </div>
          <p className="lead">
            Our mission is to create captivating and distinctive art and craft pieces that inspire passion, love and global identity. We are more than an art studio. We are a movement.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-12">
          {pillars.map((p) => (
            <div key={p.n} className="rule-card">
              <span className="text-sm tracking-[0.1em] text-teal-700">{p.n}</span>
              <h3 className="text-[28px]">{p.title}</h3>
              <p className="text-base leading-[1.75] text-[#4a5553]">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured collections */}
      <section className="bg-teal-700 text-white">
        <div className="wrap py-24 lg:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
            <div className="flex flex-col gap-4">
              <span className="eyebrow text-teal-100">Our masterpieces</span>
              <h2 className="h2">Featured collections</h2>
            </div>
            <Link to={PageRoutes.SHOP} className="text-link text-teal-50 hover:text-white">
              View all pieces <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featured.map((f, i) => (
              <Link
                key={f.title}
                to={PageRoutes.SHOP}
                className={`group flex flex-col gap-5 ${i === 1 ? 'lg:mt-14' : ''} ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className={`overflow-hidden bg-teal-800 ${i === 2 ? 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]' : 'aspect-[4/5]'}`}>
                  <img src={f.img} alt={f.alt} loading="lazy" className="ph-zoom h-full w-full object-cover" />
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[26px]">{f.title}</span>
                  <span className="text-sm italic text-teal-100">{f.note}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Founder quote */}
      <section className="wrap flex flex-col items-center gap-10 py-24 text-center lg:py-36">
        <span aria-hidden="true" className="text-7xl leading-[0.5] text-teal-500">“</span>
        <blockquote className="max-w-[900px] text-[1.85rem] italic leading-[1.3] sm:text-4xl lg:text-5xl">
          We are positioned to become the premier provider of resin art pieces and educational programs in Nigeria.
        </blockquote>
        <div className="flex flex-col items-center gap-3">
          <img src="/images/zainab-yinusa.jpg" alt="Zainab Yinusa" loading="lazy" className="h-16 w-16 rounded-full object-cover" />
          <span className="text-[13px] uppercase tracking-[0.24em]">Zainab Yinusa</span>
          <span className="text-[15px] text-[#5b6563]">Founder, Hautezelle Studio</span>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-mist bg-white/60">
        <div className="wrap py-24 lg:py-32">
          <div className="mb-14 flex flex-col items-center gap-5 text-center lg:mb-20">
            <span className="eyebrow">Testimonials</span>
            <h2 className="h2">Loved from Lagos to the world</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className={`flex flex-col gap-6 p-8 sm:p-10 ${i === 1 ? 'bg-teal-700 text-white' : 'border border-mist bg-white'} ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <span aria-hidden="true" className={`text-6xl leading-[0.5] ${i === 1 ? 'text-teal-200' : 'text-teal-500'}`}>“</span>
                <blockquote className="text-[17px] italic leading-[1.7] sm:text-lg">{t.text}</blockquote>
                <figcaption className={`mt-auto flex flex-col gap-1 border-t pt-5 ${i === 1 ? 'border-teal-600' : 'border-mist'}`}>
                  <span className="text-xs uppercase tracking-[0.22em]">{t.name}</span>
                  <span className={`text-sm ${i === 1 ? 'text-teal-50' : 'text-[#5b6563]'}`}>{t.place} · {t.item}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Academy teaser */}
      <section className="bg-teal-50">
        <div className="wrap grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="w-full aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:aspect-[4/5]">
            <img src="/images/resin-pens-hand.jpg" alt="Hand holding personalised resin pens with silver flakes" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <span className="eyebrow">Hautezelle Academy</span>
            <h2 className="h2">Learn the art of resin</h2>
            <p className="lead">
              From your very first pour to running a business, our courses take you from enthusiast to professional. Study online at your own pace or join us in the Ilorin studio.
            </p>
            <div className="flex flex-wrap gap-8 border-y border-teal-200 py-6 sm:gap-10">
              {[['50+', 'Students trained'], ['15', 'Course modules'], ['3', 'Programmes']].map(([v, l]) => (
                <div key={l} className="flex flex-col gap-1">
                  <span className="text-4xl">{v}</span>
                  <span className="text-[13px] text-[#5b6563]">{l}</span>
                </div>
              ))}
            </div>
            <div>
              <Link to={PageRoutes.ACADEMY} className="btn-solid">Explore the curriculum</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="wrap py-24 lg:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">What we do</span>
            <h2 className="h2">Experiences in resin</h2>
          </div>
          <Link to={PageRoutes.SERVICES} className="text-link text-teal-700 hover:text-teal-900">
            All services <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s) => (
            <Link key={s.title} to={PageRoutes.SERVICES} className="group flex flex-col gap-3 border-t border-teal-200 pt-6">
              <span className="text-2xl transition-colors group-hover:text-teal-700">{s.title}</span>
              <span className="text-[15px] leading-[1.7] text-[#4a5553]">{s.text}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-mist bg-white/60" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-28">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">Good to know</span>
            <h2 id="faq-heading" className="h2">Frequently asked questions</h2>
          </div>
          <div className="divide-y divide-mist border-y border-mist">
            {site.faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <h3 className="text-lg transition-colors group-open:text-teal-700 sm:text-xl">{f.q}</h3>
                  <Plus size={20} className="shrink-0 text-teal-700 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-4 leading-[1.75] text-[#4a5553]">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="btn-solid">Ask us on Instagram</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
