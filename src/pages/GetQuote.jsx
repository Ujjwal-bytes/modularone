import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sliders, Layout, CheckCircle2, Loader2 } from 'lucide-react';

export default function GetQuote() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'Kitchen Modular Layouts', details: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleSub = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API delay
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        className="min-h-screen bg-[#FAF9F5] flex items-center justify-center px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-6">
          <motion.div 
            className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="text-[#C9A03D]" size={40} />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-3xl font-light tracking-tight">Commission Received.</h2>
            <p className="text-gray-500 text-sm font-medium">Our drafting studio will review your parameters and contact you shortly.</p>
          </div>
          <motion.button 
            onClick={() => setStatus('idle')}
            className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 hover:text-gray-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Another Request
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] text-gray-900 antialiased selection:bg-gray-900 selection:text-white min-h-screen">
      <Helmet>
        <title>Begin a Commission — Modular One</title>
      </Helmet>

      <motion.div 
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-32 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Editorial Header */}
          <motion.div 
            className="lg:col-span-5 lg:sticky lg:top-32 space-y-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gray-900" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Project Intake</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-gray-900 leading-[1.05]">
                Begin an <br /> architectural <br />
                <span className="font-serif italic text-gray-400 underline decoration-gray-200 underline-offset-8">commission.</span>
              </h1>
              <p className="text-sm text-gray-500 font-medium tracking-wide leading-relaxed max-w-sm">
                Share your spatial objectives. Our studio will cross-reference your structural scope to formulate a precise tailored blueprint.
              </p>
            </div>

            {/* Micro Features */}
            <motion.div 
              className="grid grid-cols-1 gap-8 pt-8 border-t border-gray-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ staggerChildren: 0.1 }}
            >
              {[
                { icon: Sliders, title: "Millimeter Precision", desc: "Strict component tolerances." },
                { icon: Layout, title: "Bespoke Adaptations", desc: "Mapped directly to your floor frame." }
              ].map((feat, i) => (
                <motion.div 
                  key={i} 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <feat.icon size={18} className="text-[#C9A03D] shrink-0" />
                  <div>
                    <h3 className="text-[11px] font-black text-gray-900 tracking-widest uppercase">{feat.title}</h3>
                    <p className="text-[11px] text-gray-400 font-medium mt-1">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="rounded-3xl overflow-hidden aspect-video border border-gray-900/5 shadow-2xl bg-white hidden lg:block group">
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80" 
                alt="Luxury kitchen" 
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Premium Form */}
          <motion.div 
            className="lg:col-span-7 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/40 p-8 sm:p-14"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSub} className="space-y-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Identity */}
                <div className="group space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block group-focus-within:text-[#C9A03D] transition-colors">
                    Contact Identity
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-transparent border-b border-gray-100 pb-3 text-base font-light focus:outline-none focus:border-gray-900 transition-all rounded-none placeholder-gray-200" 
                    placeholder="Full Name"
                  />
                </div>

                {/* Mobile */}
                <div className="group space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block group-focus-within:text-[#C9A03D] transition-colors">
                    Mobile Coordinate
                  </label>
                  <input 
                    required 
                    type="tel" 
                    pattern="[0-9]{10}"
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    className="w-full bg-transparent border-b border-gray-100 pb-3 text-base font-light focus:outline-none focus:border-gray-900 transition-all rounded-none placeholder-gray-200" 
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="group space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block group-focus-within:text-[#C9A03D] transition-colors">
                  Domain Specialization
                </label>
                <select 
                  value={formData.service} 
                  onChange={e => setFormData({...formData, service: e.target.value})} 
                  className="w-full bg-transparent border-b border-gray-100 pb-3 text-base font-light focus:outline-none focus:border-gray-900 cursor-pointer rounded-none appearance-none"
                >
                  <option>Kitchen Modular Layouts</option>
                  <option>Premium Wardrobes</option>
                  <option>Remodeling</option>
                  <option>Corporate Office Stations</option>
                </select>
              </div>

              {/* Scope Details */}
              <div className="group space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block group-focus-within:text-[#C9A03D] transition-colors">
                  Scope Parameters
                </label>
                <textarea 
                  rows="4" 
                  value={formData.details} 
                  onChange={e => setFormData({...formData, details: e.target.value})} 
                  className="w-full bg-transparent border-b border-gray-100 pb-3 text-base font-light focus:outline-none focus:border-gray-900 transition-all placeholder-gray-200 resize-none rounded-none leading-relaxed"
                  placeholder="e.g., L-shaped modular blueprint, 120 sq. ft..."
                />
              </div>

              <motion.button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full py-5 bg-gray-900 text-white text-[11px] uppercase tracking-[0.3em] font-black hover:bg-[#C9A03D] transition-all duration-500 rounded-full flex items-center justify-center gap-3 group disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'submitting' ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>
                    <span>Generate Blueprint Estimate</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}