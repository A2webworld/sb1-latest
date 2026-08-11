import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Contact from './pages/Contact/Contact';
import AboutUs from './pages/Static/AboutUs';
import DeliveryInfo from './pages/Static/DeliveryInfo';
import PrivacyPolicy from './pages/Static/PrivacyPolicy';
import TermsConditions from './pages/Static/TermsConditions';
import ReturnPolicy from './pages/Static/ReturnPolicy';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Check URL path when app loads
  useEffect(() => {
    const path = window.location.pathname.replace('/', '');
    const validPages = ['shop', 'contact', 'about', 'delivery', 'privacy', 'terms', 'return'];
    if (path && validPages.includes(path)) {
      setCurrentPage(path);
    } else {
      setCurrentPage('home');
    }
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update the browser URL without refreshing the page
    window.history.pushState({}, '', `/${page}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'shop':
        return <Shop />;
      case 'contact':
        return <Contact />;
      case 'about':
        return <AboutUs />;
      case 'delivery':
        return <DeliveryInfo />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsConditions />;
      case 'return':
        return <ReturnPolicy />;
      default:
        return <Home onPageChange={handlePageChange} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-gray-50">
            <Header currentPage={currentPage} onPageChange={handlePageChange} />
            <main>
              {renderPage()}
            </main>
            <Footer onPageChange={handlePageChange} />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
