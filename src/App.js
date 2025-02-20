import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import HomePage from './components/HomePage.jsx';
import ProductPage from './components/ProductPage.jsx';
import AuthPage from './components/AuthPage.jsx';
import AboutPage from './components/headerFooter/AboutPage.jsx';
import AdminPanel from './components/AdminPanel.jsx'; // Import the AdminPanel
import initialProducts from './data/Products'; // Import mock product data

function App() {
  // State to manage products, initially loaded with mock data
  const [products, setProducts] = useState(initialProducts);

  return (
    <Router>
      <ScrollToTop />
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/product/:id" element={<ProductPage products={products} />} />
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/home" element={<HomePage products={products} />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Admin Panel Route */}
          <Route path="/admin" element={<AdminPanel products={products} setProducts={setProducts} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
