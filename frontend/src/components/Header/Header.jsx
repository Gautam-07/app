import React, { useContext, useState } from 'react'
import './Header.css'
import headerbg from '../../assets/admin_assets/headerbackground.jpg'
import searchIcon from '../../assets/frontend_assets/search_icon.png'
import { StoreContext } from '../../context/StoreContext'

const Header = () => {
  const { setSearchQuery } = useContext(StoreContext);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    
    // Navigate to the dishes section
    const dishesSection = document.getElementById('food_display');
    if (dishesSection) {
      dishesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    setLocalSearchQuery(e.target.value);
    // Real-time search as user types
    setSearchQuery(e.target.value);
  };

  return (
    <div className='header'>
        <div className="header_image">
           <img src={headerbg} alt="Header Background" />
        </div>
        <div className="header_text">
            <h2>Order your Healthy food from here .</h2>
            <p>We provide you with the best food from the best kicthens in your area.</p>
        </div>
        <div className="header_search_button">
            <form className="header_search" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder='Search for your food and kicthen here .' 
                    value={localSearchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit" className='header_search_button'>
                    <img src={searchIcon} alt="Search" />
                </button>
            </form>
        </div>
    </div>
  )
}

export default Header;