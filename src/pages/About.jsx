import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Fingerprint, 
  Layers, 
  Users, 
  Clock, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Zap, 
  Quote,
  Phone
} from 'lucide-react';
import TeamCard from '../components/TeamCard';

const teamMembers = [
  {
    id: 1,
    name: "N Jha",
    role: "Proprietor & Lead Designer",
    experience: "15+ years in interior design",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    linkedin: "#",
    email: "njha@modularone.com",
    quote: "Design is not just what it looks like, but how it works for you."
  },
  {
    id: 2,
    name: "Rajesh Verma",
    role: "Project Manager",
    experience: "10+ years in project management",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    linkedin: "#",
    email: "rajesh@modularone.com",
    quote: "Every project is a promise delivered with precision."
  },
  {
    id: 3,
    name: "Priya Deshmukh",
    role: "Senior Interior Designer",
    experience: "8+ years in design",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    linkedin: "#",
    email: "priya@modularone.com",
    quote: "Creating spaces that tell your unique story."
  },
  {
    id: 4,
    name: "Amit Singh",
    role: "Lead Carpenter",
    experience: "12+ years in craftsmanship",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    linkedin: "#",
    email: "amit@modularone.com",
    quote: "Precision in every cut, perfection in every joint."
  }
];

const brandAssets = {
  heroKitchen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80",
  workshop: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&auto=format&fit=crop&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80",
};

// Video URL
const HERO_VIDEO_URL = "/wood-cutting.mp4";

const stats = [
  { label: "Projects Completed", value: "250+", icon: CheckCircle },
  { label: "Happy Clients", value: "98%", icon: Star },
  { label: "Years Experience", value: "15+", icon: Clock },
  { label: "Team Members", value: "10+", icon: Users },
];

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

export default function About() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#C9A03D] selection:text-white overflow-hidden">
      <Helmet>
        <title>About Us | Modular One - Experts in Premium Interior Design</title>
        <meta name="description" content="Learn about Modular One's 15+ year legacy in crafting premium modular furniture. Meet our lead designers and explore our commitment to excellence and innovation." />
        <meta name="keywords" content="interior design experts, modular furniture legacy, best designers Vasai, furniture manufacturing India" />
        <link rel="canonical" href="https://modularone.in/about" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://modularone.in/about" />
        <meta property="og:title" content="About Us | Modular One - Experts in Premium Interior Design" />
        <meta property="og:description" content="Learn about Modular One's 15+ year legacy in crafting premium modular furniture." />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Us | Modular One" />
        <meta name="twitter:description" content="Learn about Modular One's 15+ year legacy in crafting premium modular furniture." />
      </Helmet>

      {/* Hero Section - ONLY VIDEO, NO TEXT */}
<section className="relative h-screen w-full overflow-hidden bg-black">

  {/* 1. Background Video Layer */}
  <div className="absolute inset-0 w-full h-full">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="/wood-cutting.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {/* Cinematic Dark Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
  </div>

  {/* 2. Content Layer */}
  <div className="absolute inset-0 flex items-center justify-center z-10">
    <div className="text-center px-4">

      {/* Main Tagline Wrapper */}
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {/* Left Decorative Danda */}
        <span className="text-white/30 text-4xl md:text-6xl font-serif select-none">॥</span>

        {/* Pure CSS Native Transform Wrapper - Forcefully Cancels the Italic Slant */}
        <div 
          className="inline-block"
          style={{ transform: 'skewX(-12deg)' }} // Yeh native CSS browser engine level par text ko left kheenchega
        >
          <h1
            className="text-white text-5xl md:text-7xl lg:text-9xl font-normal tracking-wider normal-case"
            style={{
              fontFamily: "'Samarkan', sans-serif",
              textShadow: "0 4px 15px rgba(0,0,0,0.6)",
            }}
          >
            modular one
          </h1>
        </div>

        {/* Right Decorative Danda */}
        <span className="text-white/30 text-4xl md:text-6xl font-serif select-none">॥</span>
      </div>

      {/* Subtitle */}
      <p className="text-white/80 text-xs md:text-sm tracking-[0.4em] uppercase mt-6 md:mt-8 font-light max-w-xs md:max-w-md mx-auto border-t border-white/20 pt-4">
        Premium Modular Furniture
      </p>

    </div>
  </div>

  {/* Bottom Scroll Indicator */}
  {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
    <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-light">Explore</span>
    <div className="w-[1px] h-8 bg-white/30"></div>
  </div> */}

