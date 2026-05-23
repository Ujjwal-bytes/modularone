import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Maximize2, LayoutGrid, Sparkles, ChevronRight } from 'lucide-react';

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&h=1000&fit=crop", category: "kitchen", title: "Modern Slate Kitchen", desc: "Minimalist handle-less design with premium finishes" },
  { id: 2, src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=1000&fit=crop", category: "living", title: "Victorian Living", desc: "Luxury walnut textures with custom lighting" },
  { id: 3, src: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?w=800&h=1000&fit=crop", category: "wardrobe", title: "Glass Wardrobe", desc: "Internal LED lighting profile with soft-close" },
  { id: 4, src: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=1000&fit=crop", category: "office", title: "Executive Suite", desc: "Ergonomic modular office with acoustic panels" },
  { id: 5, src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=1000&fit=crop", category: "bedroom", title: "Master Bedroom", desc: "Custom headboard with ambient lighting" },
  { id: 6, src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=1000&fit=crop", category: "doors", title: "Designer Entrance", desc: "Solid teak wood finish with brass handles" },
  { id: 7, src: "https://images.unsplash.com/photo-1556912994-57d32f60c5a4?w=800&h=1000&fit=crop", category: "kitchen", title: "Minimalist White Kitchen", desc: "High-gloss acrylic finish with island" },
  { id: 8, src: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=1000&fit=crop", category: "wardrobe", title: "Walk-in Wardrobe", desc: "Custom modular storage solution" },
  { id: 9, src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop", category: "office", title: "Modern Workspace", desc: "Biophilic design with natural elements" },
];

const categories = [
  { id: 'all', name: 'All Work', count: galleryImages.length },
  { id: 'kitchen', name: 'Kitchens', count: galleryImages.filter(i => i.category === 'kitchen').length },
  { id: 'wardrobe', name: 'Wardrobes', count: galleryImages.filter(i => i.category === 'wardrobe').length },
  { id: 'office', name: 'Office', count: galleryImages.filter(i => i.category === 'office').length },
  { id: 'living', name: 'Living Room', count: galleryImages.filter(i => i.category === 'living').length },
  { id: 'bedroom', name: 'Bedroom', count: galleryImages.filter(i => i.category === 'bedroom').length },
  { id: 'doors', name: 'Doors', count: galleryImages.filter(i => i.category === 'doors').length }
];

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
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [index, setIndex] = useState(-1);
  const [hoveredId, setHoveredId] = useState(null);

  const filteredImages = useMemo(() => 
    selectedCategory === 'all' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === selectedCategory),
    [selectedCategory]
  );

  const slides = filteredImages.map(img => ({ 
    src: img.src, 
    title: img.title, 
    description: img.desc 
  }));

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <Helmet>
        <title>Portfolio | Modular One - Design Gallery</title>
        <meta name="description" content="Explore our premium modular kitchen, wardrobe, and interior design portfolio. See real transformations by Modular One." />
      </Helmet>

      {/* --- HERO SECTION --- */}
      <motion.section 
        className="relative pt-32 pb-16 px-4 text-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Background decoration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#1A2A4F]/5 to-[#C9A03D]/5 rounded-full blur-3xl pointer-events-none"
        />
        
        <motion.div 
          variants={staggerContainer}
          className="relative z-10"
        >
          <motion.div 
            variants={staggerItem}
            className="inline-flex items-center gap-2 bg-white shadow-sm border border-gray-100 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles size={14} className="text-[#C9A03D]" />
            <span className="text-xs font-medium text-gray-600">Our Creative Portfolio</span>
          </motion.div>
          
          <motion.h1 
            variants={staggerItem}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A2A4F] tracking-tight mb-4"
          >
            Design Stories
          </motion.h1>
          
          <motion.p 
            variants={staggerItem}
            className="text-gray-400 font-light max-w-xl mx-auto text-lg"
          >
            Explore our signature modular installations across Mumbai and Vasai
          </motion.p>
        </motion.div>
      </motion.section>

      {/* --- FILTER SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="sticky top-20 z-30 py-6 px-4 flex justify-center"
      >
        <div className="flex items-center gap-1 p-1.5 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-full shadow-2xl shadow-gray-200/50 overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative whitespace-nowrap px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-[#1A2A4F] hover:bg-gray-50'
              }`}
            >
              {selectedCategory === cat.id && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-[#1A2A4F] rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {cat.name}
                <span className={`text-[9px] ${selectedCategory === cat.id ? 'text-white/70' : 'text-gray-300'}`}>
                  ({cat.count})
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* --- GALLERY GRID --- */}
      <div className="max-w-7xl mx-auto px-4 pb-24 mt-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredImages.map((image, idx) => (
              <motion.div
                key={image.id}
                variants={staggerItem}
                layout
                onClick={() => setIndex(idx)}
                onHoverStart={() => setHoveredId(image.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gray-50 aspect-[4/5] shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <motion.img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  loading="lazy"
                />
                
                {/* Premium Gradient Overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-[#1A2A4F] via-[#1A2A4F]/40 to-transparent flex flex-col justify-end p-8"
                >
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: hoveredId === image.id ? 0 : 20, opacity: hoveredId === image.id ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <span className="text-[#C9A03D] text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                      {image.category}
                    </span>
                    <h3 className="text-white font-bold text-2xl mb-1">{image.title}</h3>
                    <p className="text-white/70 text-sm font-light mb-6">{image.desc}</p>
                    <motion.div 
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#1A2A4F] shadow-xl hover:bg-[#C9A03D] hover:text-white transition-colors cursor-pointer"
                    >
                      <Maximize2 size={20} />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Category Badge (visible when not hovered) */}
                <motion.div 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: hoveredId === image.id ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#1A2A4F]">
                    {image.category}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {filteredImages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-32"
            >
              <motion.div
                animate={{ 
                  rotate: [0, -5, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 0.5 }}
              >
                <LayoutGrid size={64} className="mx-auto text-gray-200 mb-4" strokeWidth={1.5} />
              </motion.div>
              <p className="text-gray-400 text-lg">Expanding this collection soon.</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory('all')}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A2A4F] text-white rounded-full text-sm font-medium hover:bg-[#0E1A33] transition-colors"
              >
                View All Projects
                <ChevronRight size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <Lightbox
        plugins={[Captions]}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        styles={{ 
          container: { backgroundColor: "rgba(26, 42, 79, 0.98)" },
          button: { color: "#C9A03D" }
        }}
        carousel={{
          finite: false,
          preload: 2,
        }}
        animation={{
          fade: 300,
          swipe: 500,
        }}
      />
    </div>
  );
}