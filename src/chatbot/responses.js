// Response templates for each intent
export const responses = {
  greeting: [
    "👋 Hello! Welcome to ShopSmart AI! I'm your personal shopping assistant. How can I help you today?",
    "Hi there! 🛍️ Welcome to ShopSmart AI! Looking for something specific? I can help you find the perfect product!",
    "Hey! Great to see you at ShopSmart AI! 😊 Whether you're looking for electronics, fashion, or home decor — I've got you covered!",
  ],
  product_search: [
    "🔍 Great choice! You can browse our full electronics collection in the **Products** section. We have laptops, phones, headphones, and more!",
    "📱 Head over to the **Products** page and use the category filter to find exactly what you're looking for. We have 20+ curated products!",
    "💻 You'll find our top electronics picks right on the **Products** page. Use the search bar at the top for quick results!",
  ],
  fashion: [
    "👗 Check out our **Fashion** category on the Products page! We have sneakers, jeans, jackets, and more from top brands.",
    "👟 Our fashion collection features Nike, Adidas, Levi's, and Patagonia. Browse the **Fashion** filter on the Products page!",
    "🕶️ Style awaits! Head to the **Products** page and filter by **Fashion** or **Accessories** to see our curated picks.",
  ],
  home: [
    "🏠 Our **Home** category has everything — from Dyson vacuums to Nespresso machines and smart lighting! Visit the Products page.",
    "☕ Looking for home essentials? Check the **Home** section in our Products page for top-rated picks including Dyson, Philips Hue, and more!",
    "🛋️ We've got a fantastic Home collection! Filter by **Home** on the Products page to see furniture, appliances, and decor.",
  ],
  accessories: [
    "⌚ Our Accessories section features Apple Watch, Ray-Ban sunglasses, premium bags, and more! Check the Products page.",
    "👜 Great taste! Our Accessories collection includes smartwatches, sunglasses, and leather bags. Browse the **Accessories** filter!",
  ],
  pricing: [
    "💰 All prices are clearly displayed on each product card. We offer regular discounts — look for the **Sale** badge! You can also filter by price range.",
    "🏷️ Our products range from budget-friendly to premium. Use the **Price Filter** on the Products page to find items in your budget!",
    "💳 Great question! Prices are shown on every product card. Look for items with the **Sale** badge for the best deals on ShopSmart AI!",
  ],
  cart: [
    "🛒 Simply click **Add to Cart** on any product! Your cart saves automatically and you can view it anytime via the cart icon in the navbar.",
    "🛍️ Your shopping cart is always accessible via the top-right cart icon. Items are saved automatically even if you navigate away!",
    "✅ Adding to cart is easy! Click the **Add to Cart** button on any product. Your cart persists across sessions for a seamless experience.",
  ],
  delivery: [
    "🚚 This is a demo store, but in production: standard delivery takes 3-5 business days, and express shipping takes 1-2 days!",
    "📦 Delivery details: Standard shipping (3-5 days), Express (1-2 days), and Free shipping on orders over $50!",
    "🚀 Fast delivery available! Standard: 3-5 days | Express: 1-2 days | Free on orders $50+. (Demo simulation)",
  ],
  refund: [
    "↩️ Our return policy: 7-day easy replacement on all products. Just contact support with your order ID. No questions asked!",
    "✅ Hassle-free returns! You have **7 days** from delivery to return or exchange any product. Full refund guaranteed!",
    "🔄 Return & refund policy: 7-day replacement window, full refund processing in 3-5 business days. We value your satisfaction!",
  ],
  help: [
    "🤝 I'm here to help! You can ask me about: **Products, Pricing, Cart, Delivery, Returns**, or anything else about ShopSmart AI!",
    "💡 How can I assist? I can help you find products, check prices, understand our return policy, or navigate the store. Just ask!",
    "📚 I can help you with: finding products, pricing info, cart management, shipping details, and return policies. What do you need?",
  ],
  thanks: [
    "😊 You're very welcome! Happy shopping at ShopSmart AI! Is there anything else I can help you with?",
    "🎉 Glad I could help! Enjoy your shopping experience! Feel free to ask if you need anything else.",
    "✨ My pleasure! Happy to assist anytime. Enjoy browsing ShopSmart AI!",
  ],
  unknown: [
    "🤔 Hmm, I'm not sure about that. Try asking about: **products, pricing, cart, delivery, or returns** — I'm great at those!",
    "💬 I didn't quite catch that. I can help with product searches, pricing, cart questions, shipping, and return policies!",
    "🔮 That's a bit outside my expertise! Try asking about our **products, deals, delivery, or return policy** — I'll nail it!",
  ],
};

/**
 * Get a random response from an array of responses
 * @param {string} intentName - The detected intent name
 * @returns {string} - A response string
 */
export const getResponse = (intentName) => {
  const responseList = responses[intentName] || responses.unknown;
  return responseList[Math.floor(Math.random() * responseList.length)];
};
