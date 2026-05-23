import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { getWishlist, removeFromWishlist } from '../utils/localStorage';
import { products } from '../data/products';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setWishlist(getWishlist());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    setWishlist(getWishlist());
  };


  const wishlistProducts = products.filter(p => wishlist.some(w => parseInt(w.id) === parseInt(p.id)));

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Wishlist | Modular One</title>
        <meta name="description" content="View your saved products and get quotes." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <Heart size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Save your favorite products to view them later</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A03D] text-white font-medium rounded-lg hover:bg-[#DDB45E] transition-colors"
            >
              Browse Products <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A03D] hover:shadow-soft transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-medium text-[#C9A03D] uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.material} • {product.finish}
                  </p>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
