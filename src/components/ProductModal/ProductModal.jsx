import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Star, Share2, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-accent-400 fill-accent-400' : 'text-slate-600'}`}
      />
    ))}
    <span className="text-slate-400 text-sm ml-1">{rating}</span>
  </div>
);

const ProductModal = ({ product, onClose }) => {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = cart.some(item => item.id === product?.id);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-label={`Product details: ${product.title}`}
        aria-modal="true"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-dark-800 border border-white/10 rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-square md:aspect-auto bg-dark-700">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-12 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col">
              <span className="text-xs text-primary-400 font-medium uppercase tracking-wider mb-2">
                {product.category}
              </span>
              <h2 className="text-xl font-bold text-white mb-3 leading-snug">{product.title}</h2>

              <StarRating rating={product.rating} />
              <p className="text-slate-500 text-xs mt-1 mb-4">{product.reviews?.toLocaleString()} reviews</p>

              <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">
                {product.description}
              </p>

              {/* Features */}
              {product.features && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.features.map((f) => (
                    <span key={f} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-slate-300">
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-slate-500 line-through text-lg">${product.originalPrice.toFixed(2)}</span>
                )}
                {discount > 0 && (
                  <span className="text-green-400 text-sm font-semibold">Save {discount}%</span>
                )}
              </div>

              <button
                onClick={handleAdd}
                className={`btn-primary flex items-center justify-center gap-2 mb-3 ${added ? '!bg-green-500' : ''}`}
                id={`modal-add-to-cart-${product.id}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {added ? '✓ Added to Cart!' : inCart ? 'Add More' : 'Add to Cart'}
              </button>

              <Link
                to={`/products/${product.id}`}
                onClick={onClose}
                className="btn-secondary flex items-center justify-center gap-2 text-sm"
              >
                View Full Details
              </Link>

              <p className="text-xs text-slate-500 mt-4 text-center">
                🚚 Free shipping on orders over $50 · 7-day easy returns
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-dark-900/80 hover:bg-dark-900 text-slate-400 hover:text-white transition-all"
            aria-label="Close product modal"
            id="close-product-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
