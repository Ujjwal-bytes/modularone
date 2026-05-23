// Wishlist localStorage utilities
export const getWishlist = () => {
  try {
    const wishlist = localStorage.getItem('modularOne_wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    return [];
  }
};

export const addToWishlist = (product) => {
  try {
    const wishlist = getWishlist();
    const numericId = parseInt(product.id);
    if (!wishlist.find(item => parseInt(item.id) === numericId)) {
      wishlist.push(product);
      localStorage.setItem('modularOne_wishlist', JSON.stringify(wishlist));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return false;
  }
};

export const removeFromWishlist = (productId) => {
  try {
    const wishlist = getWishlist();
    const numericId = parseInt(productId);
    const updatedWishlist = wishlist.filter(item => parseInt(item.id) !== numericId);
    localStorage.setItem('modularOne_wishlist', JSON.stringify(updatedWishlist));
    return true;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return false;
  }
};

export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  const numericId = parseInt(productId);
  return wishlist.some(item => parseInt(item.id) === numericId);
};

export const getWishlistCount = () => {
  return getWishlist().length;
};


// Dark mode localStorage utility
export const getDarkMode = () => {
  try {
    const darkMode = localStorage.getItem('modularOne_darkMode');
    return darkMode === 'true';
  } catch (error) {
    console.error('Error reading dark mode from localStorage:', error);
    return false;
  }
};

export const setDarkMode = (isDark) => {
  try {
    localStorage.setItem('modularOne_darkMode', isDark.toString());
  } catch (error) {
    console.error('Error setting dark mode:', error);
  }
};
