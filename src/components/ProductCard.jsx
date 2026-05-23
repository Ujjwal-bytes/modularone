import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Layers, Ruler, Eye, CheckCircle } from 'lucide-react';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/localStorage';

const ProductCard = React.memo(({ product, index = 0 }) => {
  const [isWishlisted, setIsWishlisted] = useState(() => isInWishlist(product.id));
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('wishlist');

  // Sync wishlist status when product changes
  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [product.id]);

  // Notification timeout cleanup
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

  // Memoize notification content
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

  // Animation variants - memoized
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: index * 0.1
      }
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }), [index]);

  const imageVariants = useMemo(() => ({
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.6, ease: "easeOut" } }
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
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 25, delay: 0.2 }
    }
  }), []);

  const dotVariants = useMemo(() => ({
    initial: { width: 4, opacity: 0.4 },
    active: { 
      width: 20, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
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
              className="text-white px-6 py-3 rounded-full shadow-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3"
              style={{ backgroundColor: notification.bgColor }}
            >
              <NotificationIcon size={14} className="text-white" />
              {notification.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="group flex flex-col bg-white transition-all duration-700 relative cursor-pointer"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-50px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 1. Image Viewport */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-[2rem] border border-gray-100 transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(26,42,79,0.2)]">
          <motion.img
            src={product.images?.[currentImage]}
            alt={product.name}
            className="w-full h-full object-cover"
            variants={imageVariants}
            initial="initial"
            whileHover="hover"
            loading="lazy"
            width="400"
            height="500"
          />

          {/* Floating Category Tag */}
          <motion.div 
            className="absolute top-6 left-6 z-10"
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="bg-white/90 backdrop-blur-md text-[#1A2A4F] text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/50 shadow-sm">
              {product.category}
            </span>
          </motion.div>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistToggle}
            className={`absolute top-6 right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 ${
              isWishlisted 
                ? 'bg-[#1A2A4F] text-white shadow-lg' 
                : 'bg-white/80 backdrop-blur-md text-gray-400 hover:text-[#1A2A4F] hover:bg-white'
            } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={18} className={isWishlisted ? 'fill-white' : ''} />
          </motion.button>

          {/* Quick View Button - Commented out but kept for future use */}
          {/* <motion.button
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#1A2A4F] hover:bg-[#1A2A4F] hover:text-white transition-all duration-300 flex items-center gap-2 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            style={{ transform: 'translateX(-50%)' }}
          >
            <Eye size={12} />
            Quick View
          </motion.button> */}

          {/* Hover Overlay: Technical Specs Preview */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#1A2A4F]/95 via-[#1A2A4F]/40 to-transparent flex flex-col justify-end p-6"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div 
                  className="space-y-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-white/90">
                      <Layers size={14} className="text-[#C9A03D]" />
                      <span className="text-[10px] font-bold tracking-widest uppercase">{product.material}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <Ruler size={14} className="text-[#C9A03D]" />
                      <span className="text-[10px] font-bold tracking-widest uppercase">{product.thickness || 'Premium'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-[8px] font-bold uppercase tracking-wider">
                    <span>{product.finish} Finish</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{product.leadTime} Lead Time</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Pagination Dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 transition-all duration-500">
              {product.images.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={(e) => handleImageChange(i, e)}
                  className="h-1 rounded-full bg-white/60 focus:outline-none"
                  variants={dotVariants}
                  initial="initial"
                  animate={currentImage === i ? "active" : "initial"}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`View image ${i + 1} of ${product.images.length}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 2. Details Container */}
        <div className="pt-6 px-2 flex flex-col items-center text-center">
          <motion.h3 
            className="text-lg font-bold text-[#1A2A4F] tracking-tight group-hover:text-[#C9A03D] transition-colors duration-300"
            whileHover={{ x: 3 }}
          >
            {product.name}
          </motion.h3>
          
          <div className="flex items-center gap-3 mt-2 mb-5">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">{product.finish}</span>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[9px] font-bold text-[#C9A03D] uppercase tracking-[0.2em]">{product.leadTime}</span>
          </div>

          {/* Actions Section */}
          <div className="w-full flex items-center justify-end pt-5 border-t border-gray-100">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to={`/products/${product.id}`}
                className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#1A2A4F]"
                aria-label={`View ${product.name} details`}
              >
                <span className="hidden sm:inline">View</span>
                <motion.div 
                  className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center transition-all group-hover:bg-[#C9A03D] group-hover:text-white"
                  whileHover={{ x: 3 }}
                >
                  <ArrowRight size={14} />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Subtle border animation on hover */}
        <motion.div 
          className="absolute inset-0 rounded-[2rem] pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 rounded-[2rem] border-2 border-[#C9A03D]/30"
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;