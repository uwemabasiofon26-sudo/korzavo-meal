import React from 'react';
import { Link } from 'react-router-dom';
import { WHY_CHOOSE } from '@/lib/productData';
import { useSEO } from '@/hooks/useSEO';

export default function About() {
  useSEO({
    title: 'About',
    description: 'KORZAVO MEALS makes healthy eating simple, affordable, convenient and full of flavour. Launching in Tauranga, New Zealand.',
    path: '/about',
  });
  return (
    <div className="pt-36 md:pt-44 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="eyebrow mb-3">About KORZAVO MEALS</div>
        <h1 className="font-display font-black text-5xl md:text-7xl text-cream leading-[1.05]">Healthy eating, made simple.</h1>
        <p className="text-ash mt-8 text-lg md:text-xl leading-relaxed">
          Fresh, delicious, protein-rich meals designed for busy professionals, fitness enthusiasts, and anyone looking for healthier everyday food.
        </p>
        <p className="text-ash mt-6 text-lg leading-relaxed">
          At KORZAVO MEALS, we believe healthy eating should be simple, affordable, convenient, and full of flavour. We are launching in Tauranga, New Zealand, as part of the KORZAVO family of nutrition brands.
        </p>

        <h2 className="font-display font-black text-3xl text-cream mt-16 mb-6">Why choose KORZAVO MEALS?</h2>
        <ul className="grid sm:grid-cols-2 gap-3 text-cream">
          {WHY_CHOOSE.map((w) => (
            <li key={w} className="border border-line bg-ink-surface rounded-sm px-5 py-4">{w}</li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 mt-14">
          <Link to="/shop" className="inline-block bg-vital hover:bg-vital-bright text-ink font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-[40px] text-center transition-colors">Explore Our Menu</Link>
          <Link to="/corporate" className="inline-block border border-vital/60 hover:border-vital text-cream font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-[40px] text-center transition-colors">Corporate Partnerships</Link>
        </div>
      </div>
    </div>
  );
}
