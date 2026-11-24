// Free-extras rules for KORZAVO MEALS. The server re-checks all of these in
// api/_menu.js, so keep the two files in sync.
//
//  - Lunch: orders of 5 or more lunch meals get 3 complimentary breakfasts.
//    Fewer than 5 lunch meals get no complimentary breakfast.
//  - Dinner: orders of 3 or more dinners get 1 complimentary soup. Customers
//    choose any dinners in any quantity per dish.
//  - Dessert: an order with both 5+ lunches and 3+ dinners (a full week) also
//    gets 2 complimentary dessert cups, on top of the breakfasts and soup.
import { PRODUCTS, BREAKFASTS, SOUPS, DESSERTS } from '@/lib/productData';

export const RULES = {
  breakfastMinLunches: 5,
  freeBreakfasts: 3,
  soupMinDinners: 3,
  freeSoups: 1,
  dessertMinLunches: 5,
  dessertMinDinners: 3,
  freeDesserts: 2,
};

const find = (slug) => PRODUCTS.find((p) => p.slug === slug);

// Number of lunch / dinner meals in the cart (a weekly plan counts as its meals).
export function countMeals(items, type) {
  return items.reduce((sum, i) => {
    const p = find(i.slug);
    return p && p.meal_type === type ? sum + i.qty * (p.meal_count || 1) : sum;
  }, 0);
}

export const breakfastsAllowed = (lunches) => (lunches >= RULES.breakfastMinLunches ? RULES.freeBreakfasts : 0);
export const soupsAllowed = (dinners) => (dinners >= RULES.soupMinDinners ? RULES.freeSoups : 0);
export const dessertsAllowed = (lunches, dinners) =>
  lunches >= RULES.dessertMinLunches && dinners >= RULES.dessertMinDinners ? RULES.freeDesserts : 0;

export const breakfastLabel = (b) => `${b.flavour} ${b.type.replace('Protein ', '')}`;

export const BREAKFAST_OPTIONS = BREAKFASTS.map((b) => ({ slug: b.slug, label: breakfastLabel(b), image: b.image }));
export const SOUP_OPTIONS = SOUPS.map((s) => ({ slug: s.slug, label: s.name, image: s.image }));
export const DESSERT_OPTIONS = DESSERTS.map((d) => ({ slug: d.slug, label: d.name, image: d.image }));

export const sum = (obj) => Object.values(obj || {}).reduce((a, b) => a + b, 0);
