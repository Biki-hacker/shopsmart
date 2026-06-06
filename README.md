<div align="center">

<img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white" />

<br />
<br />

# ⚡ ShopSmart AI

### *Smart Shopping, Smarter You*

A modern, frontend-only e-commerce web application featuring a professional UI, real-time product filtering, shopping cart with persistence, and a built-in rule-based NLP chatbot — all without a backend.

[Live Demo](https://shopsmart-alpha.vercel.app/) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛍️ **Product Catalog** | 22+ curated products across 4 categories with Unsplash imagery |
| 🔍 **Search & Filter** | Live search by name/category, price range slider, sort controls |
| 🛒 **Cart Management** | Add, remove, update quantity — cart persists via `localStorage` |
| 🤖 **AI Chatbot** | Floating rule-based NLP chatbot with typing indicator & quick replies |
| 📦 **Product Details** | Full detail page with breadcrumb, image gallery, feature tags |
| 🎨 **Premium Design** | Dark mode, glassmorphism cards, Framer Motion animations |
| 📱 **Fully Responsive** | Mobile, tablet, and desktop layouts |
| ⚡ **Performance** | Code-split lazy loading, `React.memo`, optimized images |
| ♿ **Accessible** | `aria-labels`, keyboard navigation, semantic HTML |
| 🚀 **Vercel Ready** | `vercel.json` SPA rewrite rules included |

---

## 🏗️ Architecture

### Project Structure

```
src/
│
├── assets/                  # Static assets (icons, images)
│
├── chatbot/                 # NLP Engine (no external APIs)
│   ├── intents.js           # Intent definitions with keyword patterns
│   ├── responses.js         # Response templates with randomization
│   └── chatbotEngine.js     # Preprocessing → Detection → Response pipeline
│
├── components/
│   ├── Navbar/              # Sticky nav with search, cart badge, mobile menu
│   ├── ProductCard/         # Hover card with wishlist, discount badge, star rating
│   ├── CartDrawer/          # Slide-in drawer (used on home/products pages)
│   ├── Chatbot/             # Floating chatbot widget with typing indicator
│   ├── Footer/              # Newsletter, links, social icons
│   └── ProductModal/        # Quick-view modal with add-to-cart
│
├── context/
│   └── CartContext.jsx      # Global cart state via useReducer + localStorage
│
├── data/
│   └── products.json        # 22 products: id, title, price, rating, image, etc.
│
├── pages/
│   ├── Home.jsx             # Hero, categories, featured products, CTA
│   ├── Products.jsx         # Full grid + sidebar filters + sort + search
│   ├── Cart.jsx             # Cart items, order summary, promo code field
│   └── ProductDetails.jsx   # Full product page + related products
│
├── App.jsx                  # Router, providers, layout shell
└── main.jsx                 # React DOM entry point
```

### Component Hierarchy

```
App
├── BrowserRouter
│   ├── CartProvider (Context)
│   │   ├── Navbar
│   │   ├── Routes
│   │   │   ├── Home
│   │   │   │   ├── HeroSection
│   │   │   │   ├── FeaturesSection
│   │   │   │   ├── CategorySection
│   │   │   │   └── FeaturedProducts → ProductCard[]
│   │   │   ├── Products
│   │   │   │   ├── FilterSidebar
│   │   │   │   └── ProductCard[]
│   │   │   ├── ProductDetails
│   │   │   │   └── ProductCard[] (related)
│   │   │   └── Cart
│   │   ├── Footer
│   │   └── Chatbot (floating)
```

---

## 🤖 Chatbot — How It Works

The chatbot uses a **three-stage rule-based NLP pipeline** — no external APIs or machine learning models required.

### Stage 1 — Text Preprocessing

Raw user input is normalized into clean tokens:

```js
// Input: "Show me some Laptops!"
// ↓ lowercase      → "show me some laptops!"
// ↓ remove punct   → "show me some laptops"
// ↓ trim & split   → ["show", "me", "some", "laptops"]
```

```js
// chatbotEngine.js
export const preprocessText = (input) => {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(token => token.length > 0);
};
```

### Stage 2 — Intent Detection

Tokens are scored against keyword arrays for each intent. Exact token matches score higher than substring matches:

```js
// intents.js — supported intents:
{ name: 'greeting',       patterns: ['hello', 'hi', 'hey', ...] }
{ name: 'product_search', patterns: ['laptop', 'phone', 'electronics', ...] }
{ name: 'pricing',        patterns: ['price', 'cost', 'cheap', 'deal', ...] }
{ name: 'cart',           patterns: ['cart', 'checkout', 'buy', ...] }
{ name: 'delivery',       patterns: ['delivery', 'shipping', 'track', ...] }
{ name: 'refund',         patterns: ['refund', 'return', 'cancel', ...] }
{ name: 'fashion',        patterns: ['shoes', 'clothing', 'jacket', ...] }
{ name: 'home',           patterns: ['furniture', 'vacuum', 'decor', ...] }
{ name: 'thanks',         patterns: ['thanks', 'awesome', 'great', ...] }
```

### Stage 3 — Response Generation

The engine picks a random response from the matched intent's template pool, preventing repetitive replies:

```js
// responses.js
export const getResponse = (intentName) => {
  const responseList = responses[intentName] || responses.unknown;
  return responseList[Math.floor(Math.random() * responseList.length)];
};
```

---

## 🛒 State Management

Cart state is managed globally via React's **Context API + `useReducer`** pattern:

```js
// CartContext.jsx — available actions:
addToCart(product)          // Add item or increment quantity if exists
removeFromCart(id)          // Remove item by id
updateQuantity(id, qty)     // Set quantity (removes item if qty ≤ 0)
clearCart()                 // Empty the cart

// Computed values:
cartCount    // Total item count (sum of quantities)
cartTotal    // Total price (sum of price × quantity)
```

State is automatically synced to `localStorage` on every update and rehydrated on page load — the cart persists across browser sessions.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shopsmart-ai.git

# 2. Navigate into the project
cd shopsmart-ai

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## ☁️ Deployment

### Deploy to Vercel (Recommended)

> The `vercel.json` SPA rewrite config is already included.

**Option A — Vercel CLI:**

```bash
npm install -g vercel
vercel login
vercel
```

**Option B — GitHub Integration:**

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**

**Build settings** (auto-detected, but verify):

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 18.3 | UI framework |
| [Vite](https://vitejs.dev) | 5.3 | Build tool & dev server |
| [React Router DOM](https://reactrouter.com) | 6.24 | Client-side routing |
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animations & transitions |
| [Lucide React](https://lucide.dev) | 0.400 | Icon library |
| Context API | Built-in | Global state management |
| localStorage | Built-in | Cart persistence |

---

## 🔮 Future Improvements

- [ ] **Backend Integration** — Node.js/Express API or Supabase for real data
- [ ] **Authentication** — User accounts, order history, saved wishlists
- [ ] **Payment Gateway** — Stripe or Razorpay checkout integration
- [ ] **LLM-Powered Chatbot** — Upgrade NLP engine to GPT-4o or Gemini
- [ ] **Recommendation Engine** — ML-based "You might also like" suggestions
- [ ] **Product Reviews** — User-submitted ratings and review system
- [ ] **Admin Dashboard** — Inventory and order management panel
- [ ] **Push Notifications** — Browser notifications for deals and order updates

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Built with ❤️ for hackathon judges everywhere.

**ShopSmart AI** — *Where smart design meets intelligent shopping.*

</div>
