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
    
    // Simulate page load (remove if you have actual data loading)
    const timer = setTimeout(() => setIsPageLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing curve
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.4
      }
    }
  };

  const loaderVariants = {
    initial: { scale: 0, opacity: 0, rotate: 0 },
    animate: { 
      scale: [0, 1.2, 1], 
      opacity: 1,
      rotate: [0, 360],
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const progressBarVariants = {
    initial: { width: "0%" },
    animate: { 
      width: "100%",
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: { 
      width: "0%",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Loading Progress Bar */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1A2A4F] via-[#C9A03D] to-[#1A2A4F] z-[200]"
            variants={progressBarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ originX: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Page Loader Overlay (Optional) */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[199] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              variants={loaderVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-12 h-12 rounded-full border-4 border-[#1A2A4F] border-t-[#C9A03D]"
              style={{ borderTopColor: "#C9A03D" }}
            />
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
        {/* Page Transition Overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + "-overlay"}
            className="fixed inset-0 bg-gradient-to-r from-[#1A2A4F]/5 to-transparent pointer-events-none z-0"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 0, x: "-100%" }}
            exit={{ opacity: 1, x: "0%", transition: { duration: 0.4, ease: "easeInOut" } }}
          />
        </AnimatePresence>

        {/* Page Content with Animation */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
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