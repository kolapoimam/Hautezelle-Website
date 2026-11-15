import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, Trash2, ShoppingBag, Instagram, Check } from 'lucide-react';
import { useCart, naira, priceFrom, unitPrice } from '../context/CartContext';
import { INSTAGRAM_DM, WHATSAPP_NUMBER } from '../constants';
import { WhatsAppIcon } from './SocialIcons';
import { PageRoutes } from '../types';
import { track, gaItem, CURRENCY } from '../lib/analytics';
import { Product } from '../types';

/** Bulk tier hint for a line, e.g. "Add 3 more for ₦5,000 each". */
const nextTier = (p: Product, qty: number) =>
  (p.bulkPricing || []).slice().sort((a, b) => a.minQty - b.minQty).find((t) => qty < t.minQty);

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

/** Typeable quantity box. Lets the field be empty while typing and commits whole numbers from 1 to 9999. */
const QtyInput: React.FC<{ label: string; qty: number; onCommit: (n: number) => void }> = ({ label, qty, onCommit }) => {
  const [draft, setDraft] = useState(String(qty));
  useEffect(() => setDraft(String(qty)), [qty]);
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={draft}
      aria-label={label}
      onChange={(e) => {
        const v = e.target.value.replace(/\D/g, '').slice(0, 4);
        setDraft(v);
        const n = parseInt(v, 10);
        if (n >= 1) onCommit(n);
      }}
      onBlur={() => setDraft(String(qty))}
      className="h-9 w-14 rounded-full border border-transparent bg-transparent text-center text-[15px] focus:border-teal-300 focus:outline-none"
    />
  );
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

  // One view_cart each time the drawer opens, with what is in it at that moment.
  useEffect(() => {
    if (isOpen) track('view_cart', { currency: CURRENCY, value: estimate, cart_lines: items.length, cart_quantity: count, items: cartItems() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const message = [
    'Hello Hautezelle, I would like to order:',
    '',
    ...items.map((l, i) =>
      l.product.bulkPricing
        ? `${i + 1}. ${l.product.name} × ${l.qty} at ${naira(unitPrice(l.product, l.qty))} each = ${naira(unitPrice(l.product, l.qty) * l.qty)}`
        : `${i + 1}. ${l.product.name} × ${l.qty} (from ${naira(priceFrom(l.product))} each)`,
    ),
    '',
    `Estimated total: ${items.every((l) => l.product.bulkPricing) ? '' : 'from '}${naira(estimate)}`,
    '',
    'Please confirm the final price, personalisation and delivery. Thank you!',
  ].join('\n');

  const cartItems = () => items.map((l, i) => gaItem(l.product, { quantity: l.qty, index: i }));
  const checkout = (channel: 'instagram' | 'whatsapp') => {
    const payload = { currency: CURRENCY, value: estimate, items: cartItems(), checkout_channel: channel, cart_lines: items.length, cart_quantity: count };
    track('begin_checkout', payload);
    track('generate_lead', { currency: CURRENCY, value: estimate, lead_source: 'cart_checkout', method: channel === 'instagram' ? 'instagram_dm' : 'whatsapp' });
  };

  const buyOnInstagram = () => {
    const copied = copyNow(message);
    window.open(INSTAGRAM_DM, '_blank', 'noopener,noreferrer');
    checkout('instagram');
    track('order_message_copy', { success: copied, attempt: 'first', value: estimate });
    setSent({ copied, message });
  };

  const changeQty = (id: string, qty: number, next: number) => {
    const line = items.find((l) => l.id === id);
    if (!line || next === qty) return;
    const product = line.product;
    const lineTotal = (n: number) => (n > 0 ? unitPrice(product, n) * n : 0);
    const value = Math.abs(lineTotal(next) - lineTotal(qty));
    const diff = Math.abs(next - qty);
    if (next > qty) {
      track('add_to_cart', { currency: CURRENCY, value, add_source: 'cart_quantity', items: [{ ...gaItem(product, { quantity: diff }), price: unitPrice(product, next) }] });
    } else {
      track('remove_from_cart', { currency: CURRENCY, value, remove_source: next <= 0 ? 'cart_quantity_zero' : 'cart_quantity', items: [{ ...gaItem(product, { quantity: diff }), price: unitPrice(product, qty) }] });
    }
    setQty(id, next);
  };

  const removeLine = (id: string, qty: number) => {
    const line = items.find((l) => l.id === id);
    if (line) track('remove_from_cart', { currency: CURRENCY, value: unitPrice(line.product, qty) * qty, remove_source: 'cart_remove_button', items: [gaItem(line.product, { quantity: qty })] });
    remove(id);
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
              <a
                href={INSTAGRAM_DM}
                target="_blank"
                rel="noopener noreferrer"
                data-track-skip
                onClick={() => track('checkout_reopen_instagram', { value: estimate })}
                className="btn-solid w-full"
              >
                <Instagram size={16} /> Open Instagram again
              </a>
              <button
                type="button"
                data-track-skip
                onClick={() => {
                  const copied = copyNow(sent.message);
                  track('order_message_copy', { success: copied, attempt: 'again', value: estimate });
                  setSent({ copied, message: sent.message });
                }}
                className="btn-line w-full"
              >
                Copy message again
              </button>
              <button
                type="button"
                data-track-skip
                onClick={() => {
                  track('cart_cleared', { reason: 'order_sent', currency: CURRENCY, value: estimate, cart_quantity: count });
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
                        onClick={() => removeLine(id, qty)}
                        data-track-skip
                        aria-label={`Remove ${product.name}`}
                        className="-mr-2 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#5b6563] hover:bg-teal-50 hover:text-teal-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span className="text-sm text-teal-700">
                      {product.bulkPricing ? `${naira(unitPrice(product, qty))} each` : product.priceRange}
                      {product.bulkPricing && unitPrice(product, qty) < priceFrom(product) && (
                        <span className="ml-2 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-teal-800">Bulk price</span>
                      )}
                    </span>
                    {product.bulkPricing && nextTier(product, qty) && (
                      <span className="text-[12px] leading-snug text-[#5b6563]">
                        Order {nextTier(product, qty)!.minQty}+ for {naira(nextTier(product, qty)!.price)} each
                      </span>
                    )}
                    <div className="mt-auto flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => changeQty(id, qty, qty - 1)}
                        data-track-skip
                        aria-label={`One less ${product.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-200 hover:border-teal-700"
                      >
                        <Minus size={14} />
                      </button>
                      <QtyInput label={`Quantity of ${product.name}`} qty={qty} onCommit={(n) => changeQty(id, qty, n)} />
                      <button
                        type="button"
                        onClick={() => changeQty(id, qty, qty + 1)}
                        data-track-skip
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
                <span className="text-2xl">{items.every((l) => l.product.bulkPricing) ? '' : 'from '}{naira(estimate)}</span>
              </div>
              <p className="text-[13px] leading-[1.6] text-[#5b6563]">
                Every piece is handmade to order. We confirm the final price, personalisation and delivery with you in the chat.
              </p>
              <button type="button" onClick={buyOnInstagram} data-track-skip className="btn-solid w-full">
                <Instagram size={16} /> Buy now
              </button>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-track-skip onClick={() => checkout('whatsapp')} className="btn-line w-full">
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
