import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, CheckCircle, XCircle, Download, ShoppingCart, Phone, ArrowRight, Heart, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';
import { addToWishlist, removeFromWishlist, isInWishlist, addToQuoteCart, isInQuoteCart } from '../utils/localStorage';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [inQuoteCart, setInQuoteCart] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      setIsWishlisted(isInWishlist(product.id));
      setInQuoteCart(isInQuoteCart(product.id));
    }
  }, [product]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (product) {
        setIsWishlisted(isInWishlist(product.id));
        setInQuoteCart(isInQuoteCart(product.id));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [product]);

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-[#C9A03D] hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
    } else {
      addToWishlist(product);
      setIsWishlisted(true);
    }
  };

  const handleAddToQuote = () => {
    addToQuoteCart(product);
    setInQuoteCart(true);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name}. Please share more details.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{product.name} | Modular One</title>
        <meta name="description" content={product.name} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-[#C9A03D] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-medium text-[#C9A03D] uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>


            {/* Specifications Table */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700 w-1/3">Material</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.material}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Finish</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.finish}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Thickness</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.thickness}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Hardware</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.hardware}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Warranty</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.warranty}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Lead Time</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.leadTime}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Customization</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.customization ? 'Yes (Size, Color, Layout)' : 'No'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700">Dimensions</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.dimensions}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#C9A03D] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Included / Not Included */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-green-800 mb-3">Included</h4>
                <ul className="space-y-2">
                  {product.included.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-green-700">
                      <CheckCircle size={12} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-red-800 mb-3">Not Included</h4>
                <ul className="space-y-2">
                  {product.excluded.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-red-700">
                      <XCircle size={12} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToQuote}
                  disabled={inQuoteCart}
                  className={`flex-1 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                    inQuoteCart
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-[#C9A03D] text-white hover:bg-[#DDB45E]'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {inQuoteCart ? 'Added to Quote' : 'Get Quote'}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#C9A03D] transition-colors"
                >
                  <Heart
                    size={24}
                    className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                  />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  WhatsApp
                </button>
                <button className="py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Download size={18} />
                  Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-soft transition-shadow">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full aspect-[4/3] object-cover rounded-lg mb-3"
                    loading="lazy"
                  />
                  <h4 className="font-semibold text-gray-900 mb-1">{relatedProduct.name}</h4>
                  <Link
                    to={`/products/${relatedProduct.id}`}
                    className="text-[#C9A03D] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
