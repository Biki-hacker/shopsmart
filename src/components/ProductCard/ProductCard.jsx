import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye, Heart, Badge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating)
              ? 'text-accent-400 fill-accent-400'
              : star - 0.5 <= rating
              ? 'text-accent-400 fill-accent-400/50'
              : 'text-slate-600'
          }`}
        />
      ))}
    </div>
  );
};

const ProductCard = memo(({ product }) => {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const inCart = cart.some(item => item.id === product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative glass-card overflow-hidden cursor-pointer"
      role="article"
      aria-label={`${product.title} - $${product.price}`}
    >
      <Link to={`/products/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-dark-700 aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick View Button */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="flex items-center gap-1.5 bg-white/90 text-dark-900 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
              <Eye className="w-3 h-3" />
              Quick View
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                product.badge === 'Sale' || product.badge === 'Hot'
                  ? 'bg-red-500 text-white'
                  : product.badge === 'New'
                  ? 'bg-primary-500 text-white'
                  : product.badge === 'Best Seller' || product.badge === 'Popular'
                  ? 'bg-accent-500 text-dark-900'
                  : 'bg-white/20 text-white backdrop-blur-sm'
              }`}>
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500 text-white">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-dark-900/50 backdrop-blur-sm hover:bg-dark-900/80 transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${wishlisted ? 'text-red-400 fill-red-400' : 'text-white'}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white mt-1 mb-2 line-clamp-2 leading-snug group-hover:text-primary-300 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-xs text-slate-400">
              {product.rating} ({product.reviews?.toLocaleString()})
            </span>
          </div>

          {/* Price Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            added
              ? 'bg-green-500 text-white'
              : inCart
              ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30 hover:bg-primary-600 hover:text-white'
              : 'bg-primary-600 hover:bg-primary-500 text-white active:scale-95'
          }`}
          aria-label={`Add ${product.title} to cart`}
          id={`add-to-cart-${product.id}`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? '✓ Added!' : inCart ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
