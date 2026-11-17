// KORZAVO MEALS — menu data.
// Prices are in NZD and include GST.

// Master switch for customer orders. Orders stay OFF until delivery fees,
// delivery areas and availability are confirmed. To switch ordering on, set
// VITE_ORDERING_OPEN=true (and ORDERING_OPEN=true for the API) in Vercel.
export const ORDERING_OPEN = import.meta.env.VITE_ORDERING_OPEN === 'true';

// Kept for compatibility: pauses the whole menu (shows "Sold out").
export const STORE_OUT_OF_STOCK = false;

// Photo for each meal: put the file at /public/images/meals/<slug>.jpg
const img = (slug) => `/images/meals/${slug}.jpg`;

export const MEALS = [
  {
    number: '01',
    name: 'VELVET BEEF',
    slug: 'velvet-beef',
    category: 'Signature Menu',
    description:
      'Succulent slow-cooked beef in a rich mushroom and roasted pepper sauce, served with silky mashed potatoes and tender steamed broccoli.',
    portion_size: '520g',
    price: 19.9,
    image_url: img('velvet-beef'),
  },
  {
    number: '02',
    name: 'KORZAVO FIRE SKEWERS',
    slug: 'korzavo-fire-skewers',
    category: 'Signature Menu',
    description:
      'Juicy flame-grilled chicken skewers marinated in our signature KORZAVO seasoning, served with aromatic smoky rice, thyme-roasted vegetable skewers and a chilled spicy house sauce.',
    portion_size: '460g',
    price: 15.9,
    image_url: img('korzavo-fire-skewers'),
  },
  {
    number: '03',
    name: 'REDLINE BEEF PASTA',
    slug: 'redline-beef-pasta',
    category: 'Signature Menu',
    description:
      'Tender slow-cooked beef served over perfectly cooked pasta in a rich tomato and roasted pepper sauce, finished with melted cheddar cheese.',
    portion_size: '455g',
    price: 17.9,
    image_url: img('redline-beef-pasta'),
  },
  {
    number: '04',
    name: 'KORZAVO PHOENIX',
    slug: 'korzavo-phoenix',
    category: 'Signature Menu',
    description:
      'Tender chicken breast rolled and stuffed with spinach, roasted peppers and smoked cheese, served with golden roasted sweet potatoes, broccolini and our signature creamy lemon-herb sauce.',
    portion_size: '502g',
    price: 19.9,
    image_url: img('korzavo-phoenix'),
  },
  {
    number: '05',
    name: 'KORZAVO VOLCANO',
    slug: 'korzavo-volcano',
    category: 'Signature Menu',
    description:
      'A golden oven-baked potato generously loaded with tender slow-cooked beef, caramelised onions, fire-roasted peppers, melted cheddar and jalapeños, finished with our signature smoky chipotle sauce.',
    portion_size: '540g',
    price: 18.9,
    image_url: img('korzavo-volcano'),
  },
  {
    number: '06',
    name: 'MIDNIGHT GLAZE',
    slug: 'midnight-glaze',
    category: 'Signature Menu',
    description:
      'Succulent chicken glazed in a rich soy, ginger and honey sauce, served with fragrant sesame jasmine rice, charred green beans and roasted carrots, finished with a refreshing lime drizzle.',
    portion_size: '510g',
    price: 16.9,
    image_url: img('midnight-glaze'),
  },
  {
    number: '07',
    name: 'CAJUN TIDE',
    slug: 'cajun-tide',
    category: 'Signature Menu',
    description:
      'Juicy Cajun-seasoned prawns served over fragrant jasmine rice with golden roasted baby potatoes and sweet corn, finished with our signature creamy Cajun sauce.',
    portion_size: '530g',
    price: 19.9,
    image_url: img('cajun-tide'),
  },
];

export const WEEKLY_PLAN = {
  number: 'PLAN',
  name: 'WEEKLY SIGNATURE PLAN',
  slug: 'weekly-signature-plan',
  category: 'Weekly Plan',
  is_plan: true,
  description:
    'Enjoy seven unique chef-crafted meals, designed to bring bold flavours and convenient, protein-rich food into your everyday routine.',
  portion_size: '7 signature meals',
  price: 124.9,
  compare_at_price: 129.3,
  image_url: img('weekly-signature-plan'),
};

export const PRODUCTS = [...MEALS, WEEKLY_PLAN].map((p, i) => ({ ...p, display_order: i + 1 }));

export const PLAN_SAVING = +(WEEKLY_PLAN.compare_at_price - WEEKLY_PLAN.price).toFixed(2);

export const MEAL_CATEGORIES = [
  { title: 'High-Protein Meals', text: 'Delicious, protein-rich meals designed to support an active lifestyle.' },
  { title: 'Balanced Everyday Meals', text: 'Nutritious, satisfying meals for lunch and dinner.' },
  { title: 'Fitness Meals', text: 'Portion-controlled meals with clear nutritional information.' },
  { title: 'Corporate Meals', text: 'Convenient meal solutions for businesses and their employees.' },
  { title: 'Weekly Meal Plans', text: 'Flexible weekly subscriptions for individuals and teams.' },
];

export const HOW_IT_WORKS = [
  { title: 'Explore our weekly menu', text: 'See what the chefs have prepared this week.' },
  { title: 'Choose your meals or weekly plan', text: 'Pick favourites, or let the weekly plan cover your week.' },
  { title: 'Place your order', text: 'Simple, secure ordering online.' },
  { title: 'Enjoy freshly prepared meals', text: 'Convenient, flavour-packed food, ready when you are.' },
];

export const WHY_CHOOSE = [
  'Delicious and satisfying food',
  'High-protein options',
  'Affordable meal plans',
  'Convenient weekly ordering',
  'Quality ingredients',
  'Clear nutritional information',
];
