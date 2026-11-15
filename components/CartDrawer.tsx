import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, Trash2, ShoppingBag, Instagram, Check } from 'lucide-react';
import { useCart, naira, priceFrom } from '../context/CartContext';
import { INSTAGRAM_DM, WHATSAPP_NUMBER } from '../constants';
import { WhatsAppIcon } from './SocialIcons';
import { PageRoutes } from '../types';

/** Copies text inside the click itself so it works even where the async clipboard API is blocked. */
const copyNow = (text: string): boolean => {
  let ok = false;
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ok = document.execCommand('copy');
    document.body.removeChild(ta);
  } catch {
    ok = false;
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
    ok = true;
  }
  return ok;
};

const CartDrawer: React.FC = () => {
  const { items, count, estimate, isOpen, close, setQty, remove, clear } = useCart();
  const [sent, setSent] = useState<null | { copied: boolean; message: string }>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSent(null);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  const message = [
    'Hello Hautezelle, I would like to order:',
    '',
    ...items.map((l, i) => `${i + 1}. ${l.product.name} × ${l.qty} (from ${naira(priceFrom(l.product))} each)`),
    '',
    `Estimated total: from ${naira(estimate)}`,
    '',
    'Please confirm the final price, personalisation and delivery. Thank you!',
  ].join('\n');

  const buyOnInstagram = () => {
    const copied = copyNow(message);
    window.open(INSTAGRAM_DM, '_blank', 'noopener,noreferrer');
    setSent({ copied, message });
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`} inert={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-ivory text-ink shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-l-[1.75rem] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between border-b border-mist px-6 py-5">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl">Your cart</h2>
            <span className="text-sm text-[#5b6563]">{count} {count === 1 ? 'item' : 'items'}</span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-mist hover:border-teal-700 hover:text-teal-700"
          >
            <X size={20} />
          </button>
        </header>

        {sent ? (
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white">
              <Check size={26} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-3xl leading-tight">Almost done</h3>
              <p className="text-[16px] leading-[1.7] text-[#4a5553]">
                {sent.copied
                  ? 'Your order message is copied. In the Instagram chat that just opened, paste it and press send.'
                  : 'Instagram has opened. Copy the message below, paste it in the chat and press send.'}
              </p>
            </div>
            <pre className="whitespace-pre-wrap rounded-2xl border border-mist bg-white p-5 font-serif text-[14px] leading-[1.65] text-ink">{sent.message}</pre>
            <div className="flex flex-col gap-3">
              <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className="btn-solid w-full">
                <Instagram size={16} /> Open Instagram again
              </a>
              <button type="button" onClick={() => setSent({ copied: copyNow(sent.message), message: sent.message })} className="btn-line w-full">
                Copy message again
              </button>
              <button
                type="button"
                onClick={() => {
                  clear();
                  close();
                }}
                className="mt-2 text-sm text-[#5b6563] underline underline-offset-4 hover:text-teal-700"
              >
                I have sent it, clear my cart
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <ShoppingBag size={26} />
            </div>
            <h3 className="text-2xl">Your cart is empty</h3>
            <p className="max-w-[22em] text-[15px] leading-[1.7] text-[#5b6563]">Browse the collection and add the pieces you love.</p>
            <Link to={PageRoutes.SHOP} onClick={close} className="btn-solid">Shop the collection</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-mist overflow-y-auto px-6">
              {items.map(({ id, qty, product }) => (
                <li key={id} className="flex gap-4 py-5">
                  <img src={product.image} alt={product.name} className="h-24 w-20 shrink-0 rounded-2xl object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg leading-snug">{product.name}</h3>
                      <button
                        type="button"
                        onClick={() => remove(id)}
                        aria-label={`Remove ${product.name}`}
                        className="-mr-2 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#5b6563] hover:bg-teal-50 hover:text-teal-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span className="text-sm text-teal-700">{product.priceRange}</span>
                    <div className="mt-auto flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setQty(id, qty - 1)}
                        aria-label={`One less ${product.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-200 hover:border-teal-700"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-9 text-center text-[15px]" aria-live="polite">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(id, qty + 1)}
                        aria-label={`One more ${product.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-200 hover:border-teal-700"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="flex flex-col gap-4 border-t border-mist bg-white/70 px-6 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] text-[#4a5553]">Estimated total</span>
                <span className="text-2xl">from {naira(estimate)}</span>
              </div>
              <p className="text-[13px] leading-[1.6] text-[#5b6563]">
                Every piece is handmade to order. We confirm the final price, personalisation and delivery with you in the chat.
              </p>
              <button type="button" onClick={buyOnInstagram} className="btn-solid w-full">
                <Instagram size={16} /> Buy now
              </button>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-line w-full">
                <WhatsAppIcon size={16} /> Order on WhatsApp instead
              </a>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
