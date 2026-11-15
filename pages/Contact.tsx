import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import SEO from '../components/SEO';
import { INSTAGRAM_DM } from '../constants';

const field = 'w-full min-h-[48px] border border-teal-200 bg-white px-4 py-3 text-base text-ink transition-colors focus:border-teal-700 focus:outline-none';
const label = 'mb-2 block text-xs uppercase tracking-[0.2em] text-[#4a5553]';

const Contact: React.FC = () => {
  return (
    <div className="w-full bg-ivory text-ink">
      <SEO page="/contact" />

      <section className="wrap grid gap-14 pb-24 pt-32 sm:pt-40 lg:grid-cols-2 lg:gap-16 lg:pb-32">
        <div className="flex flex-col gap-8">
          <span className="eyebrow">Get in touch</span>
          <h1 className="display text-[3rem] sm:text-6xl lg:text-7xl">
            Visit our <em className="text-teal-700">studio</em>
          </h1>
          <p className="lead max-w-[30em]">
            Whether you want a bespoke piece, a place in a workshop or a corporate partnership, we would love to hear from you.
          </p>

          <ul className="flex flex-col divide-y divide-mist border-y border-mist">
            <li className="flex items-start gap-4 py-6">
              <MapPin size={22} className="mt-1 shrink-0 text-teal-700" aria-hidden="true" />
              <div>
                <h2 className="text-xl">Location</h2>
                <p className="text-[#4a5553]">Ilorin, Kwara State, Nigeria</p>
                <p className="mt-1 text-sm text-[#5b6563]">Open Monday to Friday, 9am to 5pm</p>
              </div>
            </li>
            <li className="flex items-start gap-4 py-6">
              <Phone size={22} className="mt-1 shrink-0 text-teal-700" aria-hidden="true" />
              <div>
                <h2 className="text-xl">Phone</h2>
                <a href="tel:+2349030799342" className="text-[#4a5553] hover:text-teal-700">0903 079 9342</a>
                <p className="mt-1 text-sm text-[#5b6563]">Available for WhatsApp support</p>
              </div>
            </li>
            <li className="flex items-start gap-4 py-6">
              <Mail size={22} className="mt-1 shrink-0 text-teal-700" aria-hidden="true" />
              <div>
                <h2 className="text-xl">Email</h2>
                <a href="mailto:hautezelle@gmail.com" className="break-all text-[#4a5553] hover:text-teal-700">hautezelle@gmail.com</a>
              </div>
            </li>
          </ul>

          <div className="hidden aspect-[16/10] overflow-hidden lg:block">
            <img src="/images/resin-clutch.jpg" alt="Red resin clutch with a gold chain" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="self-start border border-mist bg-white p-6 sm:p-10">
          <h2 className="mb-2 text-3xl">Send us a message</h2>
          <p className="mb-8 text-[15px] text-[#5b6563]">Your message opens in an Instagram DM with us.</p>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(INSTAGRAM_DM, '_blank', 'noopener');
            }}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="c-first" className={label}>First name</label>
                <input id="c-first" type="text" autoComplete="given-name" className={field} />
              </div>
              <div>
                <label htmlFor="c-last" className={label}>Last name</label>
                <input id="c-last" type="text" autoComplete="family-name" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="c-email" className={label}>Email address</label>
              <input id="c-email" type="email" autoComplete="email" className={field} />
            </div>
            <div>
              <label htmlFor="c-subject" className={label}>Subject</label>
              <select id="c-subject" className={field}>
                <option>General inquiry</option>
                <option>Custom order</option>
                <option>Workshop registration</option>
                <option>Corporate partnership</option>
                <option>Custom interior décor</option>
              </select>
            </div>
            <div>
              <label htmlFor="c-message" className={label}>Message</label>
              <textarea id="c-message" rows={5} className={field} />
            </div>
            <button type="submit" className="btn-solid w-full">
              <Instagram size={16} /> Send via Instagram DM
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
