"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // A slightly shorter, more confident duration for a fast, snappy reveal
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FDFDFC]"
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
          }}
        >
          <div className="flex flex-col items-center">
            {/* Brand Title with Letter Spacing */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-5xl font-light text-[#1A2A4F] tracking-[0.3em] uppercase"
            >
              Modular One
            </motion.h1>

            {/* Architectural Line Divider */}
            <motion.div 
              className="h-[1px] bg-[#C9A03D] mt-8"
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;