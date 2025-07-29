import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({ onMenuToggle }) => {
  return (
    <div className='navbar'>
      <div className='navbar_logo'>
        <button className='navbar_mobile_toggle' onClick={onMenuToggle}>
          ☰
        </button>
        <img src={assets.logo} alt='Logo' />
        <span className='navbar_title'></span>
      </div>
      
      <div className='navbar_actions'>
        <div className='navbar_notifications'>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </div>
        
        <div className='navbar_user'>
          <img src={assets.logo} alt="Admin" />
          <div className='navbar_user_info'>
            <span className='navbar_user_name'>Admin User</span>
            <span className='navbar_user_role'>Administrator</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar