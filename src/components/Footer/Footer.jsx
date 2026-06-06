import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Instagram, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Shop: [
      { label: 'All Products', to: '/products' },
      { label: 'Electronics', to: '/products?category=Electronics' },
      { label: 'Fashion', to: '/products?category=Fashion' },
      { label: 'Home & Living', to: '/products?category=Home' },
      { label: 'Accessories', to: '/products?category=Accessories' },
    ],
    Support: [
      { label: 'Help Center', to: '#' },
      { label: 'Track Order', to: '#' },
      { label: 'Returns & Refunds', to: '#' },
      { label: 'Contact Us', to: '#' },
    ],
    Company: [
      { label: 'About Us', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Press', to: '#' },
      { label: 'Blog', to: '#' },
    ],
  };

  const socialLinks = [
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Github, href: '#', label: 'GitHub' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-dark-800 border-t border-white/10 mt-20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="py-12 border-b border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Stay in the loop</h3>
              <p className="text-slate-400 text-sm">Get notified about exclusive deals and new arrivals</p>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
              role="form"
              aria-label="Newsletter subscription"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field max-w-xs"
                aria-label="Email address for newsletter"
                id="newsletter-email"
              />
              <button
                type="submit"
                className="btn-accent flex items-center gap-2 whitespace-nowrap"
                id="newsletter-submit"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-white">
                Shop<span className="text-primary-400">Smart</span>
                <span className="text-accent-400 ml-1 text-sm font-semibold">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              The smartest way to shop online. AI-powered recommendations, curated collections, and unbeatable prices.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:pl-1 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 ShopSmart AI. All rights reserved. Built for hackathon.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
