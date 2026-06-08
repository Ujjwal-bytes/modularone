import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { ArrowRight, Sliders, Layout, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function GetQuote() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: 'Kitchen Modular Layouts', details: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Identity required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = '10-digit mobile required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSub = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    
    try {
      // Use the same VITE_ environment variables or direct IDs
      const SERVICE_ID = 'service_your_id';
      const TEMPLATE_ID = 'template_your_id';
      const PUBLIC_KEY = 'your_public_key';

      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
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
        <meta name="description" content="Request a tailored blueprint and estimate for your premium modular interior project. Modular One provides bespoke kitchens, wardrobes, and office fit-outs." />
        <link rel="canonical" href="https://modularone.in/get-quote" />
      </Helmet>

      <motion.div 
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-32 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
            >
              <AlertCircle size={18} />
              Submission failed. Please verify your parameters or contact us via WhatsApp.
            </motion.div>
          )}
        </AnimatePresence>

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
            <form ref={formRef} onSubmit={handleSub} className="space-y-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Identity */}
                <div className="group space-y-2">
                  <label className={`text-[10px] uppercase tracking-[0.2em] font-bold block transition-colors ${errors.name ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#C9A03D]'}`}>
                    Contact Identity
                  </label>
                  <input 
                    name="name"
                    type="text" 
                    value={formData.name} 
                    onChange={e => {
                      setFormData({...formData, name: e.target.value});
                      if (errors.name) setErrors({...errors, name: ''});
                    }} 
                    className={`w-full bg-transparent border-b pb-3 text-base font-light focus:outline-none transition-all rounded-none placeholder-gray-200 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-gray-900'}`} 
                    placeholder="Full Name"
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-bold tracking-wide">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div className="group space-y-2">
                  <label className={`text-[10px] uppercase tracking-[0.2em] font-bold block transition-colors ${errors.phone ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#C9A03D]'}`}>
                    Mobile Coordinate
                  </label>
                  <input 
                    name="phone"
                    type="tel" 
                    value={formData.phone} 
                    onChange={e => {
                      setFormData({...formData, phone: e.target.value});
                      if (errors.phone) setErrors({...errors, phone: ''});
                    }} 
                    className={`w-full bg-transparent border-b pb-3 text-base font-light focus:outline-none transition-all rounded-none placeholder-gray-200 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-gray-900'}`} 
                    placeholder="10-Digit Mobile"
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-bold tracking-wide">{errors.phone}</p>}
                </div>
              </div>

              {/* Email Integration */}
              <div className="group space-y-2">
                <label className={`text-[10px] uppercase tracking-[0.2em] font-bold block transition-colors ${errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#C9A03D]'}`}>
                  Electronic Mail
                </label>
                <input 
                  name="email"
                  type="email" 
                  value={formData.email} 
                  onChange={e => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }} 
                  className={`w-full bg-transparent border-b pb-3 text-base font-light focus:outline-none transition-all rounded-none placeholder-gray-200 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-gray-900'}`} 
                  placeholder="email@example.com"
                />
                {errors.email && <p className="text-[10px] text-red-500 font-bold tracking-wide">{errors.email}</p>}
              </div>

              {/* Service Selection */}
              <div className="group space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block group-focus-within:text-[#C9A03D] transition-colors">
                  Domain Specialization
                </label>
                <select 
                  name="service"
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
                  name="details"
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