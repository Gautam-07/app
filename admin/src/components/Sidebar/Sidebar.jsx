import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_title">Admin Panel</div>
        <div className="sidebar_subtitle">Management System</div>
      </div>

      <div className="sidebar_options">
        <NavLink to='/Add' className="sidebar_option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        
        <NavLink to='/list' className="sidebar_option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        
        <NavLink to='/categories' className="sidebar_option">
          <img src={assets.add_icon} alt="" />
          <p>Categories</p>
        </NavLink>
        
        <NavLink to='/add-meal-plan' className="sidebar_option">
          <img src={assets.add_icon} alt="" />
          <p>Add Meal Plan</p>
        </NavLink>
        
        <NavLink to='/list-meal-plans' className="sidebar_option">
          <img src={assets.order_icon} alt="" />
          <p>Meal Plans</p>
        </NavLink>
        
        <NavLink to='/order' className="sidebar_option">
          <img src={assets.order_icon} alt="" />
          <p>Manage Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar