import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import HomePage from './components/HomePage.jsx';
import ProductPage from './components/ProductPage.jsx';
import AuthPage from './components/AuthPage.jsx';
import AboutPage from './components/headerFooter/AboutPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;