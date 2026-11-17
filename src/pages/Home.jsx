import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import MealImage from '@/components/meals/MealImage';
import ScrollReveal from '@/components/ScrollReveal';
import { MEALS, WEEKLY_PLAN, PLAN_SAVING, MEAL_CATEGORIES, HOW_IT_WORKS, WHY_CHOOSE } from '@/lib/productData';
import { formatPrice } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';

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
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-ink-deep pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-deep via-ink to-vital-dim/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="eyebrow mb-6">Fresh · High protein · Tauranga, NZ</div>
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.02] tracking-tight max-w-5xl">
            EAT BETTER.<br />FEEL STRONGER.<br /><span className="text-vital">LIVE HEALTHIER.</span>
          </h1>
          <p className="text-ash text-lg md:text-xl mt-8 max-w-2xl leading-relaxed">
            Fresh, delicious, protein-rich meals designed for busy professionals, fitness enthusiasts, and anyone looking for healthier everyday food.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link to="/shop" className={btnGold}>Explore Our Meals</Link>
            <Link to="/weekly-plans" className={btnLine}>View Weekly Plans</Link>
            <Link to="/corporate" className={btnLine}>Corporate Partnerships</Link>
          </div>
        </div>
      </section>

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
          <div className="eyebrow mb-3">Signature Menu</div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-cream leading-tight">Chef-crafted. High protein. Bold flavours.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {MEALS.map((m) => (
              <Link key={m.slug} to={`/products/${m.slug}`} className="group bg-ink-surface border border-line rounded-sm overflow-hidden hover:border-vital transition-colors">
                <MealImage product={m} className="aspect-square" imgClassName="object-contain transition-transform duration-700 group-hover:scale-105" />
                <div className="p-5">
                  <div className="text-vital text-[11px] tracking-[0.25em] uppercase mb-1">{m.number} · {m.portion_size}</div>
                  <h3 className="font-display font-extrabold text-lg text-cream group-hover:text-vital transition-colors">{m.name}</h3>
                  <div className="text-vital font-display font-bold mt-2">{formatPrice(m.price)}</div>
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

      {/* WEEKLY PLAN */}
      <section className="px-6 py-20 md:py-28 border-t border-line">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <MealImage product={WEEKLY_PLAN} className="aspect-[2/1] rounded-sm border border-line" imgClassName="object-cover" />
          <div>
            <div className="eyebrow mb-3">Weekly Signature Plan</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-cream leading-tight">7 Signature Meals</h2>
            <div className="flex items-baseline gap-4 mt-5">
              <span className="font-display font-black text-5xl text-vital">{formatPrice(WEEKLY_PLAN.price)}</span>
              <span className="text-ash line-through">{formatPrice(WEEKLY_PLAN.compare_at_price)}</span>
            </div>
            <p className="text-vital text-sm tracking-widest uppercase mt-2">You save {formatPrice(PLAN_SAVING)}</p>
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
