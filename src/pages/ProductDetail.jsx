import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MealImage from '@/components/meals/MealImage';
import OrderButton from '@/components/meals/OrderButton';
import { PRODUCTS, MEALS, DINNERS } from '@/lib/productData';
import { formatNZD } from '@/lib/brand';
import { useSEO } from '@/hooks/useSEO';
import PageNotFound from '@/lib/PageNotFound';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  useSEO({
    title: product?.name || 'Meal',
    description: product?.description || 'KORZAVO MEALS',
    path: `/products/${slug}`,
    type: 'product',
  });
  if (!product) return <PageNotFound />;

  const others = [...MEALS, ...DINNERS].filter((m) => m.slug !== product.slug && m.meal_type === product.meal_type).slice(0, 3);

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-ash hover:text-vital text-xs tracking-widest uppercase mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <MealImage product={product} className="aspect-square rounded-sm border border-line" />

          <div className="flex flex-col">
            <div className="eyebrow mb-3">{product.is_plan ? 'Weekly Plan' : `${product.category} · ${product.number}`}</div>
            <h1 className="font-display font-black text-4xl md:text-6xl text-cream leading-[1.05]">{product.name}</h1>
            <p className="text-ash text-base md:text-lg leading-relaxed mt-6">{product.description}</p>

            <dl className="grid grid-cols-2 gap-px bg-line border border-line rounded-sm mt-8 overflow-hidden">
              <div className="bg-ink-surface p-5">
                <dt className="text-[10px] tracking-widest uppercase text-ash mb-1">
                  {product.is_plan ? 'Includes' : product.portion_size ? 'Portion size' : 'Comes with'}
                </dt>
                <dd className="text-cream font-display font-bold text-xl">
                  {product.portion_size || 'Free soup with 3+'}
                </dd>
              </div>
              <div className="bg-ink-surface p-5">
                <dt className="text-[10px] tracking-widest uppercase text-ash mb-1">Price (incl. GST)</dt>
                <dd className="text-neon font-display font-extrabold text-xl">
                  {product.compare_at_price && <span className="line-through text-ash/60 text-sm mr-2">{formatNZD(product.compare_at_price)}</span>}
                  {formatNZD(product.price)}
                </dd>
              </div>
            </dl>

            {product.meal_type === 'lunch' && (
              <div className="mt-4 rounded-sm border border-neon/40 bg-neon/10 p-5">
                <div className="text-[10px] tracking-widest uppercase text-neon mb-1">Breakfast is on us</div>
                <p className="text-cream-dim text-sm leading-relaxed">Order 5 or more lunch meals and get 3 free breakfasts: protein rice pudding or protein oatmeal, in any flavours you choose.</p>
              </div>
            )}
            {product.meal_type === 'dinner' && (
              <div className="mt-4 rounded-sm border border-neon/40 bg-neon/10 p-5">
                <div className="text-[10px] tracking-widest uppercase text-neon mb-1">Soup is on us</div>
                <p className="text-cream-dim text-sm leading-relaxed">Choose any dinners, in any quantity per dish. Once your order reaches 3 dinners, a complimentary Lentil Soup or Pumpkin Soup comes with it. Your choice.</p>
              </div>
            )}

            <div className="mt-8 border border-line rounded-sm p-5 bg-ink-surface">
              <div className="text-[10px] tracking-widest uppercase text-ash mb-1">Nutritional information</div>
              <p className="text-cream-dim text-sm leading-relaxed">
                Exact protein and calorie values will be added after recipe testing. Allergen details will be listed before launch.
              </p>
            </div>

            <div className="mt-8"><OrderButton product={product} label={product.is_plan ? 'CHOOSE THIS PLAN' : 'ORDER NOW'} /></div>
            <p className="text-ash text-xs mt-4">Initial launch location: Tauranga, New Zealand. Delivery details will be confirmed before launch.</p>
          </div>
        </div>

        {!product.is_plan && (
          <div className="mt-24">
            <div className="eyebrow mb-3">More from the menu</div>
            <div className="grid sm:grid-cols-3 gap-5">
              {others.map((m) => (
                <Link key={m.slug} to={`/products/${m.slug}`} className="group bg-ink-surface border border-line rounded-sm overflow-hidden hover:border-vital transition-colors">
                  <MealImage product={m} className="aspect-square" />
                  <div className="p-4 flex items-center justify-between">
                    <span className="font-display font-bold text-cream group-hover:text-vital transition-colors">{m.name}</span>
                    <span className="text-neon text-sm">{formatNZD(m.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
