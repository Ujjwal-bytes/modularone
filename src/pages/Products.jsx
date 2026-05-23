import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { useSectionObserver } from '../hooks/useSectionObserver'; // Import the hook

// Animation variants (same as before)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export default function Products() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    material: [],
    finish: [],
  });

  // Use the observer hook to detect when products section is visible
  const { sectionRef, isVisible: isProductsSectionVisible } = useSectionObserver(0.1);

  // Automatically initialize selected category from URL search parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: [categoryParam] }));
    }
  }, [searchParams]);

  // Unified callback capturing input mutations from our sidebar checkboxes and radios
  const handleFilterChange = useCallback((filterType, value, isChecked) => {
    setFilters(prev => {
      if (filterType === 'category' || filterType === 'material' || filterType === 'finish') {
        if (isChecked) {
          return { ...prev, [filterType]: [...(prev[filterType] || []), value] };
        } else {
          return { ...prev, [filterType]: (prev[filterType] || []).filter(item => item !== value) };
        }
      }
      return prev;
    });
  }, []);

  // Resets catalog parameters back to baseline defaults
  const handleClearFilters = useCallback(() => {
    setFilters({
      category: [],
      material: [],
      finish: [],
    });
    setSearchQuery('');
  }, []);

  // Memoized filter execution block evaluating active selection tags against product assets
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Text Search Box Filtering
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.material?.toLowerCase().includes(query) ||
          product.finish?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 2. Category Collection Array Matching
      if (filters.category?.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }

      // 3. Substrate Material Selection Array Matching
      if (filters.material?.length > 0) {
        const matchesMaterial = filters.material.some(mat => 
          product.material?.toLowerCase().includes(mat.toLowerCase())
        );
        if (!matchesMaterial) return false;
      }

      // 4. Texture Surface Finish Selection Array Matching
      if (filters.finish?.length > 0 && !filters.finish.includes(product.finish)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="bg-white min-h-screen"
    >
      <Helmet>
        <title>Products | Modular One - Premium Modular Solutions</title>
        <meta name="description" content="Browse our complete collection of premium modular kitchens, wardrobes, office interiors, and more." />
      </Helmet>

      {/* Main Products Section with ref for observer */}
      <div ref={sectionRef} id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Editorial Heading Panel */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10 border-b border-gray-50 pb-8"
        >
          <motion.h1 
            variants={staggerItem}
            className="text-4xl font-bold text-gray-900 tracking-tight mb-3 mt-12"
          >
            Our Collections
          </motion.h1>
          <motion.p 
            variants={staggerItem}
            className="text-sm text-gray-500 max-w-xl leading-relaxed"
          >
            Explore our complete collection of premium modular solutions meticulously engineered to transform architectural spaces.
          </motion.p>
        </motion.div>

        {/* Premium Architectural Search Module */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10"
        >
          <div className="relative group max-w-xl">
            <Search 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#1A2A4F] transition-colors duration-200" 
              size={18} 
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search collections, textures, materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#1A2A4F] focus:ring-2 focus:ring-[#1A2A4F]/20 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </motion.div>

        {/* Grid Separation Layout Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Layout Area: Control Filter Sidebar Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-1 sticky top-24"
          >
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              filteredCount={filteredProducts.length}
              isProductsSectionVisible={isProductsSectionVisible} // Pass visibility to sidebar
            />
          </motion.div>

          {/* Right Layout Area: Matching Product Grid Container */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex justify-between items-center mb-6"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Showing <motion.span 
                  key={filteredProducts.length}
                  initial={{ scale: 1.2, color: "#1A2A4F" }}
                  animate={{ scale: 1, color: "#1A2A4F" }}
                  transition={{ duration: 0.3 }}
                  className="font-bold bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded mx-0.5 inline-block"
                >
                  {filteredProducts.length}
                </motion.span> premium designs
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  key="products-grid"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div 
                      key={product.id} 
                      variants={staggerItem}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty-state"
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-24 bg-gray-50/40 rounded-2xl border border-dashed border-gray-200 p-8 flex flex-col items-center justify-center"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -5, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Search size={48} className="text-gray-300 mb-4" strokeWidth={1.5} />
                  </motion.div>
                  <p className="text-sm font-medium text-gray-500 mb-6">
                    No products found matching your current selection.
                  </p>
                  <motion.button
                    onClick={handleClearFilters}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A2A4F] hover:bg-[#0E1A33] text-xs font-bold uppercase tracking-wider text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <RotateCcw size={14} />
                    <span>Clear All Filters</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </motion.div>
  );
}