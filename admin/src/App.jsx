import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Order from './pages/Order/Order.jsx'
import Categories from './pages/Categories/Categories.jsx'
import AddMealPlan from './pages/AddMealPlan/AddMealPlan.jsx'
import ListMealPlans from './pages/ListMealPlans/ListMealPlans.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const url = "https://homely-backend-cj6n.onrender.com";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="app_content">
        {/* Mobile Overlay */}
        <div 
          className={`sidebar_overlay ${sidebarOpen ? 'open' : ''}`} 
          onClick={closeSidebar}
        />
        
        {/* Sidebar Container */}
        <div className={`sidebar_container ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar />
        </div>
        
        {/* Navbar Container */}
        <div className="navbar_container">
          <Navbar onMenuToggle={toggleSidebar} />
        </div>
        
        {/* Main Content Area */}
        <div className="main_content">
          <Routes>
            <Route path="/" element={<Dashboard url={url}/>} />
            <Route path="/add" element={<Add url={url}/>} />
            <Route path="/list" element={<List url={url}/>} />
            <Route path="/categories" element={<Categories url={url}/>} />
            <Route path="/add-meal-plan" element={<AddMealPlan url={url}/>} />
            <Route path="/list-meal-plans" element={<ListMealPlans url={url}/>} />
            <Route path="/order" element={<Order url={url}/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