</section>

      {/* Stats Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-16 bg-white border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-[#1A2A4F]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1A2A4F]/20 transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-[#1A2A4F]" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-gray-900 mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Story Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-6"
              variants={fadeInLeft}
            >
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-0.5 bg-[#C9A03D]"></span>
                <span className="text-xs font-semibold text-[#1A2A4F] uppercase tracking-wider">Our Story</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                From Vision to Reality — 
                <span className="text-[#1A2A4F]"> Since 2024</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Established in Gokhiware, Vasai, <span className="font-semibold text-[#1A2A4F]">Modular One</span> was born from a simple yet powerful idea — 
                to create modular interiors that blend precision engineering with artistic craftsmanship.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Under the visionary leadership of <span className="font-semibold text-[#1A2A4F]">N Jha</span>, our practice balances structural technology 
                with physical carpentry. Our permanently retained core team of 10+ architectural artisans manages 
                bespoke engineering workflows from raw wood milling to high-pressure surface adjustments.
              </p>
              <motion.div 
                className="flex items-center gap-4 pt-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex -space-x-2">
                  {teamMembers.slice(0, 3).map((member, i) => (
                    <motion.img 
                      key={i} 
                      src={member.image} 
                      alt={member.name} 
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">10+ Experts</span> ready to serve you
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeInRight}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img src={brandAssets.heroKitchen} alt="Modular One Premium Kitchen" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 bg-[#1A2A4F] rounded-full flex items-center justify-center"
                      >
                        <Quote className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">"Quality is not an act, it's a habit"</p>
                        <p className="text-xs text-gray-500">- N Jha, Proprietor</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-[#C9A03D]"></span>
              <span className="text-xs font-semibold text-[#1A2A4F] uppercase tracking-wider">Core Values</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <p className="text-gray-600">Our principles guide every project, from first sketch to final installation</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: ShieldCheck, title: "Quality First", description: "We use premium materials and German-engineered hardware for lasting durability.", color: "#1A2A4F" },
              { icon: TrendingUp, title: "Innovation", description: "Constantly evolving our techniques to bring you the latest in modular design.", color: "#C9A03D" },
              { icon: Users, title: "Client-Centric", description: "Your vision, our expertise — collaborative approach to every project.", color: "#1A2A4F" },
              { icon: Clock, title: "Timely Delivery", description: "Strict adherence to project timelines without compromising quality.", color: "#C9A03D" },
              { icon: Zap, title: "Precision Engineering", description: "Millimeter-perfect measurements for seamless installation.", color: "#1A2A4F" },
              { icon: Award, title: "Excellence", description: "Committed to exceeding expectations in every detail.", color: "#C9A03D" }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={index} 
                  className="group p-6 bg-gray-50 rounded-2xl cursor-pointer"
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300" 
                    style={{ backgroundColor: `${value.color}10` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: value.color }} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Workshop Image Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="relative py-24 bg-[#1A2A4F] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <img src={brandAssets.workshop} alt="Workshop" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2A4F] to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div 
            className="max-w-2xl"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-0.5 bg-[#C9A03D]"></span>
              <span className="text-xs font-semibold text-[#C9A03D] uppercase tracking-wider">Our Workshop</span>
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-4xl font-bold text-white mb-4">Where Craftsmanship Meets Technology</motion.h2>
            <motion.p variants={staggerItem} className="text-white/80 mb-8 leading-relaxed">
              Our state-of-the-art workshop in Vasai is equipped with precision German machinery and staffed by skilled artisans who bring decades of experience to every project.
            </motion.p>
            <motion.div variants={staggerItem} className="flex flex-wrap gap-6">
              {["Precision CNC Cutting", "Quality Control Lab", "In-House Assembly"].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className="w-5 h-5 text-[#C9A03D]" />
                  <span className="text-white/90 text-sm">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-[#C9A03D]"></span>
              <span className="text-xs font-semibold text-[#1A2A4F] uppercase tracking-wider">Meet Our Team</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Minds Behind The Magic</h2>
            <p className="text-gray-600">Dedicated professionals committed to bringing your vision to life</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id} 
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Quality Certifications */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-6"
              variants={fadeInLeft}
            >
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-0.5 bg-[#C9A03D]"></span>
                <span className="text-xs font-semibold text-[#1A2A4F] uppercase tracking-wider">Quality Assurance</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Committed to Excellence</h2>
              <p className="text-gray-600 leading-relaxed">
                We maintain rigorous quality standards across every aspect of our work, from material selection to final installation.
              </p>
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: Layers, title: "Premium Materials", desc: "Only highest-grade plywood and finishes" },
                  { icon: Fingerprint, title: "Traceable Supply Chain", desc: "Complete transparency in material sourcing" },
                  { icon: ShieldCheck, title: "Structural Warranty", desc: "Comprehensive coverage on all installations" }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer"
                      variants={staggerItem}
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 bg-[#1A2A4F]/10 rounded-lg flex items-center justify-center"
                      >
                        <Icon className="w-5 h-5 text-[#1A2A4F]" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeInRight}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg"
              >
                <motion.div 
                  className="text-center mb-6"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Award className="w-16 h-16 text-[#C9A03D] mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900">Our Certifications</h3>
                </motion.div>
                <motion.div 
                  className="space-y-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    "ISO 9001:2015 Quality Management",
                    "Green Certified Materials",
                    "German Hardware Partnership",
                    "Safety Standards Compliant"
                  ].map((cert, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3 text-sm text-gray-600"
                      variants={staggerItem}
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="w-4 h-4 text-[#C9A03D]" />
                      <span>{cert}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-20 bg-gradient-to-r from-[#1A2A4F] to-[#2A3D6B]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            variants={staggerItem}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Let's discuss your project and create something extraordinary together.
          </motion.p>
          <motion.div 
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A03D] hover:bg-[#B8922E] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg"
            >
              Book Free Consultation
              <ArrowRight size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <Phone size={18} />
              Call Us: +91 98765 43210
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}