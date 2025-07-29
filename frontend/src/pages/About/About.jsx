import React from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Homely</h1>
        <p className="about-tagline">Delicious food, delivered to your door.</p>
      </div>
      <div className="about-content">
        <h2>Our Mission</h2>
        <p>
          At <b>Homely</b>, we believe that everyone deserves access to fresh, delicious, and healthy meals—wherever they are. Our mission is to bring the warmth of home-cooked food and the excitement of gourmet cuisine right to your doorstep, with just a few clicks.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li>Wide variety of meals, desserts, and snacks</li>
          <li>Easy online ordering and fast delivery</li>
          <li>Curated meal plans for every lifestyle</li>
          <li>Seamless cart and order management</li>
          <li>Modern, user-friendly interface</li>
        </ul>
        <h2>Our Story</h2>
        <p>
          Homely was founded with a simple idea: to make great food accessible and convenient for everyone. Whether you're a busy professional, a student, or a family looking for variety, Homely is here to serve you with love and care.
        </p>
        <div className="about-social">
          <a href="#" aria-label="Facebook"><img src={assets.facebook_icon} alt="Facebook" /></a>
          <a href="#" aria-label="Twitter"><img src={assets.twitter_icon} alt="Twitter" /></a>
          <a href="#" aria-label="LinkedIn"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
        </div>
      </div>
    </div>
  );
};

export default About; 