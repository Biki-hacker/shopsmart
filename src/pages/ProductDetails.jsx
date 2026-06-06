import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, ShoppingCart, ArrowLeft, Share2, Heart,
  Truck, Shield, RefreshCw, Check, ChevronRight, Minus, Plus
} from 'lucide-react';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard/ProductCard';
import { useCart } from '../context/CartContext';

const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= Math.floor(rating) ? 'text-accent-400 fill-accent-400'
            : star - 0.5 <= rating ? 'text-accent-400 fill-accent-400/50'
            : 'text-slate-600'
          }`}
        />
      ))}
    </div>
    <span className="text-white font-semibold">{rating}</span>
    <span className="text-slate-400 text-sm">({reviews?.toLocaleString()} reviews)</span>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const product = products.find(p => p.id === parseInt(id));
  const inCart = cart.find(item => item.id === product?.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 pt-28 pb-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Product not found</h1>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </main>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 pt-4" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/products" className="hover:text-white transition-colors">Products</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/products?category=${product.category}`} className="hover:text-white transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Product Grid */}
      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden bg-dark-800 border border-white/10 aspect-square">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.badge && (
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  product.badge === 'Sale' || product.badge === 'Hot' ? 'bg-red-500 text-white'
                  : product.badge === 'New' ? 'bg-primary-500 text-white'
                  : 'bg-accent-500 text-dark-900'
                }`}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-bold px-3 py-1 rounded-full bg-green-500 text-white">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="absolute top-4 right-4 p-3 rounded-2xl bg-dark-900/60 backdrop-blur-sm hover:bg-dark-900/80 transition-all"
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'text-red-400 fill-red-400' : 'text-white'}`} />
            </button>
          </div>

          {/* Thumbnail Row (simulated) */}
          <div className="flex gap-3 mt-4">
            {[product.image].concat([
              'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=100&h=100&fit=crop',
              'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=100&h=100&fit=crop',
            ]).slice(0, 3).map((img, i) => (
              <button
                key={i}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  i === 0 ? 'border-primary-500' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="text-primary-400 font-medium text-sm mb-2 uppercase tracking-widest">
            {product.category}
          </span>

          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {product.title}
          </h1>

          <StarRating rating={product.rating} reviews={product.reviews} />

          {/* Price */}
          <div className="flex items-baseline gap-4 mt-6 mb-6">
            <span className="text-4xl font-black text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-green-400 font-semibold">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-300 leading-relaxed mb-6">{product.description}</p>

          {/* Features */}
          {product.features && (
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-slate-400 text-sm font-medium">Quantity:</label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-white font-bold" aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {inCart && (
              <span className="text-xs text-primary-400">
                ({inCart.quantity} already in cart)
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all ${
                added ? 'bg-green-500 text-white' : 'btn-accent'
              }`}
              id={`detail-add-to-cart-${product.id}`}
            >
              <ShoppingCart className="w-5 h-5" />
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              className="flex-1 btn-primary flex items-center justify-center gap-2 py-4"
              onClick={() => alert('🚀 Buy Now would go to checkout in a real app!')}
              id={`buy-now-${product.id}`}
            >
              Buy Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { Icon: Truck, title: 'Free Shipping', desc: 'Orders $50+' },
              { Icon: Shield, title: 'Secure', desc: 'SSL Protected' },
              { Icon: RefreshCw, title: '7-Day Returns', desc: 'Easy process' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="glass-card p-3 text-center">
                <Icon className="w-5 h-5 text-primary-400 mx-auto mb-1.5" />
                <p className="text-white text-xs font-semibold">{title}</p>
                <p className="text-slate-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section aria-label="Related Products">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Related Products</h2>
            <Link
              to={`/products?category=${product.category}`}
              className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetails;
