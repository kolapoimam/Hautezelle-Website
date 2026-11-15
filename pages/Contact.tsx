import React, { useRef } from 'react';
import { Mail, MapPin, Instagram } from 'lucide-react';
import SEO from '../components/SEO';
import { INSTAGRAM_DM, WHATSAPP_CHAT } from '../constants';
import { track } from '../lib/analytics';
import { SocialLinks, WhatsAppIcon } from '../components/SocialIcons';

const field = 'w-full min-h-[48px] rounded-xl border border-teal-200 bg-white px-4 py-3 text-base text-ink transition-colors focus:border-teal-700 focus:outline-none';
const label = 'mb-2 block text-xs uppercase tracking-[0.2em] text-[#4a5553]';

const Contact: React.FC = () => {
  const formStarted = useRef(false);
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
              <WhatsAppIcon size={22} className="mt-1 shrink-0 text-teal-700" />
              <div>
                <h2 className="text-xl">WhatsApp</h2>
                <a href={WHATSAPP_CHAT} target="_blank" rel="noopener noreferrer" className="text-[#4a5553] underline-offset-4 hover:text-teal-700 hover:underline">Chat with us on WhatsApp</a>
                <p className="mt-1 text-sm text-[#5b6563]">Quick replies on custom orders and classes</p>
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

          <div className="flex flex-col gap-4">
            <span className="eyebrow">Follow the studio</span>
            <SocialLinks itemClassName="flex h-12 w-12 items-center justify-center rounded-full border border-teal-200 text-teal-800 transition-colors hover:border-teal-700 hover:bg-teal-700 hover:text-white" />
          </div>

          <div className="hidden aspect-[16/10] overflow-hidden rounded-[1.75rem] lg:block">
            <img src="/images/wedding-plaque-green.jpg" alt="Green and gold personalised resin wedding plaque" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="self-start rounded-[1.75rem] border border-mist bg-white p-6 sm:p-10">
          <h2 className="mb-2 text-3xl">Send us a message</h2>
          <p className="mb-8 text-[15px] text-[#5b6563]">Your message opens in an Instagram DM with us.</p>
          <form
            className="flex flex-col gap-6"
            onFocus={() => {
              if (!formStarted.current) {
                formStarted.current = true;
                track('form_start', { form_name: 'contact' });
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const subject = (form.querySelector('#c-subject') as HTMLSelectElement | null)?.value;
              const filled = ['c-first', 'c-last', 'c-email', 'c-message'].filter((id) => (form.querySelector(`#${id}`) as HTMLInputElement | null)?.value.trim()).length;
              track('generate_lead', { lead_source: 'contact_form', method: 'instagram_dm', form_subject: subject, fields_filled: filled });
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
            <button type="submit" data-track-skip className="btn-solid w-full">
              <Instagram size={16} /> Send via Instagram DM
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
