import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { INSTAGRAM_DM } from '../constants';

const testimonials = [
  { name: 'Amina B.', role: 'Foundation graduate', text: 'The Foundation course changed my life. I went from admiring resin art to creating my own business in just 4 weeks.' },
  { name: 'Chioma O.', role: 'Masterclass student', text: "Hautezelle's techniques are unmatched. The geode art module alone is worth the investment. Truly world-class standard." },
  { name: 'Sarah T.', role: 'Business of Art', text: "I knew how to pour, but I didn't know how to sell. This academy gave me the roadmap to 7-figure sales." },
  { name: 'Zainab A.', role: 'Workshop attendee', text: 'The energy at the physical studio is electric. Learning directly from the team was an unforgettable experience.' },
  { name: 'Tunde K.', role: 'Corporate client', text: 'We booked a private session for our team and it was the highlight of our year. Professional and so much fun.' },
];

const stats = [
  { value: '50+', label: 'Students trained' },
  { value: '15', label: 'Curriculum modules' },
  { value: '99%', label: 'Success rate' },
  { value: 'Active', label: 'Alumni community' },
];

const programmes = [
  {
    level: 'Beginner',
    title: 'The Foundation',
    text: 'For complete beginners. Learn safety, mixing ratios and core pouring as you make your first coaster set and tray.',
    items: ['Material safety', 'Mixing and pouring', 'Colour theory', 'Finishing touches'],
    price: '₦150,000',
  },
  {
    level: 'Advanced · Most popular',
    title: 'Masterclass',
    text: 'Elevate your craft with geode art, ocean waves, flower preservation and complex layered 3D moulds.',
    items: ['Geode techniques', 'Ocean effects', 'Flower preservation', 'Large scale art'],
    price: '₦500,000',
    featured: true,
  },
  {
    level: 'Professional',
    title: 'Business of Art',
    text: 'Turn passion into profit. Price your work, market it online, package it well and handle shipping with ease.',
    items: ['Pricing strategy', 'Social media marketing', 'Product photography', 'Client management'],
    price: '₦250,000',
  },
];

const Academy: React.FC = () => {
  return (
    <div className="w-full bg-ivory text-ink">
      <SEO page="/academy" />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 lg:pt-36">
        <div className="wrap grid items-center gap-12 pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7 text-center lg:text-left"
          >
            <span className="eyebrow">Hautezelle Academy</span>
            <h1 className="display text-[3.1rem] sm:text-7xl xl:text-[6rem]">
              Master the art of <em className="text-teal-700">resin</em>
            </h1>
            <p className="lead mx-auto max-w-[30em] lg:mx-0">
              Join the leading resin art programme in Nigeria. From core technique to the business of art, we shape enthusiasts into professionals.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="btn-solid w-full sm:w-auto">Enrol now</a>
              <a href="#curriculum" className="btn-line w-full sm:w-auto">See the curriculum</a>
            </div>
          </motion.div>
          <div className="mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-b-[999px] rounded-t-[1.75rem] bg-mist">
            <img src="/images/journal-gift-set.jpg" alt="Teal resin journal, keychain, pen and bookmark set" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-mist">
        <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-2">
              <span className={`text-5xl leading-none ${i === 3 ? 'italic text-teal-700' : ''}`}>{s.value}</span>
              <span className="text-sm text-[#5b6563]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="wrap scroll-mt-28 py-24 lg:py-32">
        <div className="mb-14 flex flex-col items-center gap-5 text-center lg:mb-20">
          <span className="eyebrow">Our curriculum</span>
          <h2 className="h2">Three paths to mastery</h2>
          <p className="lead max-w-[34em]">Each programme blends technical skill with creative exploration, for every level of experience.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {programmes.map((p) => (
            <article
              key={p.title}
              className={`flex flex-col gap-6 rounded-[1.75rem] p-8 sm:p-10 ${p.featured ? 'bg-teal-700 text-white md:order-first md:col-span-2 lg:order-none lg:col-span-1' : 'border border-mist bg-white'}`}
            >
              <span className={`text-xs uppercase tracking-[0.24em] ${p.featured ? 'text-teal-100' : 'text-teal-700'}`}>{p.level}</span>
              <h3 className="text-[32px]">{p.title}</h3>
              <p className={`text-base leading-[1.75] ${p.featured ? 'text-teal-50' : 'text-[#4a5553]'}`}>{p.text}</p>
              <ul className={`flex flex-col gap-3 border-t pt-6 text-[15px] ${p.featured ? 'border-teal-600' : 'border-mist'}`}>
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-3">
                    <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${p.featured ? 'bg-teal-200' : 'bg-teal-500'}`} />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-5 pt-2">
                <span className="text-4xl">
                  <span className={`mr-2 text-xs uppercase tracking-[0.2em] ${p.featured ? 'text-teal-100' : 'text-[#5b6563]'}`}>From</span>
                  {p.price}
                </span>
                <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className={p.featured ? 'btn-light' : 'btn-line'}>Register</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Learn your way */}
      <section className="bg-teal-50">
        <div className="wrap py-24 lg:py-28">
          <div className="mb-12 flex flex-col gap-5 lg:mb-16">
            <span className="eyebrow">Flexible learning</span>
            <h2 className="h2">Learn your way</h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-5">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                <img src="/images/bookmark.jpg" alt="Teal glitter resin bookmark with a butterfly topper" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="text-[30px]">Online academy</h3>
              <p className="text-base leading-[1.75] text-[#4a5553]">
                High definition video lessons you can follow from anywhere, at your own pace, with lifetime access and a private community group.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                <img src="/images/studio-wall.jpg" alt="The Hautezelle Studio wall in Ilorin" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="text-[30px]">In studio workshops</h3>
              <p className="text-base leading-[1.75] text-[#4a5553]">
                Learn in person at our Ilorin studio, with direct guidance, instant feedback and the company of fellow artists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student stories */}
      <section className="wrap py-24 lg:py-32">
        <div className="mb-14 flex flex-col items-center gap-5 text-center lg:mb-20">
          <span className="eyebrow">Student stories</span>
          <h2 className="h2">Words from our community</h2>
        </div>
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rule-card m-0">
              <blockquote className="text-[19px] italic leading-[1.55] sm:text-xl">{t.text}</blockquote>
              <figcaption className="text-sm text-[#5b6563]">
                <span className="block text-xs uppercase tracking-[0.16em] text-ink">{t.name}</span>
                {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-500 text-teal-950">
        <div className="wrap flex flex-col items-center gap-6 py-20 text-center lg:py-24">
          <h2 className="h2 max-w-[14em]">Begin your journey in resin</h2>
          <p className="max-w-[32em] text-[17px] leading-[1.75] sm:text-lg">
            Send us a DM on Instagram to choose a programme and reserve your place in the next class.
          </p>
          <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="btn bg-teal-950 text-white hover:bg-ink">Start your journey</a>
        </div>
      </section>
    </div>
  );
};

export default Academy;
