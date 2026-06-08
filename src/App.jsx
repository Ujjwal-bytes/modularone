import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";

// Components
import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";
import ErrorBoundary from "./components/ErrorBoundary";
import Preloader from "./components/Preloader";

// Lazy-loaded Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const GetQuote = lazy(() => import("./pages/GetQuote"));
const FurnitureShowcase = lazy(() => import("./pages/FurnitureShowcase"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <>
      <Preloader />
      <ErrorBoundary>
        <MotionConfig
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          reducedMotion="user"
        >
          <HelmetProvider>
            <BrowserRouter>
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/get-quote" element={<GetQuote />} />
                    <Route path="/furniture-showcase" element={<FurnitureShowcase />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </HelmetProvider>
        </MotionConfig>
      </ErrorBoundary>
    </>
  );
}