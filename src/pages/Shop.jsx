import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { MEALS, DINNERS, BREAKFASTS, SOUPS, DESSERTS, EXTRAS_IMAGES, WEEKLY_PLAN, PLAN_SAVING } from '@/lib/productData';
import { formatNZD } from '@/lib/brand';
import { useSEO } from '@/hooks/useSEO';

const SECTIONS = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'desserts', label: 'Desserts' },
];

function ExtraCard({ image, title, label, tag, landscape = false }) {
  return (
    <div className="overflow-hidden rounded-sm border border-line bg-ink-surface card-glow">
      <div className={`flex items-center justify-center bg-white ${landscape ? 'aspect-[3/2]' : 'aspect-[4/5]'}`}>
        <img src={image} alt={`${label} ${title}`} loading="lazy" className="h-full w-full object-contain p-2" />
      </div>
      <div className="p-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neon">{tag}</div>
        <div className="mt-1 font-display text-lg font-extrabold text-cream">{title}</div>
        <div className="text-xs text-ash">{label}</div>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="mb-10 max-w-3xl">
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h2 className="font-display text-3xl font-black leading-tight text-cream md:text-5xl">{title}</h2>
      <div className="mt-5 space-y-3 text-base leading-relaxed text-ash md:text-lg">{children}</div>
    </div>
  );
}

export default function Shop() {
  const { hash } = useLocation();
  useSEO({
    title: 'Menu — Breakfast, Lunch & Dinner',
    description: 'Chef-crafted, high-protein lunch and dinner meals with 3 free breakfasts on 5+ lunches and a free soup on 3+ dinners. Prices in NZD.',
    path: '/shop',
  });

  // Jump to a section when arriving from a link such as /shop#dinner
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    return () => clearTimeout(t);
  }, [hash]);

  const rice = BREAKFASTS.filter((b) => b.type === 'Protein Rice Pudding');
  const oats = BREAKFASTS.filter((b) => b.type === 'Protein Oatmeal');

  return (
    <div className="pt-36 md:pt-44">
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="eyebrow mb-3">Our menu</div>
          <h1 className="font-display text-5xl font-black leading-[1.05] text-cream md:text-7xl">Breakfast. Lunch. Dinner.</h1>
          <p className="mt-6 max-w-2xl text-base text-ash md:text-lg">
            Chef-crafted, high-protein meals with bold flavours. Order 5 or more lunches for 3 free breakfasts, and 3 or more dinners for a free soup. Prices are in NZD and include GST.
          </p>
          <nav className="mt-8 flex flex-wrap gap-3" aria-label="Menu sections">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border border-neon/50 px-5 py-2 text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-neon/15">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* BREAKFAST */}
      <section id="breakfast" className="scroll-mt-32 border-t border-line px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow="Breakfast is on us" title="3 free breakfasts with 5+ lunches">
            <p>Start your day with a delicious breakfast that's high in protein and rich in vitamins and minerals. Choose from our creamy rice pudding or oatmeal, available in a variety of flavours.</p>
            <p>Order 5 or more lunch meals and get 3 free breakfasts. Orders of fewer than 5 lunch meals don't include a complimentary breakfast.</p>
            <p>There's no fixed pairing between lunch and breakfast. Choose oatmeal or rice pudding for your order, mix the two throughout the week, and choose different flavours as well.</p>
          </SectionHead>

          <h3 className="mb-4 font-display text-xl font-extrabold text-cream">Protein Rice Pudding</h3>
          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {rice.map((b) => <ExtraCard key={b.slug} image={b.image} title={b.flavour} label={b.type} tag="Free with 5+ lunches" />)}
          </div>

          <h3 className="mb-4 font-display text-xl font-extrabold text-cream">Protein Oatmeal</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {oats.map((b) => <ExtraCard key={b.slug} image={b.image} title={b.flavour} label={b.type} tag="Free with 5+ lunches" />)}
          </div>
        </div>
      </section>

      {/* LUNCH */}
      <section id="lunch" className="scroll-mt-32 border-t border-line bg-ink-deep px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow="Lunch" title="Chef-crafted. High protein. Bold flavours.">
            <p>Order 5 or more lunches and choose 3 free breakfasts to go with them.</p>
          </SectionHead>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MEALS.map((m) => <ProductCard key={m.slug} product={m} />)}
          </div>
        </div>
      </section>

      {/* DINNER */}
      <section id="dinner" className="scroll-mt-32 border-t border-line px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow="Dinner" title="Free soup with 3+ dinners">
            <p>Build your own dinner plan: choose any dinners you like, in any quantity per dish. Once your order reaches 3 dinners, a complimentary Lentil Soup or Pumpkin Soup comes with it. Choose whichever soup you'd like.</p>
          </SectionHead>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DINNERS.map((m) => <ProductCard key={m.slug} product={m} />)}
          </div>

          <h3 className="mb-4 mt-16 font-display text-xl font-extrabold text-cream">Choose your free soup</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {SOUPS.map((s) => <ExtraCard key={s.slug} image={s.image} title={s.name} label="Dinner soup" tag="Free with 3+ dinners" landscape />)}
          </div>
        </div>
      </section>

      {/* DESSERTS */}
      <section id="desserts" className="scroll-mt-32 border-t border-line bg-ink-deep px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Dessert collection" title="2 free dessert cups">
              <p>Order both lunch and dinner meals for the week (5+ lunches and 3+ dinners) and choose any 2 complimentary dessert cups as an extra bonus, on top of your free breakfasts and soup.</p>
            </SectionHead>
            <ul className="grid gap-3 sm:grid-cols-2">
              {DESSERTS.map((d) => (
                <li key={d.slug} className="rounded-sm border border-line bg-ink-surface px-5 py-4 font-display font-bold text-cream">{d.name}</li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-sm border border-line bg-black">
            <img src={EXTRAS_IMAGES.dessertCollection} alt="Dessert collection: Golden Coconut Bites and Date & Coconut Balls" loading="lazy" className="w-full" />
          </div>
        </div>
      </section>

      {/* WEEKLY PLAN */}
      <section className="px-6 pb-24 pt-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-sm border border-vital bg-ink-surface p-8 md:flex-row md:items-center md:p-12">
          <div>
            <div className="eyebrow mb-3">Weekly Signature Plan</div>
            <h2 className="font-display text-3xl font-black text-cream md:text-4xl">7 Signature Meals — {formatNZD(WEEKLY_PLAN.price)}</h2>
            <p className="mt-3 max-w-xl text-ash">Seven lunch meals ordered separately come to {formatNZD(WEEKLY_PLAN.compare_at_price)}. You save {formatNZD(PLAN_SAVING)}.</p>
          </div>
          <Link to="/weekly-plans" className="inline-block rounded-[40px] bg-vital px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-vital-bright">
            CHOOSE YOUR WEEKLY PLAN
          </Link>
        </div>
      </section>
    </div>
  );
}
