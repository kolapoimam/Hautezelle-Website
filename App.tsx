import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;