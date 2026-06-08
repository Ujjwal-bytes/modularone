export const products = [
  // KITCHENS (8 products)
  {
    id: 1,
    name: "Crystal Gloss Modular Kitchen",
    category: "kitchen",
    subcategory: "high-gloss-kitchen",
    price: "150000 - 350000",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 24,
    material: "BWP Plywood + Acrylic Finish",
    finish: "Glossy",
    thickness: "18mm",
    hardware: "Blum",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "15-20 days",
    customization: true,
    inStock: true,
    features: ["Soft-close hinges", "Waterproof plywood", "Easy clean surface", "Modular accessories"],
    included: ["Cabinet body", "Shutters", "Handles", "Installation"],
    excluded: ["Chimney", "Hob", "Sink"],
    tags: ["best-seller", "premium"],
    dimensions: "Custom as per layout",
    colors: ["White", "Matte Black", "Wooden", "Beige"]
  },
  {
    id: 2,
    name: "Matte Finish L-Shaped Kitchen",
    category: "kitchen",
    subcategory: "modern-kitchen",
    price: "120000 - 280000",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    ],
    rating: 4.6,
    reviews: 18,
    material: "Marine Plywood + Laminate",
    finish: "Matte",
    thickness: "18mm",
    hardware: "Hettich",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "15-20 days",
    customization: true,
    inStock: true,
    features: ["Soft-close drawers", "Termite proof", "Scratch resistant", "Anti-bacterial surface"],
    included: ["Cabinet body", "Shutters", "Handles", "Installation"],
    excluded: ["Chimney", "Hob", "Sink"],
    tags: ["popular"],
    dimensions: "Custom as per layout",
    colors: ["Grey", "White", "Beige", "Cream"]
  },
  {
    id: 3,
    name: "Parallel Kitchen with Island",
    category: "kitchen",
    subcategory: "handleless-kitchen",
    price: "200000 - 450000",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
    ],
    rating: 4.9,
    reviews: 32,
    material: "BWP Plywood + Acrylic",
    finish: "Glossy",
    thickness: "22mm",
    hardware: "Blum",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "20-25 days",
    customization: true,
    inStock: true,
    features: ["Kitchen island included", "Soft-close everywhere", "Waterproof", "Premium handles"],
    included: ["Cabinet body", "Shutters", "Island", "Handles", "Installation"],
    excluded: ["Chimney", "Hob", "Sink"],
    tags: ["premium", "luxury"],
    dimensions: "Custom as per layout",
    colors: ["White", "Black", "Wooden"]
  },
  {
    id: 4,
    name: "U-Shaped Modular Kitchen",
    category: "kitchen",
    subcategory: "traditional-kitchen",
    price: "180000 - 400000",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    ],
    rating: 4.7,
    reviews: 21,
    material: "Marine Plywood + Laminate",
    finish: "Matte",
    thickness: "18mm",
    hardware: "Ebco",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "18-22 days",
    customization: true,
    inStock: true,
    features: ["Maximum storage", "Corner solutions", "Soft-close", "Easy maintenance"],
    included: ["Cabinet body", "Shutters", "Corner units", "Handles", "Installation"],
    excluded: ["Chimney", "Hob", "Sink"],
    tags: ["storage"],
    dimensions: "Custom as per layout",
    colors: ["White", "Grey", "Beige"]
  },
  {
    id: 5,
    name: "Straight Kitchen Compact",
    category: "kitchen",
    subcategory: "modern-kitchen",
    price: "80000 - 180000",
    images: [
      "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
    ],
    rating: 4.5,
    reviews: 15,
    material: "MDF + Laminate",
    finish: "Glossy",
    thickness: "16mm",
    hardware: "Ebco",
    warranty: "3 Years Hardware, 5 Years Material",
    leadTime: "12-15 days",
    customization: true,
    inStock: true,
    features: ["Space efficient", "Budget friendly", "Modern design", "Quick installation"],
    included: ["Cabinet body", "Shutters", "Handles", "Installation"],
    excluded: ["Chimney", "Hob", "Sink"],
    tags: ["budget", "compact"],
    dimensions: "Custom as per layout",
    colors: ["White", "Cream", "Grey"]
  },
  {
    id: 6,
    name: "Wooden Finish Kitchen",
    category: "kitchen",
    subcategory: "traditional-kitchen",
    price: "160000 - 380000",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 28,
    material: "BWP Plywood + Wooden Finish",
    finish: "Wooden",
    thickness: "18mm",
    hardware: "Hettich",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "18-22 days",
    customization: true,
    inStock: true,
    features: ["Natural wood look", "Durable finish", "Soft-close", "Premium hardware"],
    included: ["Cabinet body", "Shutters", "Handles", "Installation"],
    excluded: ["Chimney", "Hob", "Sink"],
    tags: ["premium", "wooden"],
    dimensions: "Custom as per layout",
    colors: ["Oak", "Walnut", "Teak", "Mahogany"]
  },
  {
    id: 7,
    name: "Two-Tone Modern Kitchen",
    category: "kitchen",
    subcategory: "modular-kitchen",
    price: "170000 - 390000",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
    ],
    rating: 4.7,
    reviews: 19,
    material: "BWP Plywood + Acrylic + Laminate",
    finish: "Mixed",
    thickness: "18mm",
    hardware: "Blum",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "18-22 days",
    customization: true,
    inStock: false,
    features: ["Two-tone design", "Modern aesthetics", "Soft-close", "Custom color combinations"],
    included: ["Cabinet body", "Shutters", "Handles", "Installation"],
    excluded: ["Chimney", "Hob", "Sink"],
    tags: ["modern", "trending"],
    dimensions: "Custom as per layout",
    colors: ["White+Grey", "Black+Wood", "Beige+White"]
  },
  {
    id: 8,
    name: "Italian Style Kitchen",
    category: "kitchen",
    subcategory: "modular-kitchen",
    price: "250000 - 550000",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop"
    ],
    rating: 4.9,
    reviews: 35,
    material: "BWP Plywood + High Gloss Acrylic",
    finish: "High Gloss",
    thickness: "22mm",
    hardware: "Blum Premium",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "25-30 days",
    customization: true,
    inStock: false,
    features: ["Italian design", "Handleless doors", "Premium finish", "Luxury hardware"],
    included: ["Cabinet body", "Shutters", "Premium hardware", "Installation"],
    excluded: ["Chimney", "Hob", "Sink"],
    tags: ["luxury", "italian"],
    dimensions: "Custom as per layout",
    colors: ["White", "Black", "Red", "Beige"]
  },

  // WARDROBES
  {
    id: 9,
    name: "Sliding Door Wardrobe",
    category: "wardrobe",
    subcategory: "sliding-wardrobe",
    price: "45000 - 120000",
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop"
    ],
    rating: 4.6,
    reviews: 22,
    material: "BWP Plywood + Laminate",
    finish: "Matte",
    thickness: "18mm",
    hardware: "Hettich",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "12-15 days",
    customization: true,
    inStock: true,
    features: ["Space saving", "Smooth sliding", "Mirror option", "Internal organizers"],
    included: ["Cabinet body", "Shutters", "Hardware", "Installation"],
    excluded: ["Internal accessories"],
    tags: ["space-saving", "popular"],
    dimensions: "Custom as per space",
    colors: ["White", "Grey", "Wooden", "Beige"]
  },
  {
    id: 10,
    name: "Hinged Door Wardrobe",
    category: "wardrobe",
    subcategory: "openable-wardrobe",
    price: "40000 - 100000",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&h=600&fit=crop"
    ],
    rating: 4.5,
    reviews: 18,
    material: "Marine Plywood + Laminate",
    finish: "Glossy",
    thickness: "18mm",
    hardware: "Ebco",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "10-12 days",
    customization: true,
    inStock: true,
    features: ["Full access", "Traditional design", "Soft-close hinges", "Custom interiors"],
    included: ["Cabinet body", "Shutters", "Hardware", "Installation"],
    excluded: ["Internal accessories"],
    tags: ["traditional", "full-access"],
    dimensions: "Custom as per space",
    colors: ["White", "Cream", "Wooden"]
  },
  {
    id: 11,
    name: "Walk-in Wardrobe System",
    category: "wardrobe",
    subcategory: "walk-in-closet",
    price: "8000 - 200000",
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 15,
    material: "BWP Plywood + Laminate + Glass",
    finish: "Mixed",
    thickness: "18mm",
    hardware: "Hettich Premium",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "18-22 days",
    customization: true,
    inStock: true,
    features: ["Luxury design", "Glass shutters", "LED lighting", "Premium organizers"],
    included: ["Cabinet body", "Shutters", "Hardware", "LED lights", "Installation"],
    excluded: ["Accessories"],
    tags: ["luxury", "walk-in"],
    dimensions: "Custom as per space",
    colors: ["White+Glass", "Wood+Glass", "Grey+Glass"]
  },
  {
    id: 12,
    name: "Kids Wardrobe",
    category: "wardrobe",
    subcategory: "openable-wardrobe",
    price: "25000 - 60000",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&h=600&fit=crop"
    ],
    rating: 4.4,
    reviews: 12,
    material: "MDF + Laminate",
    finish: "Matte",
    thickness: "16mm",
    hardware: "Ebco",
    warranty: "3 Years Hardware, 5 Years Material",
    leadTime: "8-10 days",
    customization: true,
    inStock: true,
    features: ["Kid-friendly design", "Safe edges", "Colorful options", "Easy to clean"],
    included: ["Cabinet body", "Shutters", "Hardware", "Installation"],
    excluded: ["Internal accessories"],
    tags: ["kids", "budget"],
    dimensions: "Custom as per space",
    colors: ["Pink", "Blue", "White", "Yellow"]
  },

  // OFFICE
  {
    id: 13,
    name: "Executive Office Setup",
    category: "office",
    subcategory: "desk",
    price: "150000 - 350000",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 16,
    material: "BWP Plywood + Laminate + Veneer",
    finish: "Matte + Wooden",
    thickness: "18mm",
    hardware: "Hettich",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "18-22 days",
    customization: true,
    inStock: true,
    features: ["Premium design", "Cable management", "Storage solutions", "Acoustic panels"],
    included: ["Desk", "Storage units", "Cabinets", "Installation"],
    excluded: ["Chair", "Electrical"],
    tags: ["executive", "premium"],
    dimensions: "Custom as per space",
    colors: ["Walnut", "Oak", "White+Wood", "Grey"]
  },
  {
    id: 14,
    name: "Modern Workstation",
    category: "office",
    subcategory: "desk",
    price: "25000 - 60000",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop"
    ],
    rating: 4.5,
    reviews: 24,
    material: "Particle Board + Laminate",
    finish: "Matte",
    thickness: "16mm",
    hardware: "Ebco",
    warranty: "3 Years Hardware, 5 Years Material",
    leadTime: "10-12 days",
    customization: true,
    inStock: true,
    features: ["Ergonomic design", "Cable management", "Partition options", "Budget friendly"],
    included: ["Desk", "Partition", "Storage", "Installation"],
    excluded: ["Chair", "Electrical"],
    tags: ["budget", "modern"],
    dimensions: "Standard sizes available",
    colors: ["White", "Grey", "Beige", "Blue"]
  },

  // LIVING
  {
    id: 19,
    name: "TV Unit with Storage",
    category: "living",
    subcategory: "tv-unit",
    price: "30000 - 80000",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=600&fit=crop"
    ],
    rating: 4.5,
    reviews: 17,
    material: "BWP Plywood + Laminate",
    finish: "Matte",
    thickness: "18mm",
    hardware: "Hettich",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "10-12 days",
    customization: true,
    inStock: true,
    features: ["Cable management", "Drawers and shelves", "Modern design", "LED lighting option"],
    included: ["TV unit", "Hardware", "Installation"],
    excluded: ["TV", "Decor"],
    tags: ["popular", "modern"],
    dimensions: "Custom as per space",
    colors: ["White", "Wooden", "Grey", "Black"]
  },
  {
    id: 22,
    name: "Coffee Table with Storage",
    category: "living",
    subcategory: "coffee-table",
    price: "12000 - 30000",
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop"
    ],
    rating: 4.5,
    reviews: 19,
    material: "BWP Plywood + Veneer",
    finish: "Wooden",
    thickness: "18mm",
    hardware: "Hettich",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "8-10 days",
    customization: true,
    inStock: true,
    features: ["Storage drawers", "Solid wood top", "Modern design", "Durable"],
    included: ["Coffee table", "Hardware"],
    excluded: [],
    tags: ["wooden", "storage"],
    dimensions: "Standard sizes",
    colors: ["Walnut", "Oak", "Teak", "White"]
  },

  // BEDROOM
  {
    id: 23,
    name: "King Size Bed with Storage",
    category: "bedroom",
    subcategory: "king-bed",
    price: "45000 - 120000",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop"
    ],
    rating: 4.7,
    reviews: 28,
    material: "BWP Plywood + Laminate",
    finish: "Matte",
    thickness: "18mm",
    hardware: "Hettich",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "12-15 days",
    customization: true,
    inStock: true,
    features: ["Hydraulic storage", "Soft-close", "Modern headboard", "High capacity"],
    included: ["Bed frame", "Storage", "Headboard", "Installation"],
    excluded: ["Mattress"],
    tags: ["storage", "popular"],
    dimensions: "King/Queen/Custom",
    colors: ["White", "Grey", "Wooden", "Beige"]
  },
  {
    id: 26,
    name: "Bedside Tables (Pair)",
    category: "bedroom",
    subcategory: "side-table",
    price: "8000 - 20000",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop"
    ],
    rating: 4.4,
    reviews: 14,
    material: "BWP Plywood + Laminate",
    finish: "Matte",
    thickness: "18mm",
    hardware: "Ebco",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "7-10 days",
    customization: true,
    inStock: true,
    features: ["Storage drawer", "Modern design", "Durable", "Easy maintenance"],
    included: ["2 bedside tables", "Hardware"],
    excluded: [],
    tags: ["bedside", "pair"],
    dimensions: "Standard sizes",
    colors: ["White", "Wooden", "Grey", "Black"]
  },

  // DOORS
  {
    id: 29,
    name: "Modern Interior Doors",
    category: "doors",
    subcategory: "internal-door",
    price: "8000 - 20000",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"
    ],
    rating: 4.4,
    reviews: 20,
    material: "BWP Plywood + Veneer",
    finish: "Matte",
    thickness: "35mm",
    hardware: "Hettich",
    warranty: "5 Years Hardware, 10 Years Ply",
    leadTime: "8-10 days",
    customization: true,
    inStock: true,
    features: ["Solid core", "Sound proof", "Premium finish", "Various designs"],
    included: ["Door", "Hardware"],
    excluded: ["Frame"],
    tags: ["doors", "interior"],
    dimensions: "Standard sizes",
    colors: ["White", "Wooden", "Grey"]
  }
];

