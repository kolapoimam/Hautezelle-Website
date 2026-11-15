import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';
import CurtainIntro from './components/CurtainIntro';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Academy from './pages/Academy';
import { PageRoutes } from './types';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

const App: React.FC = () => {
  return (
    <CartProvider>
    <Router>
      <ScrollToTop />
      <Analytics />
      <CurtainIntro />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path={PageRoutes.HOME} element={<Home />} />
            <Route path={PageRoutes.SHOP} element={<Shop />} />
            <Route path={PageRoutes.SERVICES} element={<Services />} />
            <Route path={PageRoutes.ABOUT} element={<About />} />
            <Route path={PageRoutes.CONTACT} element={<Contact />} />
            <Route path={PageRoutes.ACADEMY} element={<Academy />} />
            <Route path="*" element={<Navigate to={PageRoutes.HOME} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <CartDrawer />
    </Router>
    </CartProvider>
  );
};

export default App;