import React from 'react';
import './Footer.css';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          {/* Logo removed as requested */}
          <p className="footer-tagline">Delicious food, delivered to your door.</p>
        </div>
        <div className="footer-links">
          <a href="/" className="footer-link">Home</a>
          <a href="/meals" className="footer-link">Meals</a>
          <a href="/cart" className="footer-link">Cart</a>
          <a href="/about" className="footer-link">About</a>
        </div>
        <div className="footer-social">
          <a href="#" className="footer-social-icon" aria-label="Facebook"><img src={assets.facebook_icon} alt="Facebook" /></a>
          <a href="#" className="footer-social-icon" aria-label="Twitter"><img src={assets.twitter_icon} alt="Twitter" /></a>
          <a href="#" className="footer-social-icon" aria-label="LinkedIn"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Homely. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 