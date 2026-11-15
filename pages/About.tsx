import React from 'react';
import SEO from '../components/SEO';
import { INSTAGRAM_DM } from '../constants';

const pillars = [
  {
    label: 'Our mission',
    text: 'To create captivating and distinctive art and craft pieces that inspire passion, love and global identity, always pushing what is possible with resin.',
  },
  {
    label: 'Our vision',
    text: 'To become the premier provider of resin art pieces and educational programmes in Nigeria, with a vibrant community of artists around us.',
  },
  {
    label: 'Our values',
    text: 'Creativity, quality, passion, community and sustainability. They guide every pour, every design and every workshop we host.',
  },
];

const team = [
  {
    name: 'Zainab Yinusa',
    role: 'Founder and Creative Director',
    img: '/images/zainab-yinusa.jpg',
    bio: 'With deep experience in resin art and a strong passion for enterprise, Zainab leads the creative direction of the studio. Her vision blends traditional Nigerian aesthetics with modern resin technique.',
  },
  {
    name: 'Kolapo Imam',
    role: 'Consultant and Strategy Officer',
    img: '/images/kolapo-imam.jpg',
    bio: 'Bringing nearly a decade of experience in marketing, business development and operations, Kolapo drives the strategic growth and global positioning of Hautezelle.',
  },
];

const gallery = [
  { img: '/images/wedding-plaque-green.jpg', alt: 'Green and gold resin wedding plaque' },
  { img: '/images/acrylic-wedding-plaque.jpg', alt: 'Acrylic wedding plaque with pearls' },
  { img: '/images/tabletop-plaque.jpg', alt: 'Gold resin graduation plaque' },
];

const About: React.FC = () => {
  return (
    <div className="w-full bg-ivory text-ink">
      <SEO page="/about" />

      {/* Intro */}
      <section className="wrap flex flex-col items-center gap-7 pb-16 pt-32 text-center sm:pt-40 lg:pb-20">
        <span className="eyebrow">The Hautezelle story</span>
        <h1 className="display max-w-[11em] text-[3rem] sm:text-7xl lg:text-[5.75rem]">
          Crafting elegance, defining <em className="text-teal-700">artistry</em>
        </h1>
        <p className="lead max-w-[36em]">
          Born from a desire to blend creativity with global identity, Hautezelle Studio has grown into a leading name in luxury resin décor and art education in Nigeria.
        </p>
      </section>

      <section className="wrap">
        <div className="w-full aspect-[4/3] overflow-hidden sm:aspect-[16/8]">
          <img src="/images/studio-wall.jpg" alt="The Hautezelle Studio wall with our Africa resin clock" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* Quote */}
      <section className="wrap flex justify-center py-24 lg:py-32">
        <blockquote className="max-w-[920px] text-center text-[1.75rem] italic leading-[1.35] sm:text-4xl lg:text-[2.6rem]">
          Resin allows a fluidity and depth that few other mediums can achieve. It captures movement in a solid state, preserving moments of colour and emotion forever.
        </blockquote>
      </section>

      {/* Mission, vision, values */}
      <section className="bg-teal-50">
        <div className="wrap grid gap-12 py-20 md:grid-cols-3 md:gap-10 lg:py-28">
          {pillars.map((p) => (
            <div key={p.label} className="rule-card">
              <span className="text-xs uppercase tracking-[0.24em] text-teal-700">{p.label}</span>
              <p className="text-lg leading-[1.7]">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="wrap grid grid-cols-3 gap-3 py-20 sm:gap-6 lg:py-24">
        {gallery.map((g, i) => (
          <div key={g.img} className={`w-full aspect-[3/4] overflow-hidden ${i === 1 ? 'lg:mt-12' : ''}`}>
            <img src={g.img} alt={g.alt} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </section>

      {/* Leadership */}
      <section className="wrap pb-24 lg:pb-32">
        <div className="mb-14 flex flex-col items-center gap-5 text-center lg:mb-20">
          <span className="eyebrow">Leadership</span>
          <h2 className="h2">The minds behind the art</h2>
        </div>
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:gap-12 lg:gap-16">
          {team.map((m) => (
            <article key={m.name} className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
              <div className="w-full aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-t-[999px] bg-mist">
                <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover object-top" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[32px]">{m.name}</h3>
                <span className="text-xs uppercase tracking-[0.24em] text-teal-700">{m.role}</span>
              </div>
              <p className="max-w-[30em] text-base leading-[1.75] text-[#4a5553]">{m.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Careers */}
      <section className="bg-teal-700 text-white">
        <div className="wrap flex flex-col items-center gap-6 py-20 text-center lg:py-24">
          <span className="eyebrow text-teal-100">Careers</span>
          <h2 className="h2">Join our creative legacy</h2>
          <p className="max-w-[32em] text-[17px] leading-[1.75] text-teal-50 sm:text-lg">
            Passionate about art or business? We are always glad to meet people who want to elevate the art of resin with us.
          </p>
          <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="btn-light">Get in touch</a>
        </div>
      </section>
    </div>
  );
};

export default About;
