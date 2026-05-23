import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Compass, Star } from 'lucide-react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const loadingMessages = [
    "Crafting excellence...",
    "Designing your dream space...",
    "Preparing premium solutions...",
    "Almost there...",
    "Welcome to Modular One"
  ];

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 200);

    // Change message every 500ms
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    // Hide preloader after loading is complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, []);

  // Animated particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A2A4F]/98 via-[#0E1A33]/95 to-[#1A2A4F]/98" />
          
          {/* Animated Grain Texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-noise" />
          </div>

          {/* Animated Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-[#C9A03D]/20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Decorative Circles */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A03D]/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#C9A03D]/8 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-lg">
            {/* Logo with Glow Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 120 }}
                className="relative"
              >
                {/* Outer Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#C9A03D]/20 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <img
                  src="/logo.png"
                  alt="Modular One Logo"
                  className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback text */}
                <div className="hidden flex-col items-center gap-1">
                  <span className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
                    Modular
                  </span>
                  <span className="text-5xl md:text-6xl font-bold text-[#C9A03D] tracking-tighter">
                    One
                  </span>
                </div>
              </motion.div>

              {/* Animated Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-6"
              >
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs font-bold text-[#C9A03D] uppercase tracking-[0.3em] mb-2"
                >
                  Since 2024
                </motion.p>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Premium Modular Solutions
                </h1>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Sparkles size={12} className="text-[#C9A03D]" />
                  <p className="text-sm text-gray-300">Crafting Dreams Into Reality</p>
                  <Sparkles size={12} className="text-[#C9A03D]" />
                </div>
              </motion.div>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="w-full max-w-md space-y-4"
            >
              {/* Progress Bar */}
              <div className="relative">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C9A03D] via-[#DDB45E] to-[#C9A03D] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                {/* Animated Shimmer Effect */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '500%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Progress Info */}
              <div className="flex justify-between items-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-[10px] text-gray-400 tracking-wider uppercase flex items-center gap-2"
                >
                  <Loader2 size={12} className="animate-spin text-[#C9A03D]" />
                  {loadingMessages[currentMessage]}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-xs font-bold text-[#C9A03D]"
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </motion.div>

            {/* Brand Promise Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="grid grid-cols-3 gap-4 mt-10 w-full max-w-sm"
            >
              {[
                { icon: Star, label: "Premium Quality", delay: 1.2 },
                { icon: Compass, label: "Expert Design", delay: 1.3 },
                { icon: Sparkles, label: "Luxury Finish", delay: 1.4 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.5 }}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="w-10 h-10 mx-auto bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#C9A03D]/20 transition-all duration-300">
                    <item.icon size={16} className="text-[#C9A03D]" />
                  </div>
                  <p className="text-[9px] text-gray-400 mt-2 uppercase tracking-wider">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-0 left-0 right-0"
          >
            {/* Animated Border Line */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-[#C9A03D]/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            />
            
            <div className="py-6 text-center">
              <p className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.3em] uppercase flex items-center justify-center gap-3">
                <span>Luxury</span>
                <span className="w-1 h-1 rounded-full bg-[#C9A03D]" />
                <span>Quality</span>
                <span className="w-1 h-1 rounded-full bg-[#C9A03D]" />
                <span>Innovation</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;