// Server-side menu and rules used by checkout. Customers can never change what
// they are charged or which free extras they get: everything is re-checked here.
// Keep in sync with src/lib/productData.js and src/lib/orderRules.js.
// Prices are in NZD, including GST.

export const MENU = {
  // Lunch: NZ$18.90 each
  'velvet-beef':           { name: 'VELVET BEEF',            price: 18.9, type: 'lunch' },
  'korzavo-fire-skewers':  { name: 'KORZAVO FIRE SKEWERS',   price: 18.9, type: 'lunch' },
  'redline-beef-pasta':    { name: 'REDLINE BEEF PASTA',     price: 18.9, type: 'lunch' },
  'korzavo-phoenix':       { name: 'KORZAVO PHOENIX',        price: 18.9, type: 'lunch' },
  'korzavo-volcano':       { name: 'KORZAVO VOLCANO',        price: 18.9, type: 'lunch' },
  'herb-grilled-chicken':  { name: 'HERB GRILLED CHICKEN',   price: 18.9, type: 'lunch' },
  'cajun-tide':            { name: 'CAJUN TIDE',             price: 18.9, type: 'lunch' },
  // Dinner: NZ$19.90 each
  'chicken-burrito-bowl':         { name: 'CHICKEN BURRITO BOWL',         price: 19.9, type: 'dinner' },
  'korzavo-beef-wrap':            { name: 'KORZAVO BEEF WRAP',            price: 19.9, type: 'dinner' },
  'beef-pepperoni-pizza-lasagna': { name: 'BEEF PEPPERONI PIZZA LASAGNA', price: 19.9, type: 'dinner' },
  'slow-cooked-lamb-shoulder':    { name: 'SLOW-COOKED LAMB SHOULDER',    price: 19.9, type: 'dinner' },
  'lemon-herb-shrimp-skewers':    { name: 'LEMON HERB SHRIMP SKEWERS',    price: 19.9, type: 'dinner' },
  // Weekly plan = 7 lunch meals
  'weekly-signature-plan': { name: 'WEEKLY SIGNATURE PLAN', price: 124.9, type: 'lunch', meals: 7 },
};

// Complimentary extras (not sold separately).
export const BREAKFASTS = {
  'strawberry-vanilla-rice-pudding': 'Strawberry & Vanilla Rice Pudding',
  'tropical-mango-rice-pudding': 'Tropical Mango Rice Pudding',
  'blueberry-vanilla-rice-pudding': 'Blueberry & Vanilla Rice Pudding',
  'banana-cinnamon-oatmeal': 'Banana & Cinnamon Oatmeal',
  'chocolate-oatmeal': 'Chocolate Oatmeal',
  'pistachio-honey-oatmeal': 'Pistachio & Honey Oatmeal',
};
export const SOUPS = {
  'lentil-soup': 'Lentil Soup',
  'pumpkin-soup': 'Pumpkin Soup',
};
export const DESSERTS = {
  'golden-coconut-bites': 'Golden Coconut Bites',
  'date-coconut-balls': 'Date & Coconut Balls',
};

// Free-extras rules (keep in sync with src/lib/orderRules.js).
//  - 5 or more lunch meals  -> 3 complimentary breakfasts (fewer than 5: none)
//  - 3 or more dinners      -> 1 complimentary soup (any dinners, any quantity per dish)
//  - 5+ lunches AND 3+ dinners (a full week) -> 2 complimentary dessert cups as a bonus
export const RULES = {
  breakfastMinLunches: 5, freeBreakfasts: 3,
  soupMinDinners: 3, freeSoups: 1,
  dessertMinLunches: 5, dessertMinDinners: 3, freeDesserts: 2,
};
export const breakfastsAllowed = (lunches) => (lunches >= RULES.breakfastMinLunches ? RULES.freeBreakfasts : 0);
export const soupsAllowed = (dinners) => (dinners >= RULES.soupMinDinners ? RULES.freeSoups : 0);
export const dessertsAllowed = (lunches, dinners) =>
  lunches >= RULES.dessertMinLunches && dinners >= RULES.dessertMinDinners ? RULES.freeDesserts : 0;

// Delivery area. Override with DELIVERY_POSTCODES (comma separated) in Vercel.
// CONFIRM this list against your real delivery zone.
export const deliveryPostcodes = () =>
  (process.env.DELIVERY_POSTCODES || '3110,3112,3116,3118').split(',').map((p) => p.trim()).filter(Boolean);
