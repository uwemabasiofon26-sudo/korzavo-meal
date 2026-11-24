import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Dumbbell, CalendarCheck } from 'lucide-react';
import { CORPORATE_EMAIL } from '@/lib/brand';
import { useSEO } from '@/hooks/useSEO';

const points = [
  { icon: Building2, title: 'Businesses & offices', text: 'Convenient meal solutions for businesses and their employees.' },
  { icon: Dumbbell, title: 'Gyms & fitness communities', text: 'Affordable, nutritious meals for members and communities.' },
  { icon: CalendarCheck, title: 'Weekly ordering plans', text: 'Flexible weekly ordering for individuals and teams.' },
];

export default function Corporate() {
  useSEO({
    title: 'Corporate & Gym Partnerships',
    description: 'We aim to partner with businesses, offices, gyms and fitness communities to provide affordable, nutritious meals through convenient weekly ordering plans.',
    path: '/corporate',
  });
  return (
    <div className="pt-36 md:pt-44 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="eyebrow mb-3">Corporate &amp; Gym Partnerships</div>
        <h1 className="font-display font-black text-5xl md:text-7xl text-cream leading-[1.05]">Healthy meals for your team.</h1>
        <p className="text-ash mt-6 max-w-3xl text-lg leading-relaxed">
          We aim to partner with businesses, offices, gyms, and fitness communities to provide affordable, nutritious meals through convenient weekly ordering plans.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {points.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-ink-surface border border-line rounded-sm p-8">
              <Icon className="text-vital mb-5" size={28} />
              <h3 className="font-display font-bold text-xl text-cream mb-2">{title}</h3>
              <p className="text-ash text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 border border-vital rounded-sm p-8 md:p-12 bg-ink-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-black text-2xl md:text-3xl text-cream">Interested in a partnership?</h2>
            <p className="text-ash mt-2">Tell us about your team or gym and we'll be in touch. Initial launch location: Tauranga, New Zealand.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="inline-block bg-vital hover:bg-vital-bright text-ink font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-[40px] text-center transition-colors">Contact Us</Link>
            <a href={`mailto:${CORPORATE_EMAIL}`} className="inline-block border border-vital/60 text-cream hover:border-vital font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-[40px] text-center transition-colors">{CORPORATE_EMAIL}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