export const categories = [
  { id: 'kitchen', name: 'Kitchen', count: 8, icon: 'Utensils', 
    subcategories: [
      { id: 'modular-kitchen', name: 'Modular Kitchen' },
      { id: 'traditional-kitchen', name: 'Traditional Kitchen' },
      { id: 'modern-kitchen', name: 'Modern Kitchen' },
      { id: 'handleless-kitchen', name: 'Handleless Kitchen' },
      { id: 'high-gloss-kitchen', name: 'High Gloss Kitchen' }
    ]
  },
  { id: 'wardrobe', name: 'Wardrobe', count: 6, icon: 'Shirt',
    subcategories: [
      { id: 'sliding-wardrobe', name: 'Sliding Wardrobe' },
      { id: 'openable-wardrobe', name: 'Openable Wardrobe' },
      { id: 'walk-in-closet', name: 'Walk-in Closet' }
    ]
  },
  { id: 'living', name: 'Living Room', count: 5, icon: 'Sofa',
    subcategories: [
      { id: 'tv-unit', name: 'TV Unit' },
      { id: 'coffee-table', name: 'Coffee Table' },
      { id: 'sofa-set', name: 'Sofa Set' }
    ]
  },
  { id: 'bedroom', name: 'Bedroom', count: 4, icon: 'Bed',
    subcategories: [
      { id: 'king-bed', name: 'King Size Bed' },
      { id: 'queen-bed', name: 'Queen Size Bed' },
      { id: 'side-table', name: 'Side Table' }
    ]
  },
  { id: 'office', name: 'Office', count: 4, icon: 'Briefcase',
    subcategories: [
      { id: 'desk', name: 'Executive Desk' },
      { id: 'chair', name: 'Office Chair' },
      { id: 'storage', name: 'Office Storage' }
    ]
  },
  { id: 'doors', name: 'Doors', count: 3, icon: 'Frame',
    subcategories: [
      { id: 'main-door', name: 'Main Door' },
      { id: 'internal-door', name: 'Internal Door' }
    ]
  }
];

export const materials = ['Plywood', 'MDF', 'Particle Board', 'Marine Ply'];
export const finishes = ['Matte', 'Glossy', 'Laminate', 'Acrylic', 'Wooden'];
export const priceRanges = [
  { label: 'Under ₹50k', min: 0, max: 50000 },
  { label: '₹50k - ₹1L', min: 50000, max: 100000 },
  { label: '₹1L - ₹3L', min: 100000, max: 300000 },
  { label: 'Over ₹3L', min: 300000, max: 1000000 }
];
