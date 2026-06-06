import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Grid, List, ArrowUpDown } from 'lucide-react';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard/ProductCard';
const ProductModal = lazy(() => import('../components/ProductModal/ProductModal'));

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Accessories'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A-Z' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState([0, 3500]);
  const [sortBy, setSortBy] = useState('default');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync URL params
  useEffect(() => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory !== 'All') params.category = selectedCategory;
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (search) setSearchQuery(search);
  }, []);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, 3500]);
    setSortBy('default');
    setSearchParams({});
  };

  const hasFilters = searchQuery || selectedCategory !== 'All' || sortBy !== 'default' || priceRange[0] > 0 || priceRange[1] < 3500;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h1>
        <p className="text-slate-400">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          {searchQuery && <span> for "<span className="text-primary-400">{searchQuery}</span>"</span>}
        </p>
      </div>

      {/* Search + Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="input-field pl-11"
            aria-label="Search products"
            id="products-search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 text-slate-400"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field pr-10 appearance-none cursor-pointer min-w-[160px]"
            aria-label="Sort products"
            id="products-sort"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-dark-800">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="sm:hidden btn-secondary flex items-center gap-2"
          aria-label="Toggle filters"
          id="filter-toggle-btn"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside
          className={`${filterOpen ? 'block' : 'hidden'} sm:block w-full sm:w-64 flex-shrink-0`}
          aria-label="Product filters"
        >
          <div className="glass-card p-5 sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary-400" />
                Filters
              </h2>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  aria-label="Clear all filters"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-slate-300 text-sm font-semibold mb-3">Category</h3>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-primary-600/30 text-primary-300 border border-primary-500/50'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    aria-pressed={selectedCategory === cat}
                    id={`filter-category-${cat.toLowerCase()}`}
                  >
                    {cat}
                    <span className="text-xs text-slate-500">
                      {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-slate-300 text-sm font-semibold mb-3">
                Price Range
                <span className="text-slate-500 font-normal ml-2">
                  ${priceRange[0]} – ${priceRange[1]}
                </span>
              </h3>
              <input
                type="range"
                min="0"
                max="3500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-primary-500 cursor-pointer"
                aria-label="Maximum price filter"
                id="price-range-max"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>$0</span>
                <span>$3,500</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-slate-300 text-sm font-semibold mb-3">Minimum Rating</h3>
              <div className="space-y-1">
                {[4.5, 4.0, 3.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSortBy('rating')}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
                  >
                    <span className="text-accent-400">{'★'.repeat(Math.floor(r))}</span>
                    {r}+ stars
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProductCard product={product} onQuickView={setSelectedProduct} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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

export default Products;
