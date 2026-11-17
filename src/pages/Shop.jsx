import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { MEALS, WEEKLY_PLAN, PLAN_SAVING } from '@/lib/productData';
import { formatNZD } from '@/lib/brand';
import { useSEO } from '@/hooks/useSEO';

export default function Shop() {
  useSEO({
    title: 'Signature Menu',
    description: 'Seven chef-crafted, high-protein meals with bold flavours. Meal descriptions, portion sizes and prices in NZD.',
    path: '/shop',
  });
  return (
    <div className="pt-36 md:pt-44">
      <section className="px-6 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow mb-3">Signature Menu</div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-cream leading-[1.05]">Chef-crafted. High protein. Bold flavours.</h1>
          <p className="text-ash mt-6 max-w-2xl text-base md:text-lg">
            Seven signature meals, freshly prepared and portioned for real life. Prices are in NZD and include GST.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEALS.map((m) => <ProductCard key={m.slug} product={m} />)}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto border border-vital rounded-sm bg-ink-surface p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="eyebrow mb-3">Weekly Signature Plan</div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-cream">7 Signature Meals — {formatNZD(WEEKLY_PLAN.price)}</h2>
            <p className="text-ash mt-3 max-w-xl">Regular price {formatNZD(WEEKLY_PLAN.compare_at_price)}. You save {formatNZD(PLAN_SAVING)}.</p>
          </div>
          <Link to="/weekly-plans" className="inline-block bg-vital hover:bg-vital-bright text-ink font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-[40px] transition-colors text-center">
            CHOOSE YOUR WEEKLY PLAN
          </Link>
        </div>
      </section>
    </div>
  );
}
