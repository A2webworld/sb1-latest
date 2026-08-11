import React, { useState } from 'react';
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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={setCurrentPage} />;
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
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-gray-50">
            <Header currentPage={currentPage} onPageChange={setCurrentPage} />
            <main>
              {renderPage()}
            </main>
            <Footer onPageChange={setCurrentPage} />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
