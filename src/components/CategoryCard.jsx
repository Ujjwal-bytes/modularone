import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Sparkles, Zap } from 'lucide-react';
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
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
  wardrobe: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=600&fit=crop",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  living: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  bedroom: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
  doors: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop",
};

// Category descriptions
const categoryDescriptions = {
  kitchen: "Custom modular kitchens with smart storage and premium finishes",
  wardrobe: "Space-saving wardrobes designed for modern living",
  office: "Ergonomic office furniture for productivity and comfort",
  living: "Elegant living room sets that define your style",
  bedroom: "Luxury bedroom furniture for restful nights",
  doors: "Premium doors that blend security with aesthetics",
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      delay: index * 0.08
    }
  }),
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const CategoryCard = React.memo(({ category, index }) => {
  const Icon = useMemo(() => iconMap[category.icon] || Sofa, [category.icon]);
  const displayIndex = useMemo(() => String(index + 1).padStart(2, '0'), [index]);
  const imageUrl = useMemo(() => categoryBackgrounds[category.id] || categoryBackgrounds.kitchen, [category.id]);
  const description = useMemo(() => categoryDescriptions[category.id] || `Premium ${category.name} solutions for your space`, [category.id, category.name]);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Link
        to={`/products?category=${category.id}`}
        className="group relative block w-full h-[460px] overflow-hidden  cursor-pointer"
        aria-label={`View ${category.name} products`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={imageUrl} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>

        {/* Decorative Background Number */}
        <motion.span 
          className="absolute -right-4 -bottom-10 text-[15rem] font-black text-white/5 select-none pointer-events-none"
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.1, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {displayIndex}
        </motion.span>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full h-full p-6">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            {/* Icon Box */}
            <motion.div 
              className="w-14 h-14 bg-white/90 backdrop-blur-sm border border-white/30 flex items-center justify-center rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={28} className="text-[#1A2A4F] transition-colors duration-300 group-hover:text-[#C9A03D]" strokeWidth={1.3} />
            </motion.div>
            
            {/* Collection Badge */}
            <motion.span 
              className="text-[9px] font-semibold tracking-[0.2em] text-white/60 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {displayIndex} / COLLECTION
            </motion.span>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex items-center">
            <div className="max-w-[85%]">
              {/* Premium Tag */}
              <div className="flex items-center gap-2 mb-3">
                <Zap size={10} className="text-[#C9A03D]" />
                <span className="text-[#C9A03D] text-[9px] font-bold tracking-[0.15em] uppercase">Premium Collection</span>
              </div>
              
              {/* Category Name */}
              <h3 className="text-3xl font-bold text-white tracking-tight mb-3 leading-tight drop-shadow-lg">
                {category.name}
              </h3>
              
              {/* Description - Shows on hover */}
              <p className="text-white/70 text-xs leading-relaxed max-w-[220px] mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {description}
              </p>

              {/* Count Indicator */}
              <div className="flex items-center gap-3">
                <div className="h-px w-0 bg-white/50 group-hover:w-10 transition-all duration-500" />
                <span className="text-[10px] font-medium text-white/80 tracking-wider">
                  {category.count} Designs
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="flex items-center justify-between pt-4 border-t border-white/15"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Designer Avatars */}
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="w-7 h-7 border-2 border-white/80 bg-white/20 overflow-hidden rounded-full"
                >
                  <img 
                    src={`https://i.pravatar.cc/50?img=${i + index * 3}`} 
                    alt="Designer" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>
              ))}
              <div className="w-7 h-7 border-2 border-white/80 bg-[#1A2A4F] flex items-center justify-center text-[8px] text-white font-bold rounded-full">
                +
              </div>
            </div>
            
            {/* View Button */}
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-semibold uppercase tracking-wider text-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                Explore
              </span>
              <motion.div 
                className="w-10 h-10 bg-white text-[#1A2A4F] flex items-center justify-center shadow-md transition-all duration-300 hover:bg-[#C9A03D] hover:text-white rounded-full"
                whileHover={{ x: 3 }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Border Effect on Hover */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 border-2 border-[#C9A03D]/40 rounded-2xl" />
        </motion.div>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;