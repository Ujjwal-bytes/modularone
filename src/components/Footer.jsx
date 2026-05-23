import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowRight, Send, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const socialVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      rotate: 360,
      transition: { duration: 0.3 }
    }
  };

  const linkVariants = {
    initial: { x: 0 },
    hover: { 
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
      className="bg-[#0F172A] text-white pt-20 pb-10 px-6 md:px-12 lg:px-24 overflow-hidden relative"
    >
      {/* Animated background decoration */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#C9A03D]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#1A2A4F]/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.05, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16"
        >
          
          {/* BRAND & NEWSLETTER */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <motion.h3 
              className="text-2xl font-bold mb-6 tracking-tight"
              whileHover={{ x: 5 }}
            >
              Modular <span className="text-[#C9A03D]">One</span>
            </motion.h3>
            <motion.p 
              className="text-gray-400 mb-8 leading-relaxed text-sm max-w-sm"
              variants={itemVariants}
            >
              Crafting premium modular solutions for modern living. From Vasai to the heart of Maharashtra, we bring excellence to every corner.
            </motion.p>
            
            {/* Newsletter with animation */}
            <motion.form 
              onSubmit={handleSubscribe}
              className="relative max-w-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.input 
                type="email" 
                placeholder="Join our design list" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-[#C9A03D] transition-colors"
                whileFocus={{ borderColor: "#C9A03D", scale: 1.02 }}
              />
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute right-1.5 top-1.5 bg-green-500 p-2 rounded-full"
                  >
                    <CheckCircle size={18} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.button
                    key="subscribe"
                    type="submit"
                    className="absolute right-1.5 top-1.5 bg-[#C9A03D] p-2 rounded-full hover:bg-white hover:text-[#1A2A4F] transition-all group"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.h4 
              className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A03D] mb-8"
              whileHover={{ x: 5 }}
            >
              Explore
            </motion.h4>
            <ul className="space-y-4 text-sm">
              {['Home', 'Products', 'About Us', 'Gallery', 'Contact'].map((item) => (
                <motion.li 
                  key={item}
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <motion.span 
                      className="w-0 group-hover:w-4 h-[1px] bg-[#C9A03D] transition-all mr-0 group-hover:mr-2"
                      initial={{ width: 0 }}
                      whileHover={{ width: 16 }}
                    />
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SERVICES */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <motion.h4 
              className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A03D] mb-8"
              whileHover={{ x: 5 }}
            >
              Expertise
            </motion.h4>
            <ul className="space-y-4 text-sm">
              {['Modular Kitchens', 'Signature Wardrobes', 'Corporate Office Fit-outs', 'Living Room Concepts', 'Bedroom Suites'].map((service, idx) => (
                <motion.li 
                  key={service}
                  className="text-gray-400 cursor-pointer"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ 
                    opacity: 1, 
                    x: 5,
                    color: "#C9A03D"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <motion.h4 
              className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A03D] mb-8"
              whileHover={{ x: 5 }}
            >
              Connect
            </motion.h4>
            <ul className="space-y-6">
              {[
                { icon: MapPin, text: "Gokhiware, Vasai, Palghar, Maharashtra 401208", isMultiLine: true },
                { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: Mail, text: "info@modularone.com", href: "mailto:info@modularone.com" }
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  className={`flex items-start gap-4 ${item.isMultiLine ? '' : 'items-center'}`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon size={20} className="text-[#C9A03D] shrink-0" />
                  </motion.div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400 leading-relaxed">
                      {item.text}
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div 
          variants={fadeInUp}
          className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <motion.p 
            className="text-gray-500 text-[12px] tracking-wide"
            whileHover={{ color: "#C9A03D" }}
          >
            © {new Date().getFullYear()} Modular One Interiors. Excellence by Design.
          </motion.p>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  variants={socialVariants}
                  initial="initial"
                  whileHover="hover"
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A03D] transition-all cursor-pointer"
                  onMouseEnter={() => setIsHovered(idx)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
            <motion.div 
              className="h-4 w-[1px] bg-white/10 hidden md:block"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5 }}
            />
            <div className="flex gap-6 text-[11px] font-medium text-gray-500 uppercase tracking-widest">
              {['Privacy', 'Terms'].map((item, idx) => (
                <motion.a 
                  key={idx}
                  href="#"
                  className="hover:text-white transition-colors"
                  whileHover={{ x: 2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}