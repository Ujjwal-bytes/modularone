import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
 
  Menu, 
  X, 
  Sparkles, 
  Home, 
  Info, 
  Package, 
  Images, 
  Phone, 
  User,
  LogIn,
  Settings,
  HelpCircle
} from "lucide-react";
import { getWishlistCount } from "../utils/localStorage";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(null);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        let scrollTimeout;
        const handleScroll = () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, []);

    // Update counts when location changes
    useEffect(() => {
        setWishlistCount(getWishlistCount());
    }, [location]);

    // Listen for storage events
    useEffect(() => {
        const handleStorageChange = () => {
            setWishlistCount(getWishlistCount());
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

    const navLinks = useMemo(() => [
        { name: "Home", path: "/", icon: Home },
        { name: "About", path: "/about", icon: Info },
        { name: "Products", path: "/products", icon: Package },
        { name: "Gallery", path: "/gallery", icon: Images },
        { name: "Contact", path: "/contact", icon: Phone },
    ], []);

    const handleMenuToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleMenuClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Animation variants
    const navVariants = {
        initial: { y: -100, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    const mobileMenuVariants = {
        hidden: { 
            height: 0, 
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        visible: { 
            height: 'auto', 
            opacity: 1,
            transition: { 
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const mobileItemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    const badgeVariants = {
        initial: { scale: 0 },
        animate: { 
            scale: 1,
            transition: { type: "spring", stiffness: 500, damping: 15 }
        },
        exit: { 
            scale: 0,
            transition: { duration: 0.2 }
        }
    };

    const logoVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.5, delay: 0.1 }
        },
        hover: { 
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };

    const iconButtonVariants = {
        hover: { scale: 1.1, rotate: 5 },
        tap: { scale: 0.9 }
    };

    const ctaButtonVariants = {
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    return (
        <motion.nav 
            variants={navVariants}
            initial="initial"
            animate="animate"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled 
                    ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
                    : "bg-white border-b border-gray-100"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <motion.div
                        variants={logoVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group transition-all" aria-label="Modular One Home">
                            <div className="relative flex items-center">
                                <img
                                    src="/logo.png"
                                    alt="Modular One"
                                    width="56"
                                    height="56"
                                    className="h-10 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                                    loading="eager"
                                    fetchPriority="high"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        const fallback = e.target.nextSibling;
                                        if (fallback) fallback.style.display = 'flex';
                                    }}
                                />
                                {/* Fallback Text */}
                                <div className="hidden items-center gap-2">
                                    <span className="text-xl md:text-2xl font-bold text-[#1A2A4F] tracking-tighter">Modular</span>
                                    <span className="text-xl md:text-2xl font-bold text-[#C9A03D] tracking-tighter">One</span>
                                </div>
                            </div>
                            {/* Subtle shine effect on hover */}
                            <motion.div 
                                className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation with Icons */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <motion.div 
                                    key={link.name} 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onHoverStart={() => setIsHovered(link.name)}
                                    onHoverEnd={() => setIsHovered(null)}
                                >
                                    <Link
                                        to={link.path}
                                        className={`relative flex items-center gap-1.5 text-sm font-medium transition-all duration-300 ${
                                            isActive(link.path)
                                                ? "text-[#C9A03D]"
                                                : "text-[#4A5568] hover:text-[#1A2A4F]"
                                        }`}
                                    >
                                        <Icon size={16} />
                                        <span>{link.name}</span>
                                        {isActive(link.path) && (
                                            <motion.span 
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A03D] rounded-full"
                                                layoutId="activeNav"
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                animate={{ opacity: 1, scaleX: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                        {/* Hover underline effect */}
                                        {!isActive(link.path) && isHovered === link.name && (
                                            <motion.span 
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1A2A4F] rounded-full"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                exit={{ scaleX: 0 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-2">
                        <motion.div 
                            variants={iconButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                to="/wishlist"
                                className="relative p-2 rounded-lg text-[#4A5568] hover:text-[#1A2A4F] hover:bg-gray-50 transition-all duration-200"
                                aria-label="Wishlist"
                            >
                                <Heart size={20} />
                                <AnimatePresence>
                                    {wishlistCount > 0 && (
                                        <motion.span 
                                            className="absolute -top-1 -right-1 bg-[#C9A03D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                                            variants={badgeVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            {wishlistCount > 9 ? '9+' : wishlistCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </motion.div>
                        <motion.div 
                            variants={ctaButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                to="/get-quote"
                                className="ml-2 px-5 py-2 bg-[#1A2A4F] text-white text-sm font-medium rounded-lg hover:bg-[#0E1A33] transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 group"
                            >
                                <Sparkles size={14} className="text-[#C9A03D] group-hover:rotate-12 transition-transform duration-300" />
                                <span>Get Quote</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-2">
                        <Link
                            to="/wishlist"
                            className="relative p-2 text-[#4A5568] hover:text-[#1A2A4F]"
                            aria-label="Wishlist"
                        >
                            <Heart size={20} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#C9A03D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {wishlistCount > 9 ? '9+' : wishlistCount}
                                </span>
                            )}
                        </Link>
                        <motion.button
                            onClick={handleMenuToggle}
                            className="p-2 rounded-lg text-[#4A5568] hover:text-[#1A2A4F] hover:bg-gray-50 transition-all duration-200"
                            aria-label="Toggle menu"
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile menu with icons */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="md:hidden overflow-hidden"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="bg-white border-t border-gray-100 shadow-lg">
                            <div className="px-4 pt-2 pb-6 space-y-1">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <motion.div
                                            key={link.name}
                                            variants={mobileItemVariants}
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={handleMenuClose}
                                                className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                                                    isActive(link.path)
                                                        ? "text-[#C9A03D] bg-amber-50"
                                                        : "text-[#4A5568] hover:text-[#1A2A4F] hover:bg-gray-50"
                                                }`}
                                            >
                                                <Icon size={18} />
                                                <span>{link.name}</span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                                <motion.div 
                                    className="pt-4 px-4"
                                    variants={mobileItemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        to="/get-quote"
                                        onClick={handleMenuClose}
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#1A2A4F] text-white text-center rounded-lg font-medium hover:bg-[#0E1A33] transition-all duration-200 active:scale-95 group"
                                    >
                                        <Sparkles size={16} className="text-[#C9A03D] group-hover:rotate-12 transition-transform" />
                                        <span>Get Quote</span>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll indicator dot */}
            <AnimatePresence>
                {scrolled && (
                    <motion.div 
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <div className="w-1 h-1 rounded-full bg-[#C9A03D]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}