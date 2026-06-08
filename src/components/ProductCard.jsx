import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Ruler, Eye, CheckCircle, Award, Shield, Truck } from 'lucide-react';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/localStorage';

const ProductCard = React.memo(({ product, index = 0 }) => {
  const [isWishlisted, setIsWishlisted] = useState(() => isInWishlist(product.id));
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('wishlist');

  // Fixed: Random label based on product id (works for both string and number)
  const productLabels = useMemo(() => {
    const labels = [
      { text: "Handcrafted", icon: Award, color: "#C9A03D" },
      { text: "Premium", icon: Shield, color: "#1A2A4F" },
      { text: "Eco Friendly", icon: CheckCircle, color: "#2E7D32" },
      { text: "Best Seller", icon: Award, color: "#C9A03D" },
      { text: "Limited Edition", icon: Award, color: "#C9A03D" },
      { text: "Ready to Ship", icon: Truck, color: "#1A2A4F" }
    ];
    
    // Fixed: Convert id to string safely for consistent label
    const idString = String(product.id || index);
    let hash = 0;
    for (let i = 0; i < idString.length; i++) {
      hash = ((hash << 5) - hash) + idString.charCodeAt(i);
      hash = hash & hash;
    }
    const randomIndex = Math.abs(hash) % labels.length;
    return labels[randomIndex];
  }, [product.id, index]);

  const LabelIcon = productLabels.icon;

  // Sync wishlist status
  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [product.id]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleWishlistToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
      setNotificationType('removed');
    } else {
      addToWishlist(product);
      setIsWishlisted(true);
      setNotificationType('wishlist');
    }
    setShowNotification(true);
  }, [isWishlisted, product]);

  const handleImageChange = useCallback((index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(index);
  }, []);

  const notification = useMemo(() => {
    switch(notificationType) {
      case 'wishlist':
        return { icon: Heart, text: 'Added to Wishlist', bgColor: '#C9A03D' };
      case 'removed':
        return { icon: CheckCircle, text: 'Removed from Wishlist', bgColor: '#4A5568' };
      default:
        return { icon: Heart, text: 'Added to Wishlist', bgColor: '#C9A03D' };
    }
  }, [notificationType]);

  const NotificationIcon = notification.icon;

  // Animation variants
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: index * 0.05
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }), [index]);

  const imageVariants = useMemo(() => ({
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.5, ease: "easeOut" } }
  }), []);

  const overlayVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }), []);

  const buttonVariants = useMemo(() => ({
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  }), []);

  const badgeVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { delay: 0.1, duration: 0.3 }
    }
  }), []);

  const notificationVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  }), []);

  const hasMultipleImages = product.images?.length > 1;

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]"
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div 
              className="text-white px-6 py-3 shadow-2xl text-xs font-semibold tracking-wide flex items-center gap-3"
              style={{ backgroundColor: notification.bgColor }}
            >
              <NotificationIcon size={16} className="text-white" />
              {notification.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="group flex flex-col bg-white transition-all duration-500 relative cursor-pointer"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-50px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container - No border-radius */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 border border-gray-100 transition-all duration-500 group-hover:shadow-xl">
          <motion.img
            src={product.images?.[currentImage]}
            alt={product.name}
            className="w-full h-full object-cover"
            variants={imageVariants}
            initial="initial"
            whileHover="hover"
            loading="lazy"
          />

          {/* Product Label Badge - Replaces Series/NaN */}
          <motion.div 
            className="absolute top-4 left-4 z-10"
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
          >
            {/* <div 
              className="flex items-center gap-1.5 px-3 py-1.5 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg"
              style={{ backgroundColor: productLabels.color }}
            >
              <LabelIcon size={10} />
              <span>{productLabels.text}</span>
            </div> */}
          </motion.div>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistToggle}
            className={`absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center transition-all duration-300 bg-white shadow-md ${
              isWishlisted 
              ? 'bg-[#C9A03D] text-white' 
              : 'text-[#1A2A4F] hover:bg-[#C9A03D] hover:text-white'
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={16} className={isWishlisted ? "fill-white" : ""} />
          </motion.button>

          {/* Hover Overlay - Product Specs */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-black/70 flex flex-col justify-end p-5"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div 
                  className="space-y-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <p className="text-white text-[11px] font-medium">{product.description?.substring(0, 80)}...</p>
                  <div className="flex gap-3 pt-2">
                    <div className="flex items-center gap-1.5">
                      <Ruler size={12} className="text-[#C9A03D]" />
                      <span className="text-white/80 text-[10px]">{product.material || 'Premium Material'}</span>
                    </div>
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 text-[#C9A03D] text-[10px] font-semibold uppercase tracking-wider mt-2"
                  >
                    View Details <ArrowRight size={12} />
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Pagination Dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={(e) => handleImageChange(i, e)}
                  className={`h-0.5 transition-all ${
                    currentImage === i ? 'w-6 bg-[#C9A03D]' : 'w-2 bg-white/60'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details - No Price, No Series */}
        <div className="pt-4 px-2 flex flex-col items-center text-center">
          {/* Category Chip */}
          <div className="mb-2">
            <span className="inline-block px-2.5 py-0.5 bg-[#1A2A4F]/5 text-[#1A2A4F] text-[8px] font-semibold uppercase tracking-wider">
              {product.category || 'Furniture'}
            </span>
          </div>
          
          {/* Product Name */}
          <motion.h3 
            className="text-base font-semibold text-[#1A2A4F] tracking-tight group-hover:text-[#C9A03D] transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            {product.name}
          </motion.h3>
          
          {/* Product Meta - Finish & Lead Time */}
          <div className="flex items-center gap-2 mt-1.5 mb-3">
            <span className="text-[8px] font-medium text-gray-400 uppercase tracking-wider">
              {product.finish || 'Matte'}
            </span>
            <div className="w-0.5 h-0.5 bg-gray-300" />
            <span className="text-[8px] font-medium text-[#C9A03D] uppercase tracking-wider">
              {product.leadTime || 'In Stock'}
            </span>
          </div>

          {/* View Details Button */}
          <div className="w-full pt-3 border-t border-gray-100">
            <Link
              to={`/products/${product.id}`}
              className="flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-wider text-[#1A2A4F] hover:text-[#C9A03D] transition-colors"
            >
              <span>View Details</span>
              <motion.div
                whileHover={{ x: 3 }}
              >
                <ArrowRight size={12} />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;