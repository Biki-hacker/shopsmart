// Chatbot intent definitions with keyword patterns
export const intents = [
  {
    name: 'greeting',
    patterns: ['hello', 'hi', 'hey', 'howdy', 'greetings', 'good morning', 'good afternoon', 'good evening', 'what\'s up', 'whats up'],
  },
  {
    name: 'product_search',
    patterns: ['laptop', 'phone', 'headphone', 'electronics', 'computer', 'tablet', 'ipad', 'macbook', 'samsung', 'apple', 'sony', 'camera', 'speaker', 'mouse', 'keyboard', 'monitor', 'show me', 'find', 'search', 'looking for', 'show products'],
  },
  {
    name: 'fashion',
    patterns: ['fashion', 'clothes', 'clothing', 'shoes', 'sneakers', 'jacket', 'jeans', 'shirt', 'dress', 'outfit', 'wear', 'style', 'apparel', 'boots', 'footwear'],
  },
  {
    name: 'home',
    patterns: ['home', 'furniture', 'kitchen', 'vacuum', 'coffee', 'candle', 'lamp', 'shelf', 'decor', 'house', 'living', 'bedroom', 'appliance'],
  },
  {
    name: 'accessories',
    patterns: ['accessory', 'accessories', 'watch', 'bag', 'sunglasses', 'glasses', 'jewel', 'wallet'],
  },
  {
    name: 'pricing',
    patterns: ['price', 'cost', 'cheap', 'expensive', 'affordable', 'discount', 'deal', 'offer', 'sale', 'budget', 'how much', 'pricing'],
  },
  {
    name: 'cart',
    patterns: ['cart', 'checkout', 'buy', 'purchase', 'order', 'shopping cart', 'add to cart', 'basket', 'buying'],
  },
  {
    name: 'delivery',
    patterns: ['delivery', 'shipping', 'arrival', 'ship', 'deliver', 'dispatch', 'track', 'tracking', 'when will', 'how long'],
  },
  {
    name: 'refund',
    patterns: ['refund', 'return', 'cancel', 'exchange', 'replacement', 'policy', 'money back', 'warranty', 'guarantee'],
  },
  {
    name: 'help',
    patterns: ['help', 'support', 'assist', 'guide', 'how to', 'how do', 'tutorial', 'instructions'],
  },
  {
    name: 'thanks',
    patterns: ['thanks', 'thank you', 'thank', 'appreciate', 'great', 'awesome', 'perfect', 'nice'],
  },
];
