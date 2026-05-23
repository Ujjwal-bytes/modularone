import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Send, ArrowRight } from 'lucide-react';
import { getQuoteCart, removeFromQuoteCart, clearQuoteCart } from '../utils/localStorage';
import { products } from '../data/products';

export default function QuoteCart() {
  const [quoteCart, setQuoteCart] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setQuoteCart(getQuoteCart());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setQuoteCart(getQuoteCart());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleRemove = (productId) => {
    removeFromQuoteCart(productId);
    setQuoteCart(getQuoteCart());
  };

  const handleClearAll = () => {
    clearQuoteCart();
    setQuoteCart([]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      clearQuoteCart();
      setQuoteCart([]);
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  const quoteCartProducts = products.filter(p => quoteCart.some(q => parseInt(q.id) === parseInt(p.id)));
  const totalProducts = quoteCartProducts.length;

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Quote Cart | Modular One</title>
        <meta name="description" content="View your quote cart and request a quote." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quote Cart
          </h1>
          <p className="text-gray-600">
            {totalProducts} {totalProducts === 1 ? 'item' : 'items'} in your quote cart
          </p>
        </div>

        {totalProducts === 0 && !submitted ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your quote cart is empty</h3>
            <p className="text-gray-600 mb-6">Add products to get a quote</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A03D] text-white font-medium rounded-lg hover:bg-[#DDB45E] transition-colors"
            >
              Browse Products <ArrowRight size={20} />
            </Link>
          </div>
        ) : submitted ? (
          <div className="text-center py-20 bg-green-50 rounded-2xl">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Sent!</h3>
            <p className="text-gray-600 mb-6">We'll get back to you within 24 hours</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2A4F] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue Shopping <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Products</h2>
                <button
                  onClick={handleClearAll}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Clear All
                </button>
              </div>

              {quoteCartProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-4 border border-gray-100 flex gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Request Quote</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A03D] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A03D] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A03D] transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A03D] transition-colors resize-none"
                      placeholder="Any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#C9A03D] text-white font-medium rounded-lg hover:bg-[#DDB45E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send size={20} />
                        Submit Quote Request
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
