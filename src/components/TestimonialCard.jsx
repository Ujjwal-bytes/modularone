import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Quote, CheckCircle, ArrowRight } from 'lucide-react';

const TestimonialCard = ({ testimonial, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const cardVariants = {
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
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0, x: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 25, delay: 0.2 }
    }
  };

  const quoteVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: 5, 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.3 + (i * 0.05),
        type: "spring",
        stiffness: 400
      }
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, delay: 0.4 }
    }
  };

  const avatarVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05, 
      rotate: 3,
      transition: { duration: 0.3 }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 0.2, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="group relative flex flex-col bg-white transition-all duration-700 h-full p-2 rounded-3xl cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Architectural Project Frame */}
      {testimonial.projectImage && (
        <div className="relative aspect-[16/11] overflow-hidden bg-gray-50 rounded-2xl border border-gray-100 transition-all duration-700 group-hover:shadow-[0_30px_60px_-15px_rgba(26,42,79,0.15)] mb-8">
          <motion.img
            src={testimonial.projectImage}
            alt={`${testimonial.name}'s Completed Project`}
            className="w-full h-full object-cover"
            variants={imageVariants}
            initial="initial"
            whileHover="hover"
            loading="lazy"
          />
          
          {/* Subtle Overlay on Hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#1A2A4F]/60 via-[#1A2A4F]/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Location Badge */}
          <motion.div 
            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-white/50 shadow-sm text-[10px] font-black text-[#1A2A4F] tracking-widest uppercase"
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin size={10} className="text-[#C9A03D]" />
            <span>{testimonial.location}</span>
          </motion.div>

          {/* Success Badge */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute bottom-4 left-4"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="bg-[#C9A03D] text-white text-[9px] font-black px-3 py-1 rounded-full tracking-tighter uppercase flex items-center gap-1 shadow-lg">
                  <CheckCircle size={10} />
                  Project Delivered
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Project Button on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.button 
                className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 text-[9px] font-black text-[#1A2A4F] uppercase tracking-wider flex items-center gap-1 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.05 }}
              >
                View Project
                <ArrowRight size={10} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 2. Editorial Content Frame */}
      <motion.div 
        className="flex flex-col flex-1 px-4 relative"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Large Decorative Quote Icon */}
        <motion.div
          variants={quoteVariants}
          initial="initial"
          whileHover="hover"
          className="absolute -top-4 -left-2"
        >
          <Quote 
            size={40} 
            className="text-gray-50 group-hover:text-[#C9A03D]/10 transition-colors duration-500 -z-10" 
            fill="currentColor" 
          />
        </motion.div>

        {/* Rating Indicators */}
        <div className="flex items-center gap-1.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={starVariants}
              initial="hidden"
              animate="visible"
            >
              <Star
                size={12}
                className={`transition-all duration-500 ${
                  i < testimonial.rating 
                    ? 'fill-[#C9A03D] text-[#C9A03D] group-hover:scale-110' 
                    : 'text-gray-200'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* The Review Text */}
        <motion.blockquote 
          className="text-base md:text-lg text-[#1A2A4F] font-bold tracking-tight leading-snug mb-6 flex-1 group-hover:text-gray-700 transition-colors duration-500"
          whileHover={{ x: 3 }}
        >
          "{testimonial.review}"
        </motion.blockquote>

        {/* 3. Client Metadata */}
        <motion.div 
          className="flex items-center justify-between pt-5 border-t border-gray-100"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center gap-3">
            {testimonial.image && (
              <motion.div 
                className="relative"
                variants={avatarVariants}
                initial="initial"
                whileHover="hover"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-xl object-cover grayscale transition-all duration-700 group-hover:grayscale-0 border border-gray-100 shadow-sm"
                  loading="lazy"
                />
                <motion.div 
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#C9A03D] rounded-full border-2 border-white flex items-center justify-center"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className="w-1 h-1 bg-white rounded-full" />
                </motion.div>
              </motion.div>
            )}
            <div className="flex flex-col">
              <motion.h4 
                className="text-sm font-black text-[#1A2A4F] tracking-tight"
                whileHover={{ color: "#C9A03D" }}
              >
                {testimonial.name}
              </motion.h4>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-1">
                <CheckCircle size={8} className="text-[#C9A03D]" />
                Verified Owner
              </p>
            </div>
          </div>

          {/* Decorative Corner Detail */}
          <motion.div 
            className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#C9A03D] group-hover:bg-[#C9A03D]/5 transition-all"
            whileHover={{ scale: 1.1, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-gray-300 group-hover:bg-[#C9A03D] rounded-full"
              whileHover={{ scale: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Subtle border animation on hover */}
      <motion.div 
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="absolute inset-0 rounded-3xl border-2 border-[#C9A03D]/20"
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default React.memo(TestimonialCard);