import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import MealImage from '@/components/meals/MealImage';
import Marquee from '@/components/meals/Marquee';
import FreeOffers from '@/components/meals/FreeOffers';
import ScrollReveal from '@/components/ScrollReveal';
import { MEALS, WEEKLY_PLAN, PLAN_SAVING, MEAL_CATEGORIES, HOW_IT_WORKS, WHY_CHOOSE } from '@/lib/productData';
import { formatPrice } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

const HERO_MEALS = ['korzavo-volcano', 'korzavo-phoenix', 'cajun-tide'].map((slug) => MEALS.find((m) => m.slug === slug));

const btnGold = 'inline-block bg-vital hover:bg-vital-bright text-ink font-body font-bold text-xs md:text-sm tracking-widest uppercase px-8 py-4 rounded-[40px] transition-colors text-center';
const btnLine = 'inline-block border border-vital/60 hover:border-vital hover:bg-vital-dim/40 text-cream font-body font-bold text-xs md:text-sm tracking-widest uppercase px-8 py-4 rounded-[40px] transition-colors text-center';

export default function Home() {
  useSEO({
    title: 'Eat Better. Feel Stronger. Live Healthier.',
    description: 'Fresh, delicious, protein-rich meals for busy professionals, fitness enthusiasts and anyone who wants healthier everyday food. Launching in Tauranga, New Zealand.',
    path: '/',
  });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-black pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="pointer-events-none absolute -top-40 -left-32 h-[560px] w-[560px] rounded-full bg-vital/25 blur-[130px] animate-glow" />
        <div className="pointer-events-none absolute -bottom-48 -right-24 h-[560px] w-[560px] rounded-full bg-neon/25 blur-[130px] animate-glow [animation-delay:3s]" />
        <div className="pointer-events-none absolute inset-0 hero-grid" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-neon/40 bg-neon/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-neon">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon animate-ping-soft" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon" />
              </span>
              Launching soon · Tauranga, NZ
            </div>

            <h1 className="mt-7 font-display font-black leading-[1.02] tracking-tight text-[2.15rem] leading-[1.05] sm:text-6xl lg:text-6xl text-cream">
              EAT BETTER.<br />FEEL STRONGER.<br /><span className="text-gradient">LIVE HEALTHIER.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream-dim md:text-xl">
              Fresh, delicious, protein-rich meals designed for busy professionals, fitness enthusiasts, and anyone looking for healthier everyday food.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link to="/shop" className={`${btnGold} shadow-[0_0_30px_-4px_rgba(255,42,42,0.7)]`}>Explore Our Meals</Link>
              <Link to="/weekly-plans" className={btnLine}>View Weekly Plans</Link>
              <Link to="/corporate" className={btnLine}>Corporate Partnerships</Link>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[['3 free', 'Breakfasts, 5+ lunches'], ['Free', 'Soup, 3+ dinners'], ['NZ$18.90', 'Per lunch meal']].map(([big, small]) => (
                <div key={small} className="rounded-sm border border-line bg-ink-surface/70 px-3 py-3 sm:px-4 backdrop-blur">
                  <dt className="font-display text-base font-black text-neon sm:text-xl md:text-2xl">{big}</dt>
                  <dd className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-ash">{small}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* floating meal collage */}
          <div className="relative mx-auto aspect-square w-full max-w-[540px]">
            <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-vital/50 to-neon/50 blur-3xl" />
            <Link to={`/products/${HERO_MEALS[0].slug}`} className="absolute left-[16%] top-[4%] z-10 w-[68%] rotate-[3deg] animate-float overflow-hidden rounded-2xl ring-2 ring-neon/80 shadow-[0_0_70px_-6px_rgba(34,225,255,0.55)]">
              <MealImage product={HERO_MEALS[0]} className="aspect-square" />
            </Link>
            <Link to={`/products/${HERO_MEALS[1].slug}`} className="absolute bottom-[2%] left-0 z-20 w-[44%] -rotate-6 animate-float-slow overflow-hidden rounded-xl ring-2 ring-vital/80 shadow-[0_0_50px_-6px_rgba(255,42,42,0.6)]">
              <MealImage product={HERO_MEALS[1]} className="aspect-square" />
            </Link>
            <Link to={`/products/${HERO_MEALS[2].slug}`} className="absolute bottom-0 right-0 z-20 w-[40%] rotate-6 animate-float overflow-hidden rounded-xl ring-2 ring-neon/80 shadow-[0_0_50px_-6px_rgba(34,225,255,0.5)] [animation-delay:1.5s]">
              <MealImage product={HERO_MEALS[2]} className="aspect-square" />
            </Link>
            <div className="absolute right-0 top-2 z-30 rotate-6 rounded-full bg-vital px-4 py-2 text-center font-display text-ink shadow-[0_0_30px_rgba(255,42,42,0.6)]">
              <div className="text-xl font-black leading-none md:text-2xl">3 FREE</div>
              <div className="text-[10px] font-bold uppercase tracking-widest">breakfasts, 5+ lunches</div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* INTRO */}
      <section className="px-6 py-20 md:py-28 border-t border-line">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <div className="eyebrow mb-4">Welcome</div>
            <p className="font-display font-bold text-2xl md:text-4xl text-cream leading-snug">
              At KORZAVO MEALS, we believe healthy eating should be simple, affordable, convenient, and full of flavour.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* SIGNATURE MENU */}
      <section className="px-6 py-20 md:py-28 bg-ink-deep border-t border-line">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow mb-3">Lunch menu</div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-cream leading-tight">Chef-crafted. High protein. Bold flavours.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {MEALS.map((m) => (
              <Link key={m.slug} to={`/products/${m.slug}`} className="group bg-ink-surface border border-line rounded-sm overflow-hidden card-glow">
                <MealImage product={m} className="aspect-square" imgClassName="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="p-5">
                  <div className="text-vital text-[11px] tracking-[0.25em] uppercase mb-1">{m.number} · {m.portion_size}</div>
                  <h3 className="font-display font-extrabold text-lg text-cream group-hover:text-vital transition-colors">{m.name}</h3>
                  <div className="text-neon font-display font-bold mt-2">{formatPrice(m.price)}</div>
                </div>
              </Link>
            ))}
            <Link to="/shop" className="flex flex-col justify-center items-center text-center bg-vital-dim/40 border border-vital/50 rounded-sm p-8 hover:bg-vital-dim/70 transition-colors min-h-[200px]">
              <span className="font-display font-black text-2xl text-cream">See the full menu</span>
              <span className="mt-3 text-vital text-xs tracking-widest uppercase">Explore our menu →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FREE EXTRAS */}
      <section className="border-t border-line px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="eyebrow mb-3">Breakfast &amp; dinner</div>
          <h2 className="font-display text-4xl font-black leading-tight text-cream md:text-6xl">Your whole day, covered.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ash">
            Now serving breakfast, lunch and dinner. Order 5 or more lunches for 3 free breakfasts, and 3 or more dinners for a complimentary soup. Order both for the week and 2 dessert cups are on us too.
          </p>
          <div className="mt-12"><FreeOffers /></div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/shop#dinner" className={btnGold}>See the Dinner Menu</Link>
            <Link to="/shop#breakfast" className={btnLine}>See the Breakfast Options</Link>
          </div>
        </div>
      </section>

      <div className="neon-line" />

      {/* WEEKLY PLAN */}
      <section className="px-6 py-20 md:py-28 border-t border-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <MealImage product={WEEKLY_PLAN} className="min-w-0 aspect-[2/1] rounded-sm border border-line" imgClassName="object-cover" />
          <div className="min-w-0">
            <div className="eyebrow mb-3">Weekly Signature Plan</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-cream leading-tight">7 Signature Meals</h2>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mt-5">
              <span className="font-display font-black text-4xl sm:text-5xl text-neon">{formatPrice(WEEKLY_PLAN.price)}</span>
              <span className="text-ash line-through">{formatPrice(WEEKLY_PLAN.compare_at_price)}</span>
            </div>
            <p className="text-neon text-sm tracking-widest uppercase mt-2">You save {formatPrice(PLAN_SAVING)}</p>
            <p className="text-ash text-lg leading-relaxed mt-6">{WEEKLY_PLAN.description}</p>
            <Link to="/weekly-plans" className={`${btnGold} mt-8`}>Choose Your Weekly Plan</Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-20 md:py-28 bg-ink-deep border-t border-line">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow mb-3">Our Meal Categories</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-cream">Food for every routine.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-12">
            {MEAL_CATEGORIES.map((c, i) => (
              <div key={c.title} className="bg-ink-surface border border-line rounded-sm p-6">
                <div className="text-vital font-display font-black text-3xl mb-4">0{i + 1}</div>
                <h3 className="font-display font-bold text-lg text-cream mb-2">{c.title}</h3>
                <p className="text-ash text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 md:py-28 border-t border-line">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow mb-3">How It Works</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-cream">Four simple steps.</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.title}>
                <div className="w-12 h-12 rounded-full border border-vital text-vital flex items-center justify-center font-display font-black mb-5">{i + 1}</div>
                <h3 className="font-display font-bold text-xl text-cream mb-2">{s.title}</h3>
                <p className="text-ash text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-line" />

      {/* CORPORATE */}
      <section className="px-6 py-20 md:py-28 bg-vital-dim/40 border-t border-line">
        <div className="max-w-5xl mx-auto text-center">
          <div className="eyebrow mb-3">Corporate &amp; Gym Partnerships</div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-cream leading-tight">Healthy meals for your team, gym or community.</h2>
          <p className="text-cream-dim text-lg leading-relaxed mt-6 max-w-3xl mx-auto">
            We aim to partner with businesses, offices, gyms, and fitness communities to provide affordable, nutritious meals through convenient weekly ordering plans.
          </p>
          <Link to="/corporate" className={`${btnGold} mt-8`}>Corporate Partnerships</Link>
        </div>
      </section>

      {/* WHY */}
      <section className="px-6 py-20 md:py-28 border-t border-line">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3">Why Choose KORZAVO MEALS?</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-cream mb-10">Simple. Satisfying. Strong.</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {WHY_CHOOSE.map((w) => (
              <li key={w} className="flex items-center gap-4 bg-ink-surface border border-line rounded-sm px-5 py-4 text-cream">
                <Check size={18} className="text-vital shrink-0" /> {w}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link to="/shop" className={btnGold}>Explore Our Menu</Link>
            <Link to="/contact" className={btnLine}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
