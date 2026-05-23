"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

// Props interface for the component
const AnimatedMarqueeHero = ({
  tagline = "Premium Modular Furniture",
  title = "Crafting Dreams Into Reality",
  description = "Experience the perfect blend of luxury, functionality, and craftsmanship with our premium modular furniture solutions. Transform your space into a masterpiece.",
  ctaText = "Explore Collection",
  images = [],
  backgroundImage = null,
  className = "",
  onCtaClick,
}) => {
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section
      className={`relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4 py-20 ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Dark Overlay for better text readability */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40 z-0" />
      )}

      <div className={`z-10 flex flex-col items-center max-w-5xl mx-auto ${backgroundImage ? 'text-white' : ''}`}>
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium ${
            backgroundImage 
              ? 'border-white/30 bg-black/30 text-white' 
              : 'border-gray-200 bg-white/80 text-[#1A2A4F]'
          }`}
        >
          <Sparkles size={14} className="text-[#C9A03D]" />
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 ${
            backgroundImage ? 'text-white' : 'text-[#1A2A4F]'
          }`}
        >
          {typeof title === 'string' ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Description - Better spacing */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <p className={`text-base md:text-lg leading-relaxed ${
            backgroundImage ? 'text-white/90' : 'text-gray-600'
          }`}>
            {description}
          </p>
        </motion.div>

        {/* Call to Action Button - Better spacing */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-10 "
        >
          <button
            onClick={onCtaClick}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#1A2A4F] text-white font-semibold rounded-xl shadow-lg hover:bg-[#0E1A33] transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span>{ctaText}</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* Animated Image Marquee */}
      {images.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-48 md:h-64 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            className="flex gap-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] h-32 md:h-48 flex-shrink-0"
                style={{
                  rotate: `${(index % 2 === 0 ? -2 : 2)}deg`,
                }}
              >
                <img
                  src={src}
                  alt={`Furniture showcase ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className={`text-[8px] uppercase tracking-[0.3em] ${backgroundImage ? 'text-white/70' : 'text-gray-400'}`}>
            Scroll
          </span>
          <div className={`w-5 h-8 border rounded-full flex justify-center ${
            backgroundImage ? 'border-white/40' : 'border-gray-300'
          }`}>
            <motion.div 
              className={`w-0.5 h-2 rounded-full mt-2 ${
                backgroundImage ? 'bg-white/60' : 'bg-gray-400'
              }`}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedMarqueeHero;