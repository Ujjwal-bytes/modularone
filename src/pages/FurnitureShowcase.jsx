import React, { useState, useEffect, useRef } from 'react';
import { 
  Ruler, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus,
  Info,
  Truck,
  Settings,
  Maximize2,
  Heart,
  Share2
} from 'lucide-react';

export default function FurnitureShowcase() {
  const [selectedMaterial, setSelectedMaterial] = useState('boucle-oatmeal');
  const [selectedImage, setSelectedImage] = useState(0);
  const [unit, setUnit] = useState('cm');
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const scrollContainerRef = useRef(null);

  const materials = [
    { id: 'boucle-oatmeal', name: 'Warm Bouclé', color: 'Oatmeal', hex: '#E8DCC4' },
    { id: 'velvet-olive', name: 'Premium Velvet', color: 'Olive', hex: '#5C6B4F' },
    { id: 'linen-sand', name: 'Organic Linen', color: 'Sand', hex: '#D4C4A8' },
    { id: 'leather-cognac', name: 'Full-Grain Leather', color: 'Cognac', hex: '#8B4513' },
  ];

  const images = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
  ];

  const dimensions = {
    cm: { height: 85, width: 210, depth: 95 },
    inches: { height: 33.5, width: 82.7, depth: 37.4 }
  };

  const hotspots = [
    { id: 1, x: 20, y: 30, name: 'Aria Sofa', price: '$3,450', link: '#' },
    { id: 2, x: 60, y: 45, name: 'Nova Coffee Table', price: '$890', link: '#' },
    { id: 3, x: 80, y: 25, name: 'Luna Floor Lamp', price: '$420', link: '#' },
    { id: 4, x: 35, y: 70, name: 'Stellar Accent Chair', price: '$1,280', link: '#' },
  ];

  const accordions = [
    { id: 'materials', title: 'Materials & Care', icon: Info },
    { id: 'shipping', title: 'Shipping & White-Glove Delivery', icon: Truck },
    { id: 'configurations', title: 'Modular Configurations', icon: Settings },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        setShowFloatingBar(scrollTop > 400);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F9F9FB]" ref={scrollContainerRef}>
      {/* Hero Section - Split Screen */}
      <section className="min-h-screen flex">
        {/* Left Side - Product Info */}
        <div className="w-1/2 bg-white flex flex-col justify-center px-16 lg:px-24">
          <div className="max-w-xl">
            <p className="text-sm tracking-[0.3em] text-neutral-400 uppercase mb-4">The Aria Collection</p>
            <h1 className="text-5xl lg:text-6xl font-serif text-neutral-900 leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Aria Sectional Sofa
            </h1>
            <p className="text-2xl text-neutral-600 mb-8">$4,850</p>
            
            <div className="space-y-6 mb-10">
              <p className="text-neutral-600 leading-relaxed">
                A masterpiece of contemporary comfort, the Aria sectional combines 
                architectural form with luxurious materials. Handcrafted in Italy 
                with sustainable hardwood frames and premium upholstery.
              </p>
            </div>

            {/* Material Selector */}
            <div className="mb-8">
              <p className="text-sm text-neutral-500 mb-3">Select Material</p>
              <div className="flex gap-3">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material.id)}
                    className={`relative w-12 h-12 rounded-full transition-all duration-300 ${
                      selectedMaterial === material.id 
                        ? 'ring-2 ring-neutral-900 ring-offset-2 scale-110' 
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: material.hex }}
                    title={`${material.name} - ${material.color}`}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                {materials.find(m => m.id === selectedMaterial)?.name} - {materials.find(m => m.id === selectedMaterial)?.color}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-neutral-900 text-white px-8 py-4 hover:bg-neutral-800 transition-colors duration-300 flex items-center justify-center gap-2">
                <span>Add to Project</span>
                <ArrowRight size={18} />
              </button>
              <button className="px-4 py-4 border border-neutral-200 hover:border-neutral-400 transition-colors duration-300">
                <Heart size={20} className="text-neutral-600" />
              </button>
              <button className="px-4 py-4 border border-neutral-200 hover:border-neutral-400 transition-colors duration-300">
                <Share2 size={20} className="text-neutral-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Image Gallery */}
        <div className="w-1/2 bg-[#F9F9FB] relative">
          <div className="h-full relative">
            {/* Main Image */}
            <div className="absolute inset-0 overflow-hidden">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    selectedImage === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                />
              ))}
            </div>

            {/* Thumbnail Selector */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-white scale-110' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={images[index]}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="py-24 px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-neutral-900 mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
            Technical Specifications
          </h2>

          <div className="grid grid-cols-2 gap-16">
            {/* Interactive Dimension Blueprint */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-neutral-900">Dimensions</h3>
                <button
                  onClick={() => setUnit(unit === 'cm' ? 'inches' : 'cm')}
                  className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:border-neutral-400 transition-colors duration-300"
                >
                  <Ruler size={16} />
                  <span className="text-sm">{unit === 'cm' ? 'Centimeters' : 'Inches'}</span>
                </button>
              </div>

              {/* Dimension Blueprint */}
              <div className="relative bg-[#F9F9FB] rounded-2xl p-12 border border-neutral-100">
                <svg viewBox="0 0 300 200" className="w-full h-auto">
                  {/* Sofa Outline */}
                  <rect x="50" y="40" width="200" height="120" rx="8" fill="none" stroke="#E5E5E5" strokeWidth="2" />
                  
                  {/* Height Dimension */}
                  <line x1="30" y1="40" x2="30" y2="160" stroke="#09090B" strokeWidth="1" />
                  <line x1="25" y1="40" x2="35" y2="40" stroke="#09090B" strokeWidth="1" />
                  <line x1="25" y1="160" x2="35" y2="160" stroke="#09090B" strokeWidth="1" />
                  <text x="20" y="105" textAnchor="middle" className="text-xs fill-neutral-900" fontSize="10">
                    {dimensions[unit].height}{unit === 'cm' ? 'cm' : '"'}
                  </text>

                  {/* Width Dimension */}
                  <line x1="50" y1="175" x2="250" y2="175" stroke="#09090B" strokeWidth="1" />
                  <line x1="50" y1="170" x2="50" y2="180" stroke="#09090B" strokeWidth="1" />
                  <line x1="250" y1="170" x2="250" y2="180" stroke="#09090B" strokeWidth="1" />
                  <text x="150" y="195" textAnchor="middle" className="text-xs fill-neutral-900" fontSize="10">
                    {dimensions[unit].width}{unit === 'cm' ? 'cm' : '"'}
                  </text>

                  {/* Depth Dimension */}
                  <line x1="260" y1="40" x2="260" y2="160" stroke="#09090B" strokeWidth="1" />
                  <line x1="255" y1="40" x2="265" y2="40" stroke="#09090B" strokeWidth="1" />
                  <line x1="255" y1="160" x2="265" y2="160" stroke="#09090B" strokeWidth="1" />
                  <text x="275" y="105" textAnchor="middle" className="text-xs fill-neutral-900" fontSize="10">
                    {dimensions[unit].depth}{unit === 'cm' ? 'cm' : '"'}
                  </text>
                </svg>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4 border border-neutral-100">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Height</p>
                    <p className="text-lg font-medium text-neutral-900">{dimensions[unit].height}{unit === 'cm' ? 'cm' : '"'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-neutral-100">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Width</p>
                    <p className="text-lg font-medium text-neutral-900">{dimensions[unit].width}{unit === 'cm' ? 'cm' : '"'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-neutral-100">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Depth</p>
                    <p className="text-lg font-medium text-neutral-900">{dimensions[unit].depth}{unit === 'cm' ? 'cm' : '"'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Specs */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-6">Product Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-neutral-100">
                  <span className="text-neutral-600">Frame Material</span>
                  <span className="text-neutral-900 font-medium">Kiln-dried Oak</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-100">
                  <span className="text-neutral-600">Seat Height</span>
                  <span className="text-neutral-900 font-medium">45cm / 17.7"</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-100">
                  <span className="text-neutral-600">Seat Depth</span>
                  <span className="text-neutral-900 font-medium">55cm / 21.6"</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-100">
                  <span className="text-neutral-600">Weight Capacity</span>
                  <span className="text-neutral-900 font-medium">150kg per seat</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-100">
                  <span className="text-neutral-600">Assembly</span>
                  <span className="text-neutral-900 font-medium">Partial assembly required</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-100">
                  <span className="text-neutral-600">Origin</span>
                  <span className="text-neutral-900 font-medium">Handcrafted in Italy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Accordions */}
      <section className="py-24 px-16 lg:px-24 bg-[#F9F9FB]">
        <div className="max-w-4xl mx-auto">
          {accordions.map((accordion) => (
            <div key={accordion.id} className="mb-4">
              <button
                onClick={() => toggleAccordion(accordion.id)}
                className="w-full bg-white rounded-2xl px-8 py-6 flex items-center justify-between border border-neutral-100 hover:border-neutral-200 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <accordion.icon size={20} className="text-neutral-600" />
                  <span className="text-lg font-medium text-neutral-900">{accordion.title}</span>
                </div>
                {activeAccordion === accordion.id ? (
                  <ChevronUp size={20} className="text-neutral-600" />
                ) : (
                  <ChevronDown size={20} className="text-neutral-600" />
                )}
              </button>
              
              {activeAccordion === accordion.id && (
                <div className="bg-white rounded-b-2xl px-8 py-6 border-x border-b border-neutral-100 mt-[-8px] transition-all duration-300">
                  {accordion.id === 'materials' && (
                    <div className="space-y-4 text-neutral-600">
                      <p><strong>Upholstery:</strong> Premium bouclé fabric with stain-resistant treatment. Professional cleaning recommended.</p>
                      <p><strong>Frame:</strong> Kiln-dried oak wood with mortise and tenon joinery.</p>
                      <p><strong>Cushions:</strong> High-density foam wrapped in down-feather blend for optimal comfort.</p>
                      <p><strong>Legs:</strong> Solid walnut with matte finish.</p>
                      <p className="pt-2 text-sm text-neutral-500">Care instructions: Vacuum regularly, spot clean with mild detergent. Avoid direct sunlight to prevent fading.</p>
                    </div>
                  )}
                  {accordion.id === 'shipping' && (
                    <div className="space-y-4 text-neutral-600">
                      <p><strong>White-Glove Delivery:</strong> Our premium service includes in-home delivery, unpacking, assembly, and placement in your room of choice.</p>
                      <p><strong>Delivery Timeline:</strong> 4-6 weeks from order confirmation.</p>
                      <p><strong>Shipping Areas:</strong> Continental US, Canada, and select European countries.</p>
                      <p><strong>Returns:</strong> 30-day return policy with free pickup. Items must be in original condition.</p>
                    </div>
                  )}
                  {accordion.id === 'configurations' && (
                    <div className="space-y-4 text-neutral-600">
                      <p><strong>Modular Design:</strong> The Aria sectional can be configured in multiple arrangements to suit your space.</p>
                      <p><strong>Available Configurations:</strong></p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>3-Seater (shown)</li>
                        <li>2-Seater + Chaise</li>
                        <li>L-Shape Configuration</li>
                        <li>U-Shape Configuration</li>
                      </ul>
                      <p className="pt-2 text-sm text-neutral-500">Contact our design consultants for custom configurations.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Shop the Room Section */}
      <section className="py-24 px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] text-neutral-400 uppercase mb-4">Complete the Look</p>
            <h2 className="text-3xl font-serif text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Shop the Room
            </h2>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-[#F9F9FB]">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&h=900&fit=crop"
              alt="Fully furnished room"
              className="w-full h-[600px] object-cover"
              loading="lazy"
            />

            {/* Interactive Hotspots */}
            {hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className="absolute cursor-pointer"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
              >
                {/* Pulsing Dot */}
                <div className="relative">
                  <div className="w-4 h-4 bg-white rounded-full border-2 border-neutral-900 animate-pulse" />
                  <div className="absolute inset-0 w-4 h-4 bg-neutral-900 rounded-full animate-ping opacity-75" />
                </div>

                {/* Hover Card */}
                {hoveredHotspot === hotspot.id && (
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-2xl p-4 w-48 z-10 transition-all duration-300">
                    <p className="font-medium text-neutral-900 mb-1">{hotspot.name}</p>
                    <p className="text-neutral-600 mb-3">{hotspot.price}</p>
                    <a
                      href={hotspot.link}
                      className="text-sm text-neutral-900 hover:underline flex items-center gap-1"
                    >
                      View Product <ArrowRight size={14} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Persistent Floating Summary Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 shadow-2xl transition-transform duration-300 z-50 ${
          showFloatingBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img
              src={images[selectedImage]}
              alt="Product thumbnail"
              className="w-16 h-16 rounded-lg object-cover border border-neutral-100"
              loading="lazy"
            />
            <div>
              <p className="font-medium text-neutral-900">Aria Sectional Sofa</p>
              <p className="text-sm text-neutral-600">
                {materials.find(m => m.id === selectedMaterial)?.name} - {materials.find(m => m.id === selectedMaterial)?.color}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {materials.slice(0, 4).map((material) => (
                <button
                  key={material.id}
                  onClick={() => setSelectedMaterial(material.id)}
                  className={`w-8 h-8 rounded-full transition-all duration-300 ${
                    selectedMaterial === material.id 
                      ? 'ring-2 ring-neutral-900 ring-offset-2' 
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: material.hex }}
                />
              ))}
            </div>
            <div className="w-px h-8 bg-neutral-200" />
            <p className="text-xl font-medium text-neutral-900">$4,850</p>
            <button className="bg-neutral-900 text-white px-6 py-3 hover:bg-neutral-800 transition-colors duration-300 flex items-center gap-2">
              <span>Inquire</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for floating bar */}
      <div className="h-24" />
    </div>
  );
}
