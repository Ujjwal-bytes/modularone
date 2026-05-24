import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Upload, 
  Send, CheckCircle, X, Building, Calendar, 
  DollarSign, User, AlertCircle, ShieldCheck, Navigation,
  Car, Train, Bus, Compass, ExternalLink
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
  const [mapLoaded, setMapLoaded] = useState(false);

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
                { icon: MapPin, label: 'Visit Gallery', val: 'Golani Naka, Vasai East', sub: 'Vasai-Virar, MH - 401208' },
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
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
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

        {/* --- PREMIUM MAP SECTION --- */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-[#1A2A4F]/5 border border-[#1A2A4F]/10">
              <MapPin className="w-4 h-4 text-[#1A2A4F]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#1A2A4F]">Find Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Visit Our <span className="text-[#1A2A4F]">Experience Center</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Walk through our curated gallery and experience premium modular designs in person.
            </p>
          </div>

          {/* Enhanced Map Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
            {/* Loading State */}
            {!mapLoaded && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-[#1A2A4F]/20 border-t-[#1A2A4F] rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500 text-sm">Loading map...</p>
                </div>
              </div>
            )}
            
            {/* Google Maps Embed - Golani Naka Correct Location */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.123456789012!2d72.858652!3d19.409374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a92edf56d075%3A0x5f09700c1bbc865b!2sGolani%20Naka%2C%20Vasai%20East!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Modular One Location - Golani Naka, Vasai East"
              className="w-full transition-opacity duration-500"
              onLoad={() => setMapLoaded(true)}
            ></iframe>
            
            {/* Premium Map Overlay Card */}
            <div className="absolute top-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/20 z-20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A2A4F] to-[#2A3D6B] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Navigation size={20} className="text-[#C9A03D]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Golani Naka, Vasai East</h4>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Golani Naka, Vasai East, Vasai-Virar,<br />
                    Maharashtra - 401208
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-green-50 text-green-600 font-medium">Open Until 7PM</span>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">Free Parking</span>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Golani+Naka+Vasai+East+Mumbai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#C9A03D] hover:text-[#1A2A4F] transition-colors group/link"
                  >
                    Get Directions
                    <ExternalLink size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          </div>

          {/* How to Reach Section */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">How to Reach Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Car, title: 'By Car', desc: '10 min from Vasai Railway Station', detail: 'Ample parking available' },
                { icon: Train, title: 'By Train', desc: 'Nearest: Vasai Road Station', detail: 'Auto available from station' },
                { icon: Bus, title: 'By Bus', desc: 'Golani Naka Bus Stop', detail: 'Well connected by MSRTC buses' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1A2A4F]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-[#1A2A4F]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Nearby Landmarks - Enhanced */}
          <div className="mt-10">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Nearby Landmarks</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Vasai Railway Station', dist: '3.5 km', time: '10 min', icon: Train },
                { name: 'Golani Naka Bus Stop', dist: '0.2 km', time: '2 min walk', icon: Bus },
                { name: 'Sai City Mall', dist: '2.8 km', time: '8 min', icon: Building },
                { name: 'Navghar Beach', dist: '6.2 km', time: '15 min', icon: Compass }
              ].map((landmark, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1A2A4F]/5 flex items-center justify-center group-hover:bg-[#1A2A4F] transition-colors">
                    <landmark.icon size={12} className="text-[#1A2A4F] group-hover:text-[#C9A03D] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-gray-800">{landmark.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[9px] text-gray-400">{landmark.dist}</p>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <p className="text-[9px] text-[#C9A03D] font-medium">{landmark.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Note */}
          <div className="mt-8 p-5 rounded-2xl bg-[#1A2A4F]/5 border border-[#1A2A4F]/10 text-center">
            <p className="text-sm text-gray-600">
              📍 <span className="font-semibold">Free Design Consultation Available</span> — Walk in anytime between 10 AM - 7 PM
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}