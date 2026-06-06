import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { processMessage } from '../../chatbot/chatbotEngine.js';

const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
      <Bot className="w-4 h-4 text-white" />
    </div>
    <div className="bg-dark-700 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
      <div className="flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary-400"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  </div>
);

// Simple Markdown-like bold text renderer
const renderMessage = (text) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-primary-300 font-semibold">{part}</strong> : part
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Hi! I'm **ShopBot**, your AI shopping assistant! Ask me about products, prices, delivery, or returns!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate NLP processing delay
    setTimeout(() => {
      const { response } = processMessage(userMessage.text);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: response,
          timestamp: new Date(),
        },
      ]);
      if (!isOpen) setUnreadCount(prev => prev + 1);
    }, 800 + Math.random() * 600);
  }, [input, isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = ['Show me laptops', 'What\'s on sale?', 'Return policy', 'Shipping info'];

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 rounded-full shadow-2xl shadow-primary-600/40 flex items-center justify-center transition-all duration-200"
              aria-label="Open AI chat assistant"
              id="chatbot-open-btn"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-dark-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              {/* Ping animation */}
              <span className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 right-0 w-80 sm:w-96 h-[520px] bg-dark-800 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
              role="dialog"
              aria-label="ShopBot AI Assistant"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-700 to-primary-800 border-b border-white/10">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-dark-800" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">ShopBot AI</p>
                  <p className="text-primary-300 text-xs">Online · Always ready to help</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  aria-label="Close chat"
                  id="chatbot-close-btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" role="log" aria-live="polite" aria-label="Chat messages">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.type === 'bot' ? 'bg-primary-600' : 'bg-accent-500'
                    }`}>
                      {msg.type === 'bot'
                        ? <Bot className="w-4 h-4 text-white" />
                        : <User className="w-4 h-4 text-dark-900" />
                      }
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.type === 'user'
                        ? 'bg-primary-600 text-white rounded-br-sm'
                        : 'bg-dark-700 border border-white/10 text-slate-200 rounded-bl-sm'
                    }`}>
                      {renderMessage(msg.text)}
                    </div>
                  </motion.div>
                ))}

                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => {
                        setInput(reply);
                        setTimeout(() => handleSend(), 0);
                        // Directly process
                        const userMsg = { id: Date.now(), type: 'user', text: reply, timestamp: new Date() };
                        setMessages(prev => [...prev, userMsg]);
                        setIsTyping(true);
                        setTimeout(() => {
                          const { response } = processMessage(reply);
                          setIsTyping(false);
                          setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: response, timestamp: new Date() }]);
                        }, 900);
                      }}
                      className="text-xs bg-white/5 border border-white/10 hover:bg-primary-600/20 hover:border-primary-500/50 text-slate-300 hover:text-primary-300 px-2.5 py-1 rounded-full transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-dark-700 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                    aria-label="Type a message to ShopBot"
                    id="chatbot-input"
                    maxLength={200}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-10 h-10 flex-shrink-0 bg-primary-600 hover:bg-primary-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all active:scale-95"
                    aria-label="Send message"
                    id="chatbot-send-btn"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 text-center mt-2">Powered by Rule-Based NLP Engine</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Chatbot;
