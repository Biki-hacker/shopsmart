import React, { useState, lazy, Suspense, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Shield, Truck, RefreshCw, Zap, ChevronRight, Sparkles } from 'lucide-react';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard/ProductCard';
const ProductModal = lazy(() => import('../components/ProductModal/ProductModal'));

// Hero Section
const HeroSection = () => {
  const navigate = useNavigate();

  const heroSlides = [
    {
      badge: '🎉 New Arrivals',
      title: 'Shop Smarter with',
      highlight: 'AI-Powered',
      subtitle: 'Shopping',
      description: 'Discover curated products, get personalized recommendations, and shop with confidence using our intelligent shopping assistant.',
      cta: 'Explore Products',
      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=500&fit=crop',
      ctaLink: '/products',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero Section">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900/20 to-dark-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 text-primary-300 text-sm font-medium px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {heroSlides[0].badge}
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
            {heroSlides[0].title}{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent block">
              {heroSlides[0].highlight}
            </span>
            {heroSlides[0].subtitle}
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
            {heroSlides[0].description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to={heroSlides[0].ctaLink}
              className="btn-accent flex items-center gap-2 text-base"
              id="hero-cta-btn"
            >
              {heroSlides[0].cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/products"
              className="btn-secondary flex items-center gap-2 text-base"
              id="hero-secondary-btn"
            >
              View Deals
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
            {[
              { value: '22+', label: 'Products' },
              { value: '4.8★', label: 'Avg Rating' },
              { value: '7-Day', label: 'Returns' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl scale-110" />

            <img
              src={heroSlides[0].image}
              alt="ShopSmart AI"
              className="relative rounded-3xl border border-white/10 shadow-2xl w-full object-cover aspect-[4/3]"
            />

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 glass-card p-3 flex items-center gap-3 shadow-xl"
            >
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Sales Today</p>
                <p className="text-green-400 text-sm font-bold">+247 orders</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -top-6 -right-6 glass-card p-3 flex items-center gap-3 shadow-xl"
            >
              <div className="flex">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-primary-500 border-2 border-dark-800 -ml-2 first:ml-0 flex items-center justify-center text-xs font-bold text-white">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Happy Customers</p>
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Category Cards Section
const CategorySection = () => {
  const categories = [
    {
      name: 'Electronics',
      icon: '💻',
      count: products.filter(p => p.category === 'Electronics').length,
      gradient: 'from-blue-600/20 to-primary-600/20',
      border: 'border-blue-500/20',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',
    },
    {
      name: 'Fashion',
      icon: '👗',
      count: products.filter(p => p.category === 'Fashion').length,
      gradient: 'from-pink-600/20 to-rose-600/20',
      border: 'border-pink-500/20',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop',
    },
    {
      name: 'Home',
      icon: '🏠',
      count: products.filter(p => p.category === 'Home').length,
      gradient: 'from-amber-600/20 to-orange-600/20',
      border: 'border-amber-500/20',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
    },
    {
      name: 'Accessories',
      icon: '⌚',
      count: products.filter(p => p.category === 'Accessories').length,
      gradient: 'from-purple-600/20 to-violet-600/20',
      border: 'border-purple-500/20',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Product Categories">
      <div className="text-center mb-10">
        <h2 className="section-title">Browse Categories</h2>
        <p className="section-subtitle">Everything you need, all in one place</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Link
              to={`/products?category=${cat.name}`}
              className={`block glass-card bg-gradient-to-br ${cat.gradient} border ${cat.border} overflow-hidden group`}
              aria-label={`Browse ${cat.name} - ${cat.count} products`}
              id={`category-${cat.name.toLowerCase()}`}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <span className="absolute bottom-2 left-3 text-2xl">{cat.icon}</span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm">{cat.name}</h3>
                <p className="text-slate-400 text-xs mt-0.5">{cat.count} products</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-primary-400 font-medium group-hover:gap-2 transition-all">
                  Shop Now <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    { Icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', color: 'text-blue-400' },
    { Icon: Shield, title: 'Secure Payment', desc: '100% protected', color: 'text-green-400' },
    { Icon: RefreshCw, title: '7-Day Returns', desc: 'Easy no-hassle returns', color: 'text-purple-400' },
    { Icon: Zap, title: 'AI Assistant', desc: '24/7 smart chatbot', color: 'text-accent-400' },
  ];

  return (
    <section className="bg-dark-800/50 border-y border-white/5 py-10" aria-label="Features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ Icon, title, desc, color }) => (
            <div key={title} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-slate-500 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Products
const FeaturedProducts = ({ onProductClick }) => {
  const featured = products.filter(p => p.badge).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Featured Products">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Hand-picked by our AI for you</p>
        </div>
        <Link
          to="/products"
          className="hidden sm:flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors"
          id="view-all-products-btn"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={onProductClick} />
        ))}
      </div>
    </section>
  );
};

// Main Home Page
const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <CategorySection />
      <FeaturedProducts onProductClick={setSelectedProduct} />

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative bg-gradient-to-r from-primary-700 to-primary-800 rounded-3xl overflow-hidden p-8 lg:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Ready to shop smarter?</h2>
              <p className="text-primary-200">Browse 22+ curated products across 4 categories</p>
            </div>
            <Link
              to="/products"
              className="btn-accent flex items-center gap-2 whitespace-nowrap"
              id="cta-explore-btn"
            >
              Explore All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <Suspense fallback={null}>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </Suspense>
    </main>
  );
};

export default Home;
