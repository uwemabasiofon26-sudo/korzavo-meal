import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { useCart } from './CartContext';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { startCheckout } from '@/lib/checkout';
import { BREAKFAST_OPTIONS, SOUP_OPTIONS, DESSERT_OPTIONS, RULES } from '@/lib/orderRules';
import { DELIVERY_POSTCODES, SERVICE_AREA_NAME } from '@/lib/brand';
import { useOrderLocation } from '@/lib/useOrderLocation';

// One row of a "choose your free ..." picker.
function PickRow({ option, qty, canAdd, onChange }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <img src={option.image} alt="" className="h-11 w-11 flex-shrink-0 rounded-sm bg-white object-contain" />
      <span className="flex-1 text-sm text-cream">{option.label}</span>
      <div className="flex items-center rounded-sm border border-line">
        <button type="button" onClick={() => onChange(-1)} disabled={qty === 0} className="px-2 py-1 text-ash hover:text-cream disabled:opacity-30" aria-label={`Fewer ${option.label}`}><Minus size={12} /></button>
        <span className="w-6 text-center font-mono text-xs text-cream">{qty}</span>
        <button type="button" onClick={() => onChange(1)} disabled={!canAdd} className="px-2 py-1 text-ash hover:text-cream disabled:opacity-30" aria-label={`More ${option.label}`}><Plus size={12} /></button>
      </div>
    </div>
  );
}

const inputCls = 'w-full rounded-sm border border-line bg-transparent px-3 py-2.5 text-sm text-cream placeholder:text-ash focus:border-vital focus:outline-none';

export default function CartDrawer() {
  const {
    items, isOpen, setIsOpen, removeItem, updateQty, subtotal, count,
    extras, changeExtra, delivery, setDelivery,
    lunchCount, dinnerCount, breakfastAllowed, soupAllowed, dessertAllowed, breakfastChosen, soupChosen, dessertChosen,
  } = useCart();
  const { blocked } = useOrderLocation();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const postcode = delivery.postcode.trim();
  const postcodeOk = DELIVERY_POSTCODES.includes(postcode);
  const phoneOk = delivery.phone.replace(/\D/g, '').length >= 7;
  const detailsOk = delivery.name.trim() && phoneOk && delivery.line1.trim() && delivery.suburb.trim() && postcodeOk;
  const breakfastsDone = breakfastChosen === breakfastAllowed;
  const soupsDone = soupChosen === soupAllowed;
  const dessertsDone = dessertChosen === dessertAllowed;

  let blocker = '';
  if (blocked) blocker = `Ordering is only available in ${SERVICE_AREA_NAME}.`;
  else if (!breakfastsDone) blocker = `Choose your ${breakfastAllowed} free breakfasts (${breakfastChosen}/${breakfastAllowed}).`;
  else if (!soupsDone) blocker = 'Choose your free soup.';
  else if (!dessertsDone) blocker = `Choose your ${dessertAllowed} free dessert cups (${dessertChosen}/${dessertAllowed}).`;
  else if (!detailsOk) blocker = postcode.length === 4 && !postcodeOk
    ? `We currently deliver to ${SERVICE_AREA_NAME} only.`
    : 'Add your delivery details to continue.';

  const handleCheckout = async () => {
    setCheckoutError(null);
    setCheckingOut(true);
    try {
      await startCheckout({ items, extras, delivery });
      // On success the browser navigates to Stripe, so no need to reset state here.
    } catch (err) {
      setCheckoutError(err.message);
      setCheckingOut(false);
    }
  };

  // If the shopper hits "back" from Stripe Checkout (or cancels and returns)
  // without completing payment, the browser can restore this page from its
  // back-forward cache with the button frozen mid-"Redirecting…" state.
  // Reset it whenever the page becomes visible again.
  useEffect(() => {
    const resetIfStuck = () => setCheckingOut(false);
    window.addEventListener('pageshow', resetIfStuck);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') resetIfStuck();
    });
    return () => {
      window.removeEventListener('pageshow', resetIfStuck);
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/70 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[101] h-full w-full max-w-md bg-ink border-l border-line flex flex-col transition-transform duration-400 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-vital-bright" />
            <span className="font-mono text-xs tracking-widest uppercase text-cream">
              Your Cart {count > 0 && `(${count})`}
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-ash hover:text-cream transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <p className="font-display text-2xl text-cream mb-2">Your cart is empty</p>
              <p className="text-ash text-sm mb-6">Add a meal or weekly plan to get started.</p>
              <Button asChild variant="outline" className="border-vital text-vital-bright hover:bg-vital hover:text-ink">
                <Link to="/shop" onClick={() => setIsOpen(false)}>Browse the Menu</Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 px-6 py-5">
                  <div className="w-16 h-16 bg-surface border border-line rounded-sm flex-shrink-0 overflow-hidden">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.slug}`} onClick={() => setIsOpen(false)} className="font-display text-base text-cream hover:text-vital-bright transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-ash text-xs mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-line rounded-sm">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 py-1 text-ash hover:text-cream transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="px-3 font-mono text-xs text-cream">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1 text-ash hover:text-cream transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-ash hover:text-vital-bright transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-cream">
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* Free extras + delivery */}
        {items.length > 0 && (
          <div className="space-y-6 border-t border-line px-6 py-5">
            {lunchCount > 0 && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neon">Free breakfasts</div>
                {breakfastAllowed > 0 ? (
                  <>
                    <p className="mt-1 text-sm text-cream">Choose your {breakfastAllowed} free breakfasts <span className="text-ash">({breakfastChosen}/{breakfastAllowed})</span></p>
                    <div className="mt-2 divide-y divide-line">
                      {BREAKFAST_OPTIONS.map((o) => (
                        <PickRow key={o.slug} option={o} qty={extras.breakfasts[o.slug] || 0} canAdd={breakfastChosen < breakfastAllowed} onChange={(d) => changeExtra('breakfasts', o.slug, d)} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-1 text-sm text-ash">Add {RULES.breakfastMinLunches - lunchCount} more lunch meal{RULES.breakfastMinLunches - lunchCount === 1 ? '' : 's'} to unlock {RULES.freeBreakfasts} free breakfasts.</p>
                )}
              </div>
            )}

            {dinnerCount > 0 && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neon">Free soup</div>
                {soupAllowed > 0 ? (
                  <>
                    <p className="mt-1 text-sm text-cream">Choose your free soup <span className="text-ash">({soupChosen}/{soupAllowed})</span></p>
                    <div className="mt-2 divide-y divide-line">
                      {SOUP_OPTIONS.map((o) => (
                        <PickRow key={o.slug} option={o} qty={extras.soups[o.slug] || 0} canAdd={soupChosen < soupAllowed} onChange={(d) => changeExtra('soups', o.slug, d)} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-1 text-sm text-ash">Add {RULES.soupMinDinners - dinnerCount} more dinner{RULES.soupMinDinners - dinnerCount === 1 ? '' : 's'} to unlock a free soup.</p>
                )}
              </div>
            )}

            {(lunchCount > 0 || dinnerCount > 0) && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neon">Bonus dessert cups</div>
                {dessertAllowed > 0 ? (
                  <>
                    <p className="mt-1 text-sm text-cream">Choose your {dessertAllowed} free dessert cups <span className="text-ash">({dessertChosen}/{dessertAllowed})</span></p>
                    <div className="mt-2 divide-y divide-line">
                      {DESSERT_OPTIONS.map((o) => (
                        <PickRow key={o.slug} option={o} qty={extras.desserts[o.slug] || 0} canAdd={dessertChosen < dessertAllowed} onChange={(d) => changeExtra('desserts', o.slug, d)} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-1 text-sm text-ash">Order both lunch and dinner meals for the week ({RULES.dessertMinLunches}+ lunches and {RULES.dessertMinDinners}+ dinners) to unlock {RULES.freeDesserts} free dessert cups.</p>
                )}
              </div>
            )}

            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neon">Delivery · {SERVICE_AREA_NAME}</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <input className={inputCls} placeholder="Full name" autoComplete="name" value={delivery.name} onChange={(e) => setDelivery({ name: e.target.value })} />
                <input className={inputCls} placeholder="Phone" autoComplete="tel" inputMode="tel" value={delivery.phone} onChange={(e) => setDelivery({ phone: e.target.value })} />
                <input className={`${inputCls} col-span-2`} placeholder="Street address" autoComplete="address-line1" value={delivery.line1} onChange={(e) => setDelivery({ line1: e.target.value })} />
                <input className={inputCls} placeholder="Suburb" autoComplete="address-level2" value={delivery.suburb} onChange={(e) => setDelivery({ suburb: e.target.value })} />
                <input className={inputCls} placeholder="Postcode" autoComplete="postal-code" inputMode="numeric" maxLength={4} value={delivery.postcode} onChange={(e) => setDelivery({ postcode: e.target.value.replace(/\D/g, '') })} />
              </div>
              {postcode.length === 4 && (
                <p className={`mt-2 text-xs ${postcodeOk ? 'text-neon' : 'text-vital-bright'}`}>
                  {postcodeOk ? 'Great — we deliver to your area.' : `Sorry, we currently deliver to ${SERVICE_AREA_NAME} only.`}
                </p>
              )}
            </div>
          </div>
        )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest uppercase text-ash">Subtotal</span>
              <span className="font-display text-xl text-cream">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-ash text-xs">Prices include GST. The delivery fee is added at checkout.</p>
            {import.meta.env.VITE_TEST_MODE === 'true' && (
              <p className="rounded-sm border border-neon/40 bg-neon/10 p-2 text-[11px] leading-relaxed text-neon">
                TEST MODE: no real payments. Use card 4242 4242 4242 4242, any future date and any CVC.
              </p>
            )}
            {blocker && <p className="text-xs text-vital-bright">{blocker}</p>}
            {checkoutError && (
              <p className="text-red-400 text-xs">{checkoutError}</p>
            )}
            <Button
              onClick={handleCheckout}
              disabled={checkingOut || Boolean(blocker)}
              className="w-full bg-vital hover:bg-vital-bright text-ink font-mono text-xs tracking-widest uppercase disabled:opacity-60"
            >
              {checkingOut ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Redirecting to checkout…
                </span>
              ) : (
                'Proceed to Checkout'
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
