import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CONTACT_EMAIL, CORPORATE_EMAIL, LAUNCH_LOCATION } from '@/lib/brand';
import { useSEO } from '@/hooks/useSEO';

const TOPICS = ['General enquiry', 'Register interest in ordering', 'Corporate / gym partnership', 'Weekly plan question'];
const field = 'w-full bg-transparent border border-line rounded-sm px-4 py-3 text-cream placeholder:text-ash focus:outline-none focus:border-vital transition-colors';
const label = 'text-[10px] tracking-widest uppercase text-ash block mb-2';

export default function Contact() {
  useSEO({ title: 'Contact Us', description: 'Questions, corporate and gym partnerships, or register your interest in KORZAVO MEALS.', path: '/contact' });
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      toast({ title: 'Message sent', description: "Thanks — we'll be in touch soon." });
      setForm({ name: '', email: '', topic: TOPICS[0], message: '' });
    } catch (err) {
      toast({ title: "Couldn't send message", description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-36 md:pt-44">
      <section className="px-6 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow mb-3">Contact Us</div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-cream leading-tight">Get in touch.</h1>
          <p className="text-ash mt-6 max-w-xl text-base md:text-lg">Questions about the menu, weekly plans, or a corporate or gym partnership? Send us a message.</p>
        </div>
      </section>

      <section className="px-6 pb-24 border-t border-line">
        <div className="max-w-7xl mx-auto pt-14 grid lg:grid-cols-2 gap-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={label} htmlFor="name">Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} required className={field} placeholder="Your name" />
              </div>
              <div>
                <label className={label} htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required className={field} placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className={label} htmlFor="topic">Topic</label>
              <select id="topic" name="topic" value={form.topic} onChange={handleChange} className={`${field} bg-ink`}>
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={6} className={field} placeholder="Your message..." />
            </div>
            <Button type="submit" disabled={submitting} className="bg-vital hover:bg-vital-bright text-ink font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-[40px]">
              {submitting ? 'Sending...' : 'Send Message'}
              {!submitting && <Send size={14} className="ml-2" />}
            </Button>
          </form>

          <div className="lg:pl-8 space-y-8">
            <div className="eyebrow">Other ways to reach us</div>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-line rounded-sm flex items-center justify-center shrink-0"><Mail size={16} className="text-vital" /></div>
              <div>
                <div className="text-[10px] tracking-widest uppercase text-ash mb-1">General enquiries</div>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-cream hover:text-vital transition-colors font-medium">{CONTACT_EMAIL}</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-line rounded-sm flex items-center justify-center shrink-0"><Mail size={16} className="text-vital" /></div>
              <div>
                <div className="text-[10px] tracking-widest uppercase text-ash mb-1">Corporate &amp; gym partnerships</div>
                <a href={`mailto:${CORPORATE_EMAIL}`} className="text-cream hover:text-vital transition-colors font-medium">{CORPORATE_EMAIL}</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-line rounded-sm flex items-center justify-center shrink-0"><MapPin size={16} className="text-vital" /></div>
              <div>
                <div className="text-[10px] tracking-widest uppercase text-ash mb-1">Initial launch location</div>
                <p className="text-cream font-medium">{LAUNCH_LOCATION}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
