
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import CartPage from './CartPage';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <div className="landing-page">
              <div className="background-image"></div>
              <div className="content">
                <div className="landing_content">
                  <h1>Welcome To Paradise Nursery</h1>
                  <div className="divider"></div>
                  <p>Where Green Meets Serenity</p>
                  <a href="#/products" className="get-started-button">
                    Get Started
                  </a>
                </div>
                <div className="aboutus_container">
                  <AboutUs/>
                </div>
              </div>
            </div>
          } />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



