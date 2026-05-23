# Project Documentation
## Product Showcase Website

---

## 1. Project Overview

This is a modern, responsive product showcase website built with React.js. The website is designed to display furniture and home decor products in an elegant, user-friendly interface with advanced filtering capabilities and smooth animations.

### Purpose
- Display product catalog with professional presentation
- Enable customers to browse and filter products by category, material, and finish
- Provide real-time search functionality
- Deliver an engaging user experience with animations
- Optimize for search engines (SEO)

### Target Audience
- Furniture and home decor businesses
- E-commerce product catalogs
- Showroom websites
- Portfolio/product display websites

---

## 2. Technology Stack

### Core Technologies
- **React.js** (v18.x) - Frontend framework with functional components and hooks
- **React Router** (v6.x) - Client-side routing and navigation
- **Framer Motion** (v10.x) - Animation library for smooth UI transitions
- **Tailwind CSS** (v3.x) - Utility-first CSS framework for styling
- **React Helmet** (v6.x) - SEO optimization with dynamic meta tags

### Build Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing for Tailwind

### Development Environment
- Node.js (v16+ recommended)
- npm or yarn package manager

---

## 3. Project Structure

```
modular-one/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo.png
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── ui/
│   │   ├── CategoryCard.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── ProductCard.jsx
│   │   └── [other components]
│   ├── data/
│   │   ├── furnitureImages.js
│   │   ├── products.js
│   │   └── productsData.json
│   ├── lib/
│   │   └── utils.js
│   ├── pages/
│   │   ├── Products.jsx
│   │   ├── Wishlist.jsx
│   │   └── [other pages]
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

### Key Files Explained

#### Configuration Files
- **package.json** - Project dependencies and scripts
- **vite.config.js** - Vite build configuration
- **tailwind.config.js** - Tailwind CSS customization
- **eslint.config.js** - Code linting rules

#### Source Files
- **App.jsx** - Main application component with routing setup
- **main.jsx** - Application entry point
- **Products.jsx** - Main products page with grid layout
- **FilterSidebar.jsx** - Advanced filtering component (desktop sidebar + mobile drawer)
- **ProductCard.jsx** - Individual product display card
- **products.js / productsData.json** - Product data source

#### Data Files
- **products.js** - JavaScript array of product objects
- **productsData.json** - JSON format product data
- **furnitureImages.js** - Image references and assets

---

## 4. Features

### 4.1 Product Catalog
- Responsive grid layout (1-4 columns based on screen size)
- Product cards with image, title, price, and details
- Hover effects and smooth transitions
- Category-based product organization

### 4.2 Advanced Filtering
- **Category Filter** - Filter by product categories (e.g., Sofa, Table, Chair)
- **Material Filter** - Filter by material type (e.g., Wood, Metal, Fabric)
- **Finish Filter** - Filter by finish type (e.g., Matte, Gloss, Natural)
- **Real-time Search** - Instant search by product name
- **Multi-filter Support** - Combine multiple filters simultaneously

### 4.3 Responsive Design
- **Mobile-first approach** - Optimized for mobile devices
- **Bottom Filter Drawer** - Slide-up filter panel on mobile
- **Sticky Desktop Sidebar** - Fixed filter sidebar on larger screens
- **Breakpoint-based layouts** - Adaptive grid for all screen sizes

### 4.4 Animations
- **Stagger Animations** - Sequential reveal of product cards
- **Hover Effects** - Smooth scale and shadow transitions
- **Page Transitions** - Smooth route changes
- **Filter Animations** - Animated filter application

### 4.5 SEO Optimization
- Dynamic meta tags with React Helmet
- Semantic HTML structure
- Optimized images with alt text
- Fast loading times with Vite build

---

## 5. Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git (for version control)

### Installation Steps

1. **Clone the repository**
```bash
git clone [repository-url]
cd modular-one
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Build for production**
```bash
npm run build
# or
yarn build
```

5. **Preview production build**
```bash
npm run preview
# or
yarn preview
```

---

## 6. Maintenance Guide

### 6.1 Adding/Updating Products

Products are stored in `src/data/products.js` and `src/data/productsData.json`. To add or update products:

**In products.js:**
```javascript
export const products = [
  {
    id: "product-1",
    name: "Product Name",
    category: "Category",
    material: "Material",
    finish: "Finish",
    price: 15000,
    image: "/path/to/image.jpg",
    description: "Product description"
  },
  // Add more products...
];
```

**In productsData.json:**
```json
[
  {
    "id": "product-1",
    "name": "Product Name",
    "category": "Category",
    "material": "Material",
    "finish": "Finish",
    "price": 15000,
    "image": "/path/to/image.jpg",
    "description": "Product description"
  }
]
```

### 6.2 Updating Categories/Materials/Finishes

Filter options are defined in the data files. To add new options:

1. Add the new category/material/finish to the respective array in the data file
2. Ensure all products have the new field populated
3. The filter sidebar will automatically include the new option

### 6.3 Updating Images

1. Place new images in the `src/assets/` or `public/` folder
2. Update the image path in the product data
3. For optimal performance, use WebP format and compress images
4. Recommended image size: 800x800px for product cards

### 6.4 Customizing Styling

**Tailwind Configuration:**
- Edit `tailwind.config.js` to add custom colors, fonts, or breakpoints
- Custom theme values can be added to the `theme` section

**Component Styling:**
- Components use Tailwind utility classes
- For custom CSS, add styles to component-specific CSS files or `src/index.css`

### 6.5 SEO Updates

Update meta tags in components using React Helmet:

```jsx
<Helmet>
  <title>Your Page Title</title>
  <meta name="description" content="Your page description" />
  <meta name="keywords" content="your, keywords, here" />
</Helmet>
```

### 6.6 Performance Optimization

- Use `npm run build` to create optimized production build
- Vite automatically minifies JavaScript and CSS
- Images should be optimized before adding to the project
- Use lazy loading for large image sets if needed

---

## 7. Troubleshooting

### Common Issues

**Issue: Development server not starting**
- Solution: Ensure Node.js v16+ is installed
- Delete `node_modules` and `package-lock.json`, then run `npm install`

**Issue: Styles not applying**
- Solution: Check Tailwind configuration
- Ensure `tailwind.config.js` is correctly set up
- Verify that `src/index.css` includes Tailwind directives

**Issue: Build errors**
- Solution: Check for missing dependencies
- Run `npm install` to ensure all packages are installed
- Check console for specific error messages

**Issue: Images not loading**
- Solution: Verify image paths in product data
- Ensure images are in the correct folder (`public/` or `src/assets/`)
- Check file extensions and case sensitivity

---

## 8. Dependencies

### Production Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "framer-motion": "^10.16.0",
  "react-helmet-async": "^1.3.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### Development Dependencies
```json
{
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.2.0",
  "tailwindcss": "^3.3.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0",
  "eslint": "^8.55.0"
}
```

---

## 9. Browser Compatibility

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 10. Security Considerations

- No sensitive data is stored in the client-side code
- All data is publicly accessible (showcase website)
- No authentication or payment processing
- Images and assets are served statically
- Regular dependency updates recommended for security patches

---

## 11. Performance Metrics

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.5s
- **Cumulative Layout Shift (CLS):** < 0.1

---

## 12. Support & Contact

For technical support or questions about this project:
- Review this documentation
- Check the README.md in the project root
- Contact the development team

---

*Document Version: 1.0*  
*Last Updated: May 2026*
