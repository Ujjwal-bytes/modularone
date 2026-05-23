import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Quote } from 'lucide-react';

const TeamCard = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="group relative flex flex-col bg-white overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-xl">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
        />

        {/* Social Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-lg shadow-md text-gray-600 hover:text-[#1A2A4F] transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Linkedin size={14} />
            </motion.a>
          )}
          {member.email && (
            <motion.a
              href={`mailto:${member.email}`}
              className="p-2 bg-white rounded-lg shadow-md text-gray-600 hover:text-[#1A2A4F] transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Mail size={14} />
            </motion.a>
          )}
        </div>

        {/* Quote Overlay */}
        <AnimatePresence>
          {isHovered && member.quote && (
            <motion.div 
              className="absolute inset-0 bg-black/60 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white rounded-xl p-4 max-w-[90%]">
                <Quote size={16} className="text-[#C9A03D] mb-1" />
                <p className="text-xs text-gray-700 italic">{member.quote}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Details */}
      <div className="text-center pt-4 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#C9A03D]">
          {member.role}
        </p>
        <h3 className="text-base font-bold text-gray-900 mt-1">
          {member.name}
        </h3>
        <p className="text-[11px] text-gray-500 mt-2">
          {member.experience}
        </p>
      </div>
    </motion.div>
  );
};

export default React.memo(TeamCard);