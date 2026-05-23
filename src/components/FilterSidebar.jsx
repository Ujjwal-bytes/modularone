import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, Layers, Palette, RotateCcw, Filter, Sparkles } from 'lucide-react';
import { createPortal } from 'react-dom';
import { categories, materials, finishes } from '../data/products';

const FilterSidebar = ({ 
  filters = { category: [], material: [], finish: [] }, 
  onFilterChange, 
  onClearFilters,
  filteredCount = 0,
  isProductsSectionVisible = false
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.dataset.scrollY = scrollY;
    } else {
      const scrollY = document.body.dataset.scrollY;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileOpen]);

  const hasActiveFilters = useMemo(() => 
    (filters.category?.length > 0) || 
    (filters.material?.length > 0) || 
    (filters.finish?.length > 0),
    [filters.category, filters.material, filters.finish]
  );

  const totalActiveCount = useMemo(() => 
    (filters.category?.length || 0) + (filters.material?.length || 0) + (filters.finish?.length || 0),
    [filters.category, filters.material, filters.finish]
  );

  const handleClearAll = useCallback(() => {
    onClearFilters();
  }, [onClearFilters]);

  const handleCloseMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const handleOpenMobile = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileOpen(true);
  }, []);

  // Animation variants
  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const FilterContent = useMemo(() => () => (
    <motion.div 
      variants={staggerContainer}
      initial="visible"
      className="space-y-10"
    >
      {/* Space Type */}
      <motion.section variants={slideUp}>
        <motion.h4 
          whileHover={{ x: 5 }}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center gap-2"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Box size={14} className="text-[#C9A03D]" />
          </motion.div>
          Space Type
        </motion.h4>
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 gap-2"
        >
          {categories.map((category) => {
            const isChecked = filters.category?.includes(category.id);
            return (
              <motion.button
                key={category.id}
                variants={staggerItem}
                onClick={() => onFilterChange('category', category.id, !isChecked)}
                className={`relative flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 overflow-hidden ${
                  isChecked 
                    ? 'bg-[#1A2A4F] border-[#1A2A4F] text-white shadow-lg' 
                    : 'bg-gray-50 border-transparent text-gray-600 hover:border-gray-200 hover:bg-white'
                }`}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xs font-bold z-10">{category.name}</span>
                <span className={`text-[10px] font-black z-10 ${isChecked ? 'text-white/60' : 'text-gray-400'}`}>
                  {category.count}
                </span>
                {isChecked && (
                  <motion.div 
                    layoutId={`active-bg-${category.id}`}
                    className="absolute inset-0 bg-gradient-to-r from-[#1A2A4F] to-[#2A3D6B]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Materials */}
      <motion.section variants={slideUp}>
        <motion.h4 
          whileHover={{ x: 5 }}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center gap-2"
        >
          <Layers size={14} className="text-[#C9A03D]" />
          Core Substrates
        </motion.h4>
        <motion.div 
          variants={staggerContainer}
          className="flex flex-wrap gap-2"
        >
          {materials.map((mat) => {
            const isChecked = filters.material?.includes(mat);
            return (
              <motion.button
                key={mat}
                variants={staggerItem}
                onClick={() => onFilterChange('material', mat, !isChecked)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                  isChecked 
                    ? 'bg-[#C9A03D] border-[#C9A03D] text-white shadow-lg shadow-[#C9A03D]/20' 
                    : 'bg-white border-gray-100 text-gray-400 hover:border-[#1A2A4F] hover:text-[#1A2A4F]'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {mat}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Finishes */}
      <motion.section variants={slideUp}>
        <motion.h4 
          whileHover={{ x: 5 }}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center gap-2"
        >
          <Palette size={14} className="text-[#C9A03D]" />
          Surface Finishes
        </motion.h4>
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 gap-2"
        >
          {finishes.map((fin) => {
            const isChecked = filters.finish?.includes(fin);
            return (
              <motion.button
                key={fin}
                variants={staggerItem}
                onClick={() => onFilterChange('finish', fin, !isChecked)}
                className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                  isChecked 
                    ? 'border-[#1A2A4F] bg-[#1A2A4F] text-white shadow-md' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-[#1A2A4F] hover:text-[#1A2A4F] hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {fin}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.section>
    </motion.div>
  ), [filters.category, filters.material, filters.finish, onFilterChange]);

  // Mobile Filter Button Component - VISIBLE WHEN PRODUCTS GRID IS IN VIEW
  const MobileFilterButton = () => {
    // Only show when products grid is visible and drawer is closed
    if (isMobileOpen || !isProductsSectionVisible) return null;
    
    return (
      <motion.button 
        onClick={handleOpenMobile}
        className="lg:hidden fixed bottom-0 left-0 right-0 
                   z-[9999] flex items-center justify-between 
                   bg-[#1A2A4F] text-white px-6 py-4 
                   shadow-2xl shadow-[#1A2A4F]/30
                   cursor-pointer active:scale-[0.98] transition-all
                   border-t border-white/10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ 
          position: 'fixed',
          isolation: 'isolate',
          pointerEvents: 'auto',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-[#C9A03D]" />
          <span className="text-[12px] font-black uppercase tracking-[0.2em]">
            Filter Products
          </span>
        </div>
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/60">
              Active
            </span>
            <span className="w-6 h-6 bg-[#C9A03D] rounded-full flex items-center justify-center text-[11px] font-bold text-[#1A2A4F]">
              {totalActiveCount}
            </span>
          </div>
        )}
      </motion.button>
    );
  };

  return (
    <>
      {/* 1. MOBILE FILTER BUTTON - VISIBLE WHEN PRODUCTS GRID IS IN VIEW */}
      {mounted && createPortal(
        <MobileFilterButton />,
        document.body
      )}

      {/* 2. MOBILE DRAWER OVERLAY */}
      {mounted && isMobileOpen && createPortal(
        <AnimatePresence mode="wait">
          <motion.div 
            className="fixed inset-0 z-[9998] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
              onClick={handleCloseMobile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div 
              className="absolute bottom-0 inset-x-0 bg-white rounded-t-[2rem] max-h-[85vh] overflow-y-auto shadow-2xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{ zIndex: 9999 }}
            >
              <div className="sticky top-0 bg-white z-20 px-6 pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
              </div>
              
              <div className="sticky top-6 bg-white z-20 px-6 pt-2 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2A4F]">Filter Collection</h3>
                    {hasActiveFilters && (
                      <p className="text-xs text-gray-400 mt-1">
                        {totalActiveCount} active filter{totalActiveCount > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                  <motion.button 
                    onClick={handleCloseMobile} 
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <FilterContent />
                
                {hasActiveFilters && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 pt-6 border-t border-gray-100"
                  >
                    <p className="text-[9px] font-black text-[#C9A03D] uppercase tracking-[0.3em] mb-3 flex items-center gap-1">
                      <Sparkles size={10} />
                      Active Filters
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {[...(filters.category || []), ...(filters.material || []), ...(filters.finish || [])].map((tag) => (
                          <motion.div 
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full"
                          >
                            <span className="text-[10px] font-medium text-[#1A2A4F]">{tag}</span>
                            <button
                              onClick={() => {
                                if (filters.category?.includes(tag)) onFilterChange('category', tag, false);
                                if (filters.material?.includes(tag)) onFilterChange('material', tag, false);
                                if (filters.finish?.includes(tag)) onFilterChange('finish', tag, false);
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-md p-6 pt-4 border-t border-gray-100 z-20">
                <div className="flex gap-3">
                  <motion.button 
                    onClick={handleCloseMobile}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </motion.button>
                  <motion.button 
                    onClick={handleCloseMobile}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3.5 bg-[#1A2A4F] text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all"
                  >
                    Show Results ({filteredCount})
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {/* 3. DESKTOP STICKY SIDEBAR */}
      <motion.aside 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block w-full max-w-[340px] sticky top-28 h-[calc(100vh-140px)] overflow-y-auto pr-4 custom-scrollbar"
      >
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
            <div>
              <h3 className="text-xl font-bold text-[#1A2A4F] tracking-tight">Filters</h3>
              {hasActiveFilters && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[9px] text-[#C9A03D] font-bold uppercase mt-1"
                >
                  {totalActiveCount} active
                </motion.p>
              )}
            </div>
            {hasActiveFilters && (
              <motion.button 
                onClick={handleClearAll} 
                className="p-2 text-gray-300 hover:text-[#C9A03D] transition-colors"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <RotateCcw size={18} />
              </motion.button>
            )}
          </div>
          
          <FilterContent />

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 pt-6 border-t border-gray-50 overflow-hidden"
              >
                <p className="text-[9px] font-black text-[#C9A03D] uppercase tracking-[0.3em] mb-3 flex items-center gap-1">
                  <Sparkles size={10} />
                  Applied Filters
                </p>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {[...(filters.category || []), ...(filters.material || []), ...(filters.finish || [])].map((tag) => (
                      <motion.div 
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm"
                      >
                        <span className="text-[10px] font-medium text-[#1A2A4F]">{tag}</span>
                        <button
                          onClick={() => {
                            if (filters.category?.includes(tag)) onFilterChange('category', tag, false);
                            if (filters.material?.includes(tag)) onFilterChange('material', tag, false);
                            if (filters.finish?.includes(tag)) onFilterChange('finish', tag, false);
                          }}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                          aria-label={`Remove ${tag} filter`}
                        >
                          <X size={10} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.aside>
    </>
  );
};

export default React.memo(FilterSidebar);