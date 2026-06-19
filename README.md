# Modular One - Premium Modular Furniture Website

A complete, production-ready furniture showcasing website for Modular One, featuring premium modular kitchens, wardrobes, and office interiors.

## Features

- **Home Page**: Hero section, featured categories, best sellers, why choose us, testimonials, and Instagram feed
- **Products Page**: Advanced filtering (category, material, finish, price), search functionality, product grid
- **Product Detail Modal**: Image gallery, specifications table, features, included/excluded items, CTAs
- **About Page**: Company story, credentials, process, team, clients, certifications
- **Contact Page**: Contact info, Google Map embed, enquiry form with file upload, WhatsApp integration
- **Gallery Page**: Masonry layout, category filters, lightbox integration
- **Wishlist & Quote Cart**: LocalStorage persistence for wishlist and quote cart
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop

## Tech Stack

- **React.js** - UI library
- **Vite** - Build tool
- **React Router DOM v6** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **EmailJS** - Email integration
- **Yet Another React Lightbox** - Image gallery
- **React Helmet Async** - SEO meta tags

## Project Structure

```
modular-one/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Navbar and Footer wrapper
│   │   ├── ProductCard.jsx     # Product display card
│   │   ├── FilterSidebar.jsx   # Product filters
│   │   ├── TestimonialCard.jsx # Customer testimonial
│   │   ├── TeamCard.jsx        # Team member card
│   │   ├── CategoryCard.jsx    # Category display card
│   │   └── ProductDetailModal.jsx # Product detail modal
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Products.jsx        # Products page
│   │   ├── About.jsx           # About page
│   │   ├── Contact.jsx         # Contact page
│   │   ├── Gallery.jsx         # Gallery page
│   │   ├── GetQuote.jsx        # Quote request page
│   │   └── FurnitureShowcase.jsx # Furniture showcase
│   ├── data/
│   │   └── products.js         # Product data (30+ items)
│   ├── utils/
│   │   └── localStorage.js     # LocalStorage utilities
│   ├── App.jsx                 # Main app with routes
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── tailwind.config.js          # Tailwind configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modular-one
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Configuration

### Tailwind CSS

The project uses custom brand colors and fonts defined in `tailwind.config.js`:

- **Primary Color**: #1A1A1A (Dark Gray)
- **Secondary Color**: #666666 (Medium Gray)
- **Accent Color**: #B8860B (Gold)
- **Background**: #FFFFFF (White)
- **Fonts**: Playfair Display (serif) and Inter (sans-serif)

### EmailJS Integration

To enable email functionality in the Contact form:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update the EmailJS configuration in `src/pages/Contact.jsx` with your credentials:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
   ```

### Google Maps

The Contact page includes an embedded Google Map. To customize the location:

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code and update it in `src/pages/Contact.jsx`

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and deploy

### Netlify

1. Push your code to GitHub
2. Import your repository in [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder to your hosting provider

## Customization

### Adding Products

Edit `src/data/products.js` to add or modify products. Each product should include:
- id, name, category, price
- images (array of URLs)
- rating, reviews
- material, finish, thickness, hardware
- warranty, leadTime
- dimensions, customization
- features (array)
- included, excluded (arrays)
- tags, colors

### Modifying Brand Colors

Update the colors in `tailwind.config.js` under the `theme.extend.colors` section.

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add a route in `src/App.jsx`
3. Add a navigation link in `src/components/Layout.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software for Modular One.
