import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWA from './FloatingWA';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPageLoading(true);
    
    const timer = setTimeout(() => setIsPageLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Furniture themed loader variants
  const loaderContainerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const furnitureIconVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }
    },
    exit: { 
      scale: 0, 
      rotate: 180,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const lineVariants = {
    initial: { width: "0%", opacity: 0 },
    animate: (i) => ({ 
      width: "100%", 
      opacity: 1,
      transition: { 
        delay: 0.3 + (i * 0.1),
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    exit: { 
      width: "0%", 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const dotVariants = {
    initial: { scale: 0, y: 0 },
    animate: (i) => ({
      scale: [0, 1.2, 1],
      y: [0, -10, 0],
      transition: {
        delay: 0.5 + (i * 0.15),
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse"
      }
    })
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.6,
        duration: 0.4 
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const furnitureTags = ["Crafting", "Designing", "Building", "Creating"];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Progress Bar - Furniture themed */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1A2A4F] via-[#C9A03D] to-[#1A2A4F] z-[200]"
            initial={{ width: "0%" }}
            animate={{ 
              width: "100%",
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
            exit={{ 
              width: "0%",
              transition: { duration: 0.3 }
            }}
          />
        )}
      </AnimatePresence>

      {/* Furniture Style Loader Overlay */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            className="fixed inset-0 bg-white z-[199] flex items-center justify-center"
            variants={loaderContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="text-center">
              {/* Animated Furniture Icon */}
              <motion.div
                variants={furnitureIconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-6 flex justify-center"
              >
                <div className="relative">
                  {/* Chair/Sofa Icon SVG */}
                  <svg 
                    width="64" 
                    height="64" 
                    viewBox="0 0 64 64" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16"
                  >
                    <motion.rect 
                      x="12" y="32" width="40" height="20" rx="2" 
                      fill="#1A2A4F"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                    <motion.rect 
                      x="16" y="12" width="32" height="22" rx="2" 
                      fill="#C9A03D"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    />
                    <motion.rect 
                      x="20" y="52" width="6" height="8" rx="1" 
                      fill="#1A2A4F"
                      initial={{ height: 0 }}
                      animate={{ height: 8 }}
                      transition={{ delay: 0.4 }}
                    />
                    <motion.rect 
                      x="38" y="52" width="6" height="8" rx="1" 
                      fill="#1A2A4F"
                      initial={{ height: 0 }}
                      animate={{ height: 8 }}
                      transition={{ delay: 0.45 }}
                    />
                    <motion.circle 
                      cx="32" cy="28" r="4" 
                      fill="#E8D5B5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Animated Lines - Furniture style */}
              <div className="w-48 mx-auto mb-4 space-y-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={lineVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="h-0.5 bg-gradient-to-r from-[#1A2A4F] via-[#C9A03D] to-transparent"
                  />
                ))}
              </div>

              {/* Rotating Dots */}
              <div className="flex justify-center gap-3 mb-4">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={dotVariants}
                    initial="initial"
                    animate="animate"
                    className="w-2 h-2 rounded-full bg-[#C9A03D]"
                  />
                ))}
              </div>

              {/* Animated Text */}
              <motion.p
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-[#1A2A4F] text-sm font-light tracking-wider"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✦
                </motion.span>{" "}
                Crafting Your Space{" "}
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  ✦
                </motion.span>
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <motion.main 
        className="flex-grow relative"
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </motion.main>
      
      <Footer />
      <FloatingWA />
    </div>
  );
};

export default Layout;