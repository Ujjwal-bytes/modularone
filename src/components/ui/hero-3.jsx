"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

const AnimatedMarqueeHero = ({
  tagline = "Premium Modular Furniture",
  title = "Crafting Dreams Into Reality",
  description = "Experience the perfect blend of luxury, functionality, and craftsmanship with our premium modular furniture solutions.",
  ctaText = "Explore Collection",
  images = [],
  backgroundImage = null,
  className = "",
  onCtaClick,
}) => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  return (
    <section
      className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Tagline */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <Sparkles size={14} className="text-[#C9A03D]" />
            <span className="text-sm font-medium text-white tracking-wide">
              {tagline}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          >
            {typeof title === 'string' ? title : title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp}>
            <button
              onClick={onCtaClick}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C9A03D] text-white font-semibold rounded-full shadow-lg hover:bg-[#B8922E] transition-all duration-300 transform hover:scale-105"
            >
              <span>{ctaText}</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
            Scroll
          </span>
          <ChevronDown size={20} className="text-white/60" />
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedMarqueeHero;