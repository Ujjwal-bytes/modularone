import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWA() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  let scrollTimeout;

  const phoneNumber = "919876543210"; // Replace with your actual phone number
  const message = encodeURIComponent("Hi Modular One, I am looking for a quote on premium interior layouts.");

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Hide button while scrolling, show when stopped
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Animation variants
  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.5
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Pulse ring animation */}
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 rounded-full bg-green-500"
            style={{ filter: 'blur(8px)' }}
          />
          
          {/* Main button */}
          <motion.button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="relative group cursor-pointer"
            aria-label="Chat on WhatsApp"
          >
            {/* Gradient background on hover */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
            />
            
            {/* Button content */}
            <div className="relative bg-white group-hover:bg-transparent rounded-full shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 px-5 py-3">
                {/* WhatsApp Icon with animation */}
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  className="relative"
                >
                  <svg 
                    className="w-5 h-5 text-green-600 group-hover:text-white transition-colors duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.148-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.5 3.65 1.38 5.17l-1.45 4.19 4.33-1.38C7.29 20.81 9.56 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.56 0-3.03-.45-4.28-1.23l-.31-.19-2.57.82.87-2.47-.2-.33C5.21 15.31 4.5 13.71 4.5 12c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z"/>
                  </svg>
                  
                  {/* Small notification dot */}
                  <motion.div 
                    className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
                
                {/* Text */}
                <motion.span 
                  className="hidden sm:inline text-sm font-semibold tracking-wide text-gray-700 group-hover:text-white transition-colors duration-300"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  Chat on WhatsApp
                </motion.span>
                
                {/* Arrow icon */}
                <motion.svg 
                  className="w-4 h-4 text-green-600 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </div>
            </div>
          </motion.button>
          
          {/* Tooltip notification on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute bottom-full right-0 mb-3"
                variants={tooltipVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    💬
                  </motion.span>
                  {' '}Get a free quote!
                  <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}