import React from 'react';
import { Link } from 'react-router-dom';
import MealImage from '@/components/meals/MealImage';
import OrderButton from '@/components/meals/OrderButton';
import { MEALS, WEEKLY_PLAN, PLAN_SAVING } from '@/lib/productData';
import { formatPrice } from '@/lib/utils';
import FreeOffers from '@/components/meals/FreeOffers';
import { useSEO } from '@/hooks/useSEO';

export default function WeeklyPlans() {
  useSEO({
    title: 'Weekly Signature Plan',
    description: 'Seven chef-crafted signature meals in one weekly plan — a better price than ordering them one by one.',
    path: '/weekly-plans',
  });
  return (
    <div className="pt-36 md:pt-44 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="eyebrow mb-3">Weekly Meal Plans</div>
        <h1 className="font-display font-black text-5xl md:text-7xl text-cream leading-[1.05]">Your week, sorted.</h1>
        <p className="text-ash mt-6 max-w-2xl text-lg">Flexible weekly plans for individuals and teams — bold flavours and protein-rich food, ready for your everyday routine.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14 items-center">
          <MealImage product={WEEKLY_PLAN} className="min-w-0 aspect-[2/1] rounded-sm border border-line" imgClassName="object-cover" />
          <div className="min-w-0 border border-vital rounded-sm bg-ink-surface p-6 sm:p-8 md:p-10">
            <div className="eyebrow mb-3">Weekly Signature Plan</div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-cream">7 Signature Meals</h2>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mt-5">
              <span className="font-display font-black text-4xl sm:text-5xl text-neon">{formatPrice(WEEKLY_PLAN.price)}</span>
              <span className="text-ash line-through">{formatPrice(WEEKLY_PLAN.compare_at_price)}</span>
            </div>
            <p className="text-neon text-sm tracking-widest uppercase mt-2">You save {formatPrice(PLAN_SAVING)}</p>
            <p className="text-ash leading-relaxed mt-6">{WEEKLY_PLAN.description}</p>
            <div className="mt-8"><OrderButton product={WEEKLY_PLAN} label="CHOOSE YOUR WEEKLY PLAN" /></div>
            <p className="text-ash text-xs mt-4">Prices in NZD, including GST. Delivery fees and areas will be confirmed before launch.</p>
          </div>
        </div>

        <div className="mt-20">
          <div className="eyebrow mb-3">What's in the plan</div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-cream mb-8">All seven signature meals</h2>
          <ul className="divide-y divide-line border border-line rounded-sm">
            {MEALS.map((m) => (
              <li key={m.slug} className="flex items-center justify-between gap-4 px-5 py-4 bg-ink-surface">
                <Link to={`/products/${m.slug}`} className="flex items-baseline gap-4 hover:text-vital transition-colors text-cream">
                  <span className="text-vital font-display font-black">{m.number}</span>
                  <span className="font-display font-bold">{m.name}</span>
                </Link>
                <span className="text-ash text-sm">{m.portion_size}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20">
          <div className="eyebrow mb-3">Included free</div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-cream mb-8">Free breakfast, soup and dessert</h2>
          <FreeOffers compact />
        </div>

        <div className="mt-20 rounded-sm border border-vital bg-ink-surface p-8 md:p-10">
          <div className="eyebrow mb-3">Build your own dinner plan</div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-cream">Pick any dinners. Any quantity per dish.</h2>
          <p className="mt-4 max-w-2xl text-ash">Choose whichever dinners you like, as many of each as you want. Once your order reaches 3 dinners, a complimentary soup comes with it.</p>
          <Link to="/shop#dinner" className="mt-6 inline-block rounded-[40px] bg-vital px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-vital-bright">Choose your dinners</Link>
        </div>
      </div>
    </div>
  );
}
