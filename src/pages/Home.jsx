import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  Star, Award, Shield, Clock, ArrowRight,
  Instagram, Sparkles, Compass, ArrowUpRight
} from 'lucide-react';
import { categories, products } from '../data/products';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import AnimatedMarqueeHero from '../components/ui/hero-3';
import { furnitureImages } from '../data/furnitureImages';

// Custom hook for animated counter
function useAnimatedCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * end;
      setCount(currentValue);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible, end, duration]);

  return { count, ref };
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
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

// Static data
const testimonialsData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Vasai, Maharashtra",
    rating: 5,
    review: "Modular One transformed our kitchen completely. The quality of materials and craftsmanship is exceptional. The team was professional and completed the project on time.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    projectImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    review: "Best decision we made for our home. The modular wardrobe design is exactly what we wanted. The soft-close hinges and premium finish make it worth every rupee.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    projectImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Palghar, Maharashtra",
    rating: 4,
    review: "Excellent work on our office interiors. The team understood our requirements perfectly and delivered a modern, functional workspace. Highly recommended!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    projectImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
  }
];

const galleryImagesData = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop"
];

const featuresData = [
  { icon: Award, title: "Premium Materials", desc: "Sourced exclusively from certified BWP Marine Grade plywood suppliers paired with certified luxury hardware configurations." },
  { icon: Shield, title: "Extended Warranties", desc: "Comprehensive 5-year structural warranty across moving architectural parts and up to a lifetime threshold protection framework." },
  { icon: Sparkles, title: "Consultation Access", desc: "Direct spatial alignment sessions with accredited interior layout architects using advanced structural virtualization viewports." },
  { icon: Clock, title: "On-Time Execution", desc: "Rigid milestones tracking structure protects planned timelines, moving from initial concept drop frames straight to active delivery." }
];

export default React.memo(function Home() {
  const navigate = useNavigate();
  const featuredProducts = useMemo(() => products.slice(0, 6), []);
  const testimonials = testimonialsData;
  const galleryImages = galleryImagesData;
  const features = featuresData;

  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  const projectsCounter = useAnimatedCounter(50, 2000);
  const ratingCounter = useAnimatedCounter(4.9, 2000);
  const architectsCounter = useAnimatedCounter(10, 2000);
  const scopeCounter = useAnimatedCounter(40, 2000);

  const handleProductsHover = useCallback(() => {
    import('../pages/Products').catch(() => { });
  }, []);

  const handleContactHover = useCallback(() => {
    import('../pages/Contact').catch(() => { });
  }, []);

  const handleExploreClick = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  useEffect(() => {
    if (isHeroInView) {
      controls.start("visible");
    }
  }, [controls, isHeroInView]);

  return (
    <div className="bg-white selection:bg-[#C9A03D] selection:text-white overflow-hidden">
      <Helmet>
        <title>Modular One | Premium Modular Kitchens & Interiors</title>
        <meta name="description" content="Transform Your Space with Modular One. Premium modular kitchens, wardrobes, and office interiors in Vasai, Maharashtra." />
      </Helmet>

      {/* Animated Marquee Hero Section */}
     // In your Home.jsx, update the AnimatedMarqueeHero usage:

      <AnimatedMarqueeHero
        tagline="Premium Modular Furniture"
        title={
          <>
            Crafting Dreams
            <br />
            <span className="text-[#C9A03D]">Into Reality</span>
          </>
        }
        description="Experience the perfect blend of luxury, functionality, and craftsmanship with our premium modular furniture solutions. Transform your space into a masterpiece."
        ctaText="Explore Collection"
        images={furnitureImages}
        backgroundImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop"
        onCtaClick={handleExploreClick}
      />


      {/* Featured Categories / Collections */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="relative py-32 bg-[#ffffff] overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#C9A03D]/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#1A2A4F]/5 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
          >
            <motion.div variants={staggerItem} className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-[#C9A03D]"></span>
                <span className="text-xs font-bold text-[#C9A03D] uppercase tracking-[0.3em]">
                  Curated Collections
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A2A4F] tracking-tight leading-[1.1]">
                Discover Our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A2A4F] to-[#C9A03D]">
                  Premium Range
                </span>
              </h2>
            </motion.div>
            <motion.p
              variants={staggerItem}
              className="max-w-xs text-sm sm:text-base text-gray-500 font-medium leading-relaxed border-l-2 border-gray-100 pl-6"
            >
              Meticulously engineered modular solutions marrying industrial utility with luxury aesthetics.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={staggerItem}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Best Sellers Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-14"
          >
            <motion.div variants={staggerItem} className="space-y-2">
              <span className="text-xs font-bold text-[#C9A03D] uppercase tracking-widest">Bestsellers</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Most Loved Designs
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Discover our most popular modular furniture collections loved by thousands.
              </p>
            </motion.div>
            <motion.div variants={staggerItem}>
              <Link
                to="/products"
                className="group inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#C9A03D] uppercase hover:text-gray-900 transition-colors pt-2 sm:pt-0"
              >
                <span>View All Products</span>
                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={staggerItem}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-24 bg-gray-900 text-white relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <motion.span variants={staggerItem} className="text-xs font-bold text-[#C9A03D] uppercase tracking-widest">Why Choose Us</motion.span>
            <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-black tracking-tight">
              The Modular One Advantage
            </motion.h2>
            <motion.p variants={staggerItem} className="text-sm text-gray-400 font-medium">
              Experience unparalleled quality and service with our premium modular solutions.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-[#C9A03D]/20 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300"
                  >
                    <Icon size={22} className="text-[#C9A03D]" />
                  </motion.div>
                  <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <motion.span variants={staggerItem} className="text-xs font-bold text-[#C9A03D] uppercase tracking-widest">Testimonials</motion.span>
            <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              What Our Clients Say
            </motion.h2>
            <motion.p variants={staggerItem} className="text-sm text-gray-500 font-medium">
              Real stories from satisfied customers who transformed their spaces with us.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Instagram Gallery Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-24 bg-gray-50/60 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-xl mx-auto mb-12 space-y-2"
          >
            <motion.span variants={staggerItem} className="text-xs font-bold text-[#C9A03D] uppercase tracking-widest">Instagram</motion.span>
            <motion.h2 variants={staggerItem} className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Follow Our Journey
            </motion.h2>
            <motion.p variants={staggerItem} className="text-xs sm:text-sm text-gray-500 font-medium">
              Get inspired by our latest projects and transformations on Instagram.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-square overflow-hidden rounded-2xl group shadow-sm border border-gray-100 bg-white cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Modular One Project ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="600"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gray-900/40 transition-opacity duration-300 flex items-center justify-center"
                >
                  <Instagram size={20} className="text-white transform scale-90 group-hover:scale-100 transition-transform duration-300" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <a
              href="https://instagram.com/modularone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-[#C9A03D] hover:to-[#B8922E] text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-md transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              <Instagram size={16} />
              <span>Follow @ModularOne</span>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-20 bg-gray-900 text-white relative overflow-hidden"
      >
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#C9A03D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          >
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-sm sm:text-base text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Let's discuss your dream project. Our expert team is here to guide you every step of the way.
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-gray-900 text-sm font-bold rounded-xl shadow-lg hover:bg-[#C9A03D] hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 border-2 border-white/20 text-white text-sm font-bold rounded-xl hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-300"
            >
              Browse Collection
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
});