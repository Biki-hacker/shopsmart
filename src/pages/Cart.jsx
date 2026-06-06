import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ShoppingCart, Tag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, cartTotal, cartCount, removeFromCart, updateQuantity, clearCart } = useCart();

  const shipping = cartTotal >= 50 ? 0 : 4.99;
  const tax = cartTotal * 0.08; // 8% tax
  const orderTotal = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        >
          <div className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <ShoppingCart className="w-14 h-14 text-slate-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Your cart is empty</h1>
          <p className="text-slate-400 mb-8 max-w-sm">
            Looks like you haven't added anything yet. Explore our products and find something you love!
          </p>
          <Link to="/products" className="btn-accent flex items-center gap-2" id="empty-cart-shop-btn">
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
          <p className="text-slate-400 mt-1">{cartCount} item{cartCount !== 1 ? 's' : ''} in your cart</p>
        </div>
        <Link
          to="/products"
          className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          id="continue-shopping-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item, i) => {
              const itemTotal = item.price * item.quantity;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-4 sm:p-6"
                  role="article"
                  aria-label={`${item.title} in cart`}
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link to={`/products/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl hover:opacity-90 transition-opacity"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-xs text-primary-400 font-medium">{item.category}</span>
                          <Link to={`/products/${item.id}`}>
                            <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-2 hover:text-primary-300 transition-colors">
                              {item.title}
                            </h3>
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 rounded-xl hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all flex-shrink-0"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span
                            className="w-8 text-center text-white font-bold text-sm"
                            aria-live="polite"
                            aria-label={`Quantity: ${item.quantity}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">${itemTotal.toFixed(2)}</p>
                          {item.quantity > 1 && (
                            <p className="text-slate-500 text-xs">${item.price.toFixed(2)} each</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            className="text-sm text-slate-500 hover:text-red-400 transition-colors flex items-center gap-2 mt-2"
            id="clear-cart-page-btn"
          >
            <Trash2 className="w-4 h-4" />
            Clear entire cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Subtotal ({cartCount} items)</span>
                <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  Shipping
                </span>
                <span className={shipping === 0 ? 'text-green-400 font-medium' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated Tax (8%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="input-field pl-9 text-sm py-2"
                      aria-label="Promo code"
                      id="promo-code-input"
                    />
                  </div>
                  <button
                    className="btn-secondary px-4 py-2 text-sm"
                    id="apply-promo-btn"
                    aria-label="Apply promo code"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-white/10 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-accent-400 font-black text-2xl">${orderTotal.toFixed(2)}</span>
              </div>
              {cartTotal < 50 && (
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>

            {/* Checkout Button */}
            <button
              className="btn-accent w-full flex items-center justify-center gap-2 mb-3"
              id="checkout-proceed-btn"
              onClick={() => alert('🎉 Checkout would proceed here in a real app!')}
            >
              <ShoppingBag className="w-5 h-5" />
              Proceed to Checkout
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>🔒 Secure checkout</span>
              <span>·</span>
              <span>SSL encrypted</span>
            </div>

            {/* Accepted Payments */}
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
              {['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay'].map(method => (
                <span
                  key={method}
                  className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
