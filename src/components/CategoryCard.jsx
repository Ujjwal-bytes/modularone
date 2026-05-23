import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Sparkles } from 'lucide-react';
import { Utensils, Shirt, Briefcase, Sofa, Bed, Frame } from 'lucide-react';

// Icon mapping - static, moved outside component
const iconMap = {
  'Utensils': Utensils,
  'Shirt': Shirt,
  'Briefcase': Briefcase,
  'Sofa': Sofa,
  'Bed': Bed,
  'Door': Frame,
};

// Animation variants - static, moved outside component
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

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { delay: 0.2, duration: 0.5 } 
  }
};

const badgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { delay: 0.3, type: "spring", stiffness: 500, damping: 30 } 
  }
};

const CategoryCard = React.memo(({ category, index }) => {
  const Icon = useMemo(() => iconMap[category.icon] || Sofa, [category.icon]);
  const displayIndex = useMemo(() => String(index + 1).padStart(2, '0'), [index]);
  const imageUrl = useMemo(() => 
    category.image || `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800`, 
    [category.image]
  );

  // Custom delay based on index
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
        className="group relative flex flex-col justify-between h-[500px] bg-white rounded-[2.5rem] p-8 border border-gray-100 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(26,42,79,0.15)] overflow-hidden block cursor-pointer"
        aria-label={`View ${category.name} products`}
      >
        {/* 1. Enhanced Background Layers */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img 
            src={imageUrl} 
            alt={category.name}
            className="h-full w-full object-cover transition-all duration-1000 ease-out grayscale-[0.2] opacity-20"
            whileHover={{ scale: 1.1, opacity: 0.4, filter: "grayscale(0%)" }}
            transition={{ duration: 0.6 }}
            loading="lazy"
            width="800"
            height="600"
          />
          
          {/* Decorative Large Background Index Number */}
          <motion.span 
            className="absolute -right-4 -bottom-10 text-[18rem] font-black text-gray-100/40 select-none pointer-events-none"
            initial={{ opacity: 0.4 }}
            whileHover={{ opacity: 0.1, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            {displayIndex}
          </motion.span>
          
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
        </motion.div>

        {/* 2. Top Meta Data */}
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex flex-col gap-4">
            {/* Fixed Icon Container - Background changes properly on hover */}
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-white shadow-xl border border-gray-50 flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:bg-[#1A2A4F]"
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
            >
              {/* Icon with fixed color transition */}
              <Icon 
                size={32} 
                className="text-[#1A2A4F] transition-colors duration-500 group-hover:text-white" 
                strokeWidth={1.2} 
              />
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2"
              variants={badgeVariants}
              initial="initial"
              animate="animate"
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-[#C9A03D]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[10px] font-bold tracking-widest text-[#C9A03D] uppercase">Active Series</span>
            </motion.div>
          </div>
          
          <motion.span 
            className="text-[11px] font-black tracking-[0.4em] text-gray-400 group-hover:text-[#1A2A4F] transition-colors uppercase"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Series / {displayIndex}
          </motion.span>
        </div>

        {/* 3. Center Content */}
        <motion.div 
          className="relative z-10"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="mb-4 overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.p 
              className="text-[#C9A03D] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1"
              whileHover={{ x: 5 }}
            >
              <Sparkles size={10} />
              Premium Solutions
            </motion.p>
          </motion.div>
          
          <motion.h3 
            className="text-4xl font-extrabold text-[#1A2A4F] tracking-tighter mb-4 leading-none"
            whileHover={{ x: 3 }}
          >
            {category.name}
          </motion.h3>
          
          <motion.p 
            className="text-gray-500 text-sm font-medium leading-relaxed max-w-[240px] mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Custom engineered {category.name.toLowerCase()} layouts designed for modern spatial efficiency.
          </motion.p>

          <motion.div 
            className="flex items-center gap-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="h-[2px] bg-[#1A2A4F] w-0 group-hover:w-12 transition-all duration-700"
              initial={{ width: 0 }}
              whileHover={{ width: 48 }}
            />
            <p className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.2em]">
              {category.count} Blueprints
            </p>
          </motion.div>
        </motion.div>

        {/* 4. Bottom Bar */}
        <motion.div 
          className="relative z-10 flex items-center justify-between pt-6 border-t border-gray-100/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                whileHover={{ scale: 1.1, zIndex: 10 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="Designer avatar" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  width="32"
                  height="32"
                />
              </motion.div>
            ))}
            <motion.div 
              className="w-8 h-8 rounded-full border-2 border-white bg-[#1A2A4F] flex items-center justify-center text-[10px] text-white font-bold cursor-pointer"
              whileHover={{ scale: 1.1, backgroundColor: "#C9A03D" }}
              transition={{ duration: 0.2 }}
            >
              <Plus size={10} />
            </motion.div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.span 
              className="text-[10px] font-bold uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-all"
              initial={{ x: 10, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
            >
              View Details
            </motion.span>
            <motion.div 
              className="w-14 h-14 rounded-full bg-[#1A2A4F] text-white flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-300 group-hover:bg-[#C9A03D]"
              variants={arrowVariants}
              initial="initial"
              whileHover="hover"
            >
              <ArrowRight size={20} />
            </motion.div>
          </div>
        </motion.div>

        {/* 5. Border Effect on Hover */}
        <motion.div 
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 rounded-[2.5rem] border-2 border-[#C9A03D]/50"
            initial={{ scale: 0.95, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;