import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Meals from './pages/Meals/Meals'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrder from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer';
import About from './pages/About/About';


const App = () => {
  const [showLogin, setShowLogin] = React.useState(false);



  return (
   <>
   {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/meals" element={<Meals/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<PlaceOrder/>}/>
        <Route path="/myorders" element={<MyOrder />} />
        <Route path="/about" element={<About />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </div>
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
   </>
  )
}

export default App