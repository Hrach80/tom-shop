import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import Header from './components/Header/Header';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import SpecialOffers from './pages/SpecialOffers/SpecialOffers';
import Menu from './pages/Menu/Menu';
import AboutPage from './pages/About/About';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/offers" element={<SpecialOffers />} />
            <Route path="/About" element={<AboutPage />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </Router>
    </LanguageProvider>
  );
};

export default App;