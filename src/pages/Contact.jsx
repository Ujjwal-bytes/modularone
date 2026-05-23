import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Upload, 
  Send, CheckCircle, X, Building, Calendar, 
  DollarSign, User, AlertCircle, ShieldCheck 
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', service: '',
    preferredDate: '', budget: '', message: ''
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const validateField = (name, value) => {
    if (!value && ['fullName', 'email', 'phone'].includes(name)) return 'This field is required';
    switch (name) {
      case 'fullName': return value.trim().length < 2 ? 'Name is too short' : '';
      case 'email': return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email' : '';
      case 'phone': return !/^\d{10}$/.test(value) ? 'Enter 10-digit number' : '';
      default: return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleWhatsApp = () => {
    const msg = `*Modular One Enquiry*%0A%0A*Name:* ${formData.fullName || 'Guest'}%0A*Service:* ${formData.service || 'Interiors'}`;
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact Us | Modular One - Premium Interiors</title>
      </Helmet>

      {/* --- HERO SECTION --- */}
      <motion.div 
        className="relative pt-24 pb-16 bg-gradient-to-br from-[#1A2A4F]/10 via-transparent to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 bg-[#1A2A4F]/5 border border-[#1A2A4F]/10">
            <MessageCircle className="w-4 h-4 text-[#1A2A4F]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#1A2A4F]">Consultation</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Design Your <span className="text-[#1A2A4F]">Legacy.</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-light">
            From blueprint to reality, our experts in Vasai are ready to transform your space. 
            Expect a response within <span className="font-semibold text-[#C9A03D]">120 minutes</span>.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT: INFO & TRUST --- */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-6">
              {[
                { icon: MapPin, label: 'Visit Gallery', val: 'Gokhiware, Vasai East', sub: 'Mumbai, MH - 401208' },
                { icon: Phone, label: 'Talk to Expert', val: '+91 98765 43210', sub: 'Available 10AM - 7PM' },
                { icon: Mail, label: 'Official Mail', val: 'info@modularone.com', sub: 'For project proposals' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex gap-5 p-6 rounded-3xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-[#1A2A4F]/5 transition-all duration-500 group"
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#1A2A4F]/5 flex items-center justify-center group-hover:bg-[#1A2A4F] transition-colors duration-500">
                    <item.icon className="text-[#1A2A4F] group-hover:text-[#C9A03D] transition-colors" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A03D] mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-gray-900">{item.val}</p>
                    <p className="text-sm text-gray-400">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours & Trust */}
            <div className="p-8 rounded-[2rem] bg-[#1A2A4F] text-white overflow-hidden relative">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Clock className="text-[#C9A03D]" size={24} />
                        <h3 className="text-xl font-bold">Operation Hours</h3>
                    </div>
                    <div className="space-y-3 opacity-90 font-light">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>Mon — Sat</span>
                            <span className="font-bold">10:00 - 19:00</span>
                        </div>
                        <div className="flex justify-between text-white/50">
                            <span>Sunday</span>
                            <span className="uppercase text-[10px] tracking-widest">Appointment Only</span>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#C9A03D]/20 flex items-center justify-center">
                            <ShieldCheck className="text-[#C9A03D]" size={20} />
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed">
                            Verified Premium Interior Partner in Vasai-Palghar Region.
                        </p>
                    </div>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#C9A03D]/10 rounded-full blur-3xl"></div>
            </div>
          </motion.div>

          {/* --- RIGHT: THE FORM --- */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-gray-50 overflow-hidden">
              <div className="bg-[#1A2A4F] p-10 text-white">
                <h3 className="text-3xl font-bold mb-2">Request Quote</h3>
                <p className="text-white/60 font-light">Enter details below to start your premium journey.</p>
              </div>

              {submitted ? (
                <div className="p-20 text-center animate-in fade-in zoom-in duration-700">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-500" size={48} />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">Message Received</h4>
                  <p className="text-gray-500">Check your phone shortly for a confirmation.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Group */}
                    {[
                      { name: 'fullName', label: 'Full Name', icon: User, type: 'text', ph: 'e.g. Rahul Sharma' },
                      { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', ph: '9876543210' }
                    ].map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{field.label}</label>
                        <div className="relative group">
                          <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1A2A4F] transition-colors" size={18} />
                          <input
                            type={field.type}
                            name={field.name}
                            onChange={handleChange}
                            placeholder={field.ph}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#1A2A4F]/5 focus:border-[#1A2A4F] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Service Selection - Custom Style */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Desired Service</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Kitchen', 'Wardrobe', 'Office', 'Living'].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, service: s }))}
                          className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                            formData.service === s 
                            ? 'bg-[#1A2A4F] border-[#1A2A4F] text-white shadow-lg' 
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Message</label>
                    <textarea
                      rows={4}
                      className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-[#1A2A4F]/5 focus:border-[#1A2A4F] outline-none transition-all resize-none font-medium"
                      placeholder="Briefly describe your project requirements..."
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-[2] bg-[#1A2A4F] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#0E1A33] transition-all shadow-xl shadow-[#1A2A4F]/20 flex items-center justify-center gap-3 active:scale-95"
                    >
                      <Send size={16} className="text-[#C9A03D]" />
                      Submit Proposal
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex-1 bg-[#25D366] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}