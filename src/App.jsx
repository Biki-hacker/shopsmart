import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Chatbot from './components/Chatbot/Chatbot';

// Lazy-load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin" />
      <p className="text-slate-400 text-sm">Loading...</p>
    </div>
  </div>
);

// Page transition wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            </PageWrapper>
          }
        />
        <Route
          path="/products"
          element={
            <PageWrapper>
              <Suspense fallback={<PageLoader />}>
                <Products />
              </Suspense>
            </PageWrapper>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PageWrapper>
              <Suspense fallback={<PageLoader />}>
                <ProductDetails />
              </Suspense>
            </PageWrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <PageWrapper>
              <Suspense fallback={<PageLoader />}>
                <Cart />
              </Suspense>
            </PageWrapper>
          }
        />
        {/* 404 */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <p className="text-8xl font-black text-white/10 mb-4">404</p>
                <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
                <p className="text-slate-400 mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-dark-900 flex flex-col">
          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-1">
            <AnimatedRoutes />
          </div>

          {/* Footer */}
          <Footer />

          {/* Floating AI Chatbot */}
          <Chatbot />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
