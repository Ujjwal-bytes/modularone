import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedMarqueeHero from '../components/ui/hero-3';
import { furnitureImages } from '../data/furnitureImages';

const HeroDemo = () => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/products');
  };

  return (
    <AnimatedMarqueeHero
      tagline="Premium Modular Furniture"
      title={
        <>
          Crafting Dreams
          <br />
          <span className="text-[#C9A03D]">Into Reality</span>
        </>
      }
      description="Experience the perfect blend of luxury, functionality, and craftsmanship with our premium modular furniture solutions. Transform your space into a masterpiece."
      ctaText="Explore Collection"
      images={furnitureImages}
      onCtaClick={handleCtaClick}
    />
  );
};

export default HeroDemo;