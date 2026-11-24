// KORZAVO MEALS — menu data.
// Prices are in NZD and include GST. Lunch meals are NZ$18.90, dinner meals NZ$19.90.
// Breakfast, soups and desserts are complimentary extras (not sold separately).
// If you change a price here, change it in api/_menu.js too (the server re-checks prices).

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
    category: 'Lunch',
    meal_type: 'lunch',
    description:
      'Succulent slow-cooked beef in a rich mushroom and roasted pepper sauce, served with silky mashed potatoes and tender steamed broccoli.',
    portion_size: '520g',
    price: 18.9,
    image_url: img('velvet-beef'),
  },
  {
    number: '02',
    name: 'KORZAVO FIRE SKEWERS',
    slug: 'korzavo-fire-skewers',
    category: 'Lunch',
    meal_type: 'lunch',
    description:
      'Juicy flame-grilled chicken skewers marinated in our signature KORZAVO seasoning, served with aromatic smoky rice, thyme-roasted vegetables and a chilled spicy house sauce.',
    portion_size: '460g',
    price: 18.9,
    image_url: img('korzavo-fire-skewers'),
  },
  {
    number: '03',
    name: 'REDLINE BEEF PASTA',
    slug: 'redline-beef-pasta',
    category: 'Lunch',
    meal_type: 'lunch',
    description:
      'Tender slow-cooked beef served over perfectly cooked pasta in a rich tomato and roasted pepper sauce, finished with melted cheddar cheese.',
    portion_size: '455g',
    price: 18.9,
    image_url: img('redline-beef-pasta'),
  },
  {
    number: '04',
    name: 'KORZAVO PHOENIX',
    slug: 'korzavo-phoenix',
    category: 'Lunch',
    meal_type: 'lunch',
    description:
      'Tender chicken breast rolled and stuffed with spinach, roasted peppers and smoked cheese, served with golden roasted sweet potatoes, broccolini and our signature creamy lemon-herb sauce.',
    portion_size: '502g',
    price: 18.9,
    image_url: img('korzavo-phoenix'),
  },
  {
    number: '05',
    name: 'KORZAVO VOLCANO',
    slug: 'korzavo-volcano',
    category: 'Lunch',
    meal_type: 'lunch',
    description:
      'A golden oven-baked potato generously loaded with tender slow-cooked beef, caramelised onions, fire-roasted peppers, melted cheddar and jalapeños, finished with our signature smoky chipotle sauce.',
    portion_size: '540g',
    price: 18.9,
    image_url: img('korzavo-volcano'),
  },
  {
    number: '06',
    name: 'HERB GRILLED CHICKEN',
    slug: 'herb-grilled-chicken',
    category: 'Lunch',
    meal_type: 'lunch',
    description:
      'Juicy herb-grilled chicken breast served with fragrant jasmine rice, roasted carrots and tender broccoli.',
    portion_size: '510g',
    price: 18.9,
    image_url: img('herb-grilled-chicken'),
  },
  {
    number: '07',
    name: 'CAJUN TIDE',
    slug: 'cajun-tide',
    category: 'Lunch',
    meal_type: 'lunch',
    description:
      'Juicy Cajun-seasoned prawns served over fragrant jasmine rice with golden roasted baby potatoes and sweet corn, finished with our signature creamy Cajun sauce.',
    portion_size: '530g',
    price: 18.9,
    image_url: img('cajun-tide'),
  },
];


// Dinner meals — each comes with a complimentary soup.
export const DINNERS = [
  {
    number: '01',
    name: 'CHICKEN BURRITO BOWL',
    slug: 'chicken-burrito-bowl',
    category: 'Dinner',
    meal_type: 'dinner',
    description: 'Seasoned chicken, rice, black beans, sweet corn, fresh salsa and guacamole with a creamy sauce.',
    price: 19.9,
    image_url: img('chicken-burrito-bowl'),
  },
  {
    number: '02',
    name: 'KORZAVO BEEF WRAP',
    slug: 'korzavo-beef-wrap',
    category: 'Dinner',
    meal_type: 'dinner',
    description: 'Tender slow-cooked beef, melted cheese, fresh greens and tomato in a toasted tortilla.',
    price: 19.9,
    image_url: img('korzavo-beef-wrap'),
  },
  {
    number: '03',
    name: 'BEEF PEPPERONI PIZZA LASAGNA',
    slug: 'beef-pepperoni-pizza-lasagna',
    category: 'Dinner',
    meal_type: 'dinner',
    badge: 'House Special',
    description: 'Layers of beef lasagna with rich tomato sauce, melted cheese and beef pepperoni.',
    price: 19.9,
    image_url: img('beef-pepperoni-pizza-lasagna'),
  },
  {
    number: '04',
    name: 'SLOW-COOKED LAMB SHOULDER',
    slug: 'slow-cooked-lamb-shoulder',
    category: 'Dinner',
    meal_type: 'dinner',
    description: 'Tender boneless lamb shoulder, slow-cooked and served with honey-roasted sweet potatoes.',
    price: 19.9,
    image_url: img('slow-cooked-lamb-shoulder'),
  },
  {
    number: '05',
    name: 'LEMON HERB SHRIMP SKEWERS',
    slug: 'lemon-herb-shrimp-skewers',
    category: 'Dinner',
    meal_type: 'dinner',
    description: 'Grilled shrimp skewers with roasted potatoes, green beans and lemon-herb glaze.',
    price: 19.9,
    image_url: img('lemon-herb-shrimp-skewers'),
  },
];

// Complimentary extras (not sold separately).
export const BREAKFASTS = [
  { slug: 'strawberry-vanilla-rice-pudding', type: 'Protein Rice Pudding', flavour: 'Strawberry & Vanilla', image: '/images/breakfast/strawberry-vanilla-rice-pudding.jpg' },
  { slug: 'tropical-mango-rice-pudding', type: 'Protein Rice Pudding', flavour: 'Tropical Mango', image: '/images/breakfast/tropical-mango-rice-pudding.jpg' },
  { slug: 'blueberry-vanilla-rice-pudding', type: 'Protein Rice Pudding', flavour: 'Blueberry & Vanilla', image: '/images/breakfast/blueberry-vanilla-rice-pudding.jpg' },
  { slug: 'banana-cinnamon-oatmeal', type: 'Protein Oatmeal', flavour: 'Banana & Cinnamon', image: '/images/breakfast/banana-cinnamon-oatmeal.jpg' },
  { slug: 'chocolate-oatmeal', type: 'Protein Oatmeal', flavour: 'Chocolate', image: '/images/breakfast/chocolate-oatmeal.jpg' },
  { slug: 'pistachio-honey-oatmeal', type: 'Protein Oatmeal', flavour: 'Pistachio & Honey', image: '/images/breakfast/pistachio-honey-oatmeal.jpg' },
];

export const SOUPS = [
  { slug: 'lentil-soup', name: 'Lentil Soup', image: '/images/extras/lentil-soup.jpg' },
  { slug: 'pumpkin-soup', name: 'Pumpkin Soup', image: '/images/extras/pumpkin-soup.jpg' },
];

export const DESSERTS = [
  { slug: 'golden-coconut-bites', name: 'Golden Coconut Bites', image: '/images/extras/golden-coconut-bites.jpg' },
  { slug: 'date-coconut-balls', name: 'Date & Coconut Balls', image: '/images/extras/date-coconut-balls.jpg' },
];

export const EXTRAS_IMAGES = {
  breakfastCollage: '/images/extras/breakfast-collage.jpg',
  soupCollage: '/images/extras/soup-collage.jpg',
  dessertCollection: '/images/extras/dessert-collection.jpg',
};

// The three "included free" offers, shown on the home, menu and plans pages.
export const FREE_OFFERS = [
  { key: 'breakfast', title: '3 free breakfasts with 5+ lunches', text: 'Order 5 or more lunch meals and choose 3 complimentary breakfasts: protein rice pudding or protein oatmeal, in any flavours.' },
  { key: 'soup', title: 'Free soup with 3+ dinners', text: 'Pick any dinners, in any quantity per dish. Once your order reaches 3 dinners, a complimentary Lentil Soup or Pumpkin Soup comes with it.' },
  { key: 'dessert', title: '2 free dessert cups', text: 'Order both lunch and dinner meals for the week (5+ lunches and 3+ dinners) and choose 2 complimentary dessert cups as an extra bonus.' },
];

export const WEEKLY_PLAN = {
  number: 'PLAN',
  name: 'WEEKLY SIGNATURE PLAN',
  slug: 'weekly-signature-plan',
  category: 'Weekly Plan',
  is_plan: true,
  meal_type: 'lunch',
  meal_count: 7,
  description:
    'Enjoy seven unique chef-crafted meals, designed to bring bold flavours and convenient, protein-rich food into your everyday routine.',
  portion_size: '7 signature meals',
  price: 124.9,
  compare_at_price: +MEALS.reduce((sum, m) => sum + m.price, 0).toFixed(2),
  image_url: img('weekly-signature-plan'),
};

export const PRODUCTS = [...MEALS, ...DINNERS, WEEKLY_PLAN].map((p, i) => ({ ...p, display_order: i + 1 }));

export const PLAN_SAVING = +(WEEKLY_PLAN.compare_at_price - WEEKLY_PLAN.price).toFixed(2);

export const MEAL_CATEGORIES = [
  { title: 'High-Protein Meals', text: 'Delicious, protein-rich meals designed to support an active lifestyle.' },
  { title: 'Breakfast, Lunch & Dinner', text: 'Nutritious, satisfying meals for every part of your day.' },
  { title: 'Fitness Meals', text: 'Portion-controlled meals with clear nutritional information.' },
  { title: 'Corporate Meals', text: 'Convenient meal solutions for businesses and their employees.' },
  { title: 'Weekly Meal Plans', text: 'Flexible weekly subscriptions for individuals and teams.' },
];

export const HOW_IT_WORKS = [
  { title: 'Explore our weekly menu', text: 'See what the chefs have prepared this week.' },
  { title: 'Choose your meals or weekly plan', text: 'Pick favourites, or let the weekly plan cover your week.' },
  { title: 'Place your order', text: 'Simple, secure ordering online. Free breakfast, soup and dessert extras are included.' },
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
