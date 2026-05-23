import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Sparkles } from 'lucide-react';
import { Utensils, Shirt, Briefcase, Sofa, Bed, Frame } from 'lucide-react';

// Icon mapping
const iconMap = {
  'Utensils': Utensils,
  'Shirt': Shirt,
  'Briefcase': Briefcase,
  'Sofa': Sofa,
  'Bed': Bed,
  'Frame': Frame,
};

// Category-specific background images
const categoryBackgrounds = {
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop",
  wardrobe: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&h=800&fit=crop",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
  living: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
  bedroom: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&h=800&fit=crop",
  doors: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=800&fit=crop",
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const iconVariants = {
  initial: { rotate: 0, scale: 1 },
  hover: { rotate: 10, scale: 1.05, transition: { duration: 0.3 } }
};

const arrowVariants = {
  initial: { x: 0 },
  hover: { 
    x: 5, 
    transition: { 
      duration: 0.2, 
      repeat: Infinity, 
      repeatType: "reverse" 
    } 
  }
};

const CategoryCard = React.memo(({ category, index }) => {
  const Icon = useMemo(() => iconMap[category.icon] || Sofa, [category.icon]);
  const displayIndex = useMemo(() => String(index + 1).padStart(2, '0'), [index]);
  
  const imageUrl = useMemo(() => {
    return categoryBackgrounds[category.id] || categoryBackgrounds.kitchen;
  }, [category.id]);

  const cardVariantWithDelay = useMemo(() => ({
    ...cardVariants,
    visible: {
      ...cardVariants.visible,
      transition: {
        ...cardVariants.visible.transition,
        delay: index * 0.1
      }
    }
  }), [index]);

  return (
    <motion.div
      variants={cardVariantWithDelay}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Link
        to={`/products?category=${category.id}`}
        className="group relative block w-full h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer"
        aria-label={`View ${category.name} products`}
      >
        {/* Background Image - Full Cover with object-cover */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={imageUrl} 
            alt={category.name}
            className="w-full h-full object-cover"
          />
          
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          
          {/* Decorative Large Background Index Number */}
          <motion.span 
            className="absolute -right-4 -bottom-10 text-[18rem] font-black text-white/10 select-none pointer-events-none"
            initial={{ opacity: 0.4 }}
            whileHover={{ opacity: 0.2, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            {displayIndex}
          </motion.span>
        </div>

        {/* Content - Positioned absolutely over the background */}
        <div className="relative z-10 flex flex-col justify-between w-full h-full p-8">
          {/* Top Meta Data */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-4">
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/50 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-[#1A2A4F]"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
              >
                <Icon 
                  size={32} 
                  className="text-[#1A2A4F] transition-colors duration-500 group-hover:text-white" 
                  strokeWidth={1.2} 
                />
              </motion.div>
              
              <div className="flex items-center gap-2">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-[#C9A03D]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[10px] font-bold tracking-widest text-[#C9A03D] uppercase">Active Series</span>
              </div>
            </div>
            
            <motion.span 
              className="text-[11px] font-black tracking-[0.4em] text-white/70 group-hover:text-white transition-colors uppercase"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Series / {displayIndex}
            </motion.span>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex items-center">
            <div className="max-w-[80%]">
              <div className="mb-4">
                <p className="text-[#C9A03D] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1 mb-3">
                  <Sparkles size={10} />
                  Premium Solutions
                </p>
              </div>
              
              <h3 className="text-4xl font-extrabold text-white tracking-tighter mb-4 leading-none drop-shadow-lg">
                {category.name}
              </h3>
              
              <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[240px] mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 drop-shadow-md">
                Custom engineered {category.name.toLowerCase()} layouts designed for modern spatial efficiency.
              </p>

              <div className="flex items-center gap-4">
                <div className="h-[2px] bg-white w-0 group-hover:w-12 transition-all duration-700" />
                <p className="text-[12px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">
                  {category.count} Blueprints
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="flex items-center justify-between pt-4 border-t border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full border-2 border-white bg-white/20 overflow-hidden backdrop-blur-sm"
                >
                  <img 
                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                    alt="Designer avatar" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#1A2A4F] flex items-center justify-center text-[10px] text-white font-bold">
                <Plus size={10} />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 opacity-0 group-hover:opacity-100 transition-all">
                View Details
              </span>
              <motion.div 
                className="w-14 h-14 rounded-full bg-white text-[#1A2A4F] flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:bg-[#C9A03D] hover:text-white"
                variants={arrowVariants}
                initial="initial"
                whileHover="hover"
              >
                <ArrowRight size={20} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Border Effect on Hover */}
        <motion.div 
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-[#C9A03D]/60" />
        </motion.div>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;