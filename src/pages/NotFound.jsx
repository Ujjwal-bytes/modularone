import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Construction } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-24">
      <Helmet>
        <title>404 - Page Not Found | Modular One</title>
      </Helmet>

      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-24 h-24 bg-[#1A2A4F]/5 rounded-3xl flex items-center justify-center">
            <Construction className="text-[#C9A03D]" size={48} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-8xl md:text-9xl font-black text-[#1A2A4F] mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
        >
          Design <span className="text-[#C9A03D]">Interrupted.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-500 text-lg mb-12 max-w-md mx-auto"
        >
          The space you're looking for doesn't exist or has been moved. 
          Let's get you back to our curated collections.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1A2A4F] text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#0E1A33] transition-all active:scale-95 shadow-xl shadow-[#1A2A4F]/20"
          >
            <Home size={18} className="text-[#C9A03D]" />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-100 text-gray-900 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
