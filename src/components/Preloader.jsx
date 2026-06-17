// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Preloader = ({ onComplete }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     // A slightly shorter, more confident duration for a fast, snappy reveal
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//       if (onComplete) onComplete();
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [onComplete]);

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FDFDFC]"
//           exit={{ 
//             opacity: 0,
//             transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
//           }}
//         >
//           <div className="flex flex-col items-center">
//             {/* Brand Title with Letter Spacing */}
//             <motion.h1 
//               initial={{ opacity: 0, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//               className="text-3xl md:text-5xl font-light text-[#1A2A4F] tracking-[0.3em] uppercase"
//             >
//               Modular One
//             </motion.h1>

//             {/* Architectural Line Divider */}
//             <motion.div 
//               className="h-[1px] bg-[#C9A03D] mt-8"
//               initial={{ width: 0 }}
//               animate={{ width: "120px" }}
//               transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Preloader;



"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // A slightly shorter, more confident duration for a fast, snappy reveal
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FDFDFC]"
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
          }}
        >
          <div className="flex flex-col items-center">
            {/* Brand Title with Letter Spacing - Updated for Prime Furniture */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-5xl font-light text-[#1A2A4F] tracking-[0.3em] uppercase"
            >
              Prime Furniture
            </motion.h1>

            {/* Subtitle - New for Prime Furniture */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs md:text-sm text-gray-400 tracking-[0.4em] uppercase mt-3 font-light"
            >
              Since 2008
            </motion.p>

            {/* Architectural Line Divider */}
            <motion.div 
              className="h-[1px] bg-[#C9A03D] mt-6"
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Loading Progress Ring - New for Prime Furniture */}
            <motion.div
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div
                className="w-4 h-4 rounded-full border-2 border-[#C9A03D] border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-light">
                Loading Experience
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;