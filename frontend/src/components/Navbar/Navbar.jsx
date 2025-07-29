import React ,{useContext, useState} from 'react'
import './Navbar.css' // Assuming you have a CSS file for styling
import logo from '../../assets/admin_assets/homely_text.png'
import cart from '../../assets/frontend_assets/cart.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'  // Adjust the path as necessary
import { assets } from '../../assets/frontend_assets/assets'
import ProfilePictureUpload from '../ProfilePictureUpload/ProfilePictureUpload'
import searchIcon from '../../assets/frontend_assets/search_icon.png';

const Navbar = ({setShowLogin}) => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  const [showProfileUpload, setShowProfileUpload] = useState(false);
  const{getTotalCartAmount,token,setToken,userProfile,logout, searchQuery, setSearchQuery} = useContext(StoreContext);
  const navigate = useNavigate();
  const [showNavbarSearch, setShowNavbarSearch] = useState(false);
  
  // Determine active menu based on current location
  const getActiveMenu = () => {
    if (location.pathname === '/') {
      // If we're on home page, check if menu is active
      return menuActive ? 'menu' : 'home';
    }
    if (location.pathname === '/meals') return 'meals';
    if (location.pathname === '/cart') return 'cart';
    if (location.pathname === '/myorders') return 'orders';
    return 'home';
  };

  const handleHomeClick = () => {
    setMenuActive(false);
  }

  const handleMenuClick = () => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait a bit for navigation to complete, then scroll
      setTimeout(() => {
        scrollToMenu();
      }, 300);
    } else {
      scrollToMenu();
    }
    setMenuActive(true);
  }

  const scrollToMenu = () => {
    const exploreMenuSection = document.getElementById('explore_menu');
    if (exploreMenuSection) {
      try {
        // Try smooth scroll first
        exploreMenuSection.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        // Fallback to instant scroll
        exploreMenuSection.scrollIntoView();
      }
    } else {
      // Try to find it after a short delay in case it's still loading
      setTimeout(() => {
        const retrySection = document.getElementById('explore_menu');
        if (retrySection) {
          retrySection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }

  // Reset menu active state when navigating away from home
  React.useEffect(() => {
    if (location.pathname !== '/') {
      setMenuActive(false);
    }
  }, [location.pathname]);

  // Scroll event to show/hide search bar
  React.useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      const exploreMenu = document.getElementById('explore_menu');
      const foodList = document.getElementById('food_display');
      if (!header || !exploreMenu || !foodList) return;
      const headerRect = header.getBoundingClientRect();
      const exploreMenuRect = exploreMenu.getBoundingClientRect();
      const foodListRect = foodList.getBoundingClientRect();
      // Show search if header is out of view and (explore menu or food list is in view)
      if (
        headerRect.bottom <= 0 &&
        ((exploreMenuRect.top < window.innerHeight && exploreMenuRect.bottom > 0) ||
         (foodListRect.top < window.innerHeight && foodListRect.bottom > 0))
      ) {
        setShowNavbarSearch(true);
      } else if (headerRect.bottom > 0) {
        setShowNavbarSearch(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navbar search on cart and order pages
  const hideSearchOnRoutes = ['/cart', '/order', '/myorders'];
  const shouldShowNavbarSearch = showNavbarSearch && !hideSearchOnRoutes.includes(location.pathname);

  return (
    <div className='navbar'>
        <div className='navbar_logo'>
            <Link to='/'><img src={logo} alt='Logo' /></Link> {/* Replace with your logo path */}
        </div>
        <div className='navbar_links'>
            <Link to='/' className={getActiveMenu()=="home"?"active":""} onClick={handleHomeClick}>Home</Link>
            <button onClick={handleMenuClick} className={getActiveMenu()=="menu"?"active":""}>Menu</button>
            <Link to='/meals' className={getActiveMenu()=="meals"?"active":""}>Meals</Link>
        </div>
        {/* Animated Search Bar */}
        <div className={`navbar_search_wrapper${shouldShowNavbarSearch ? ' show' : ''}`}> 
          <form className='navbar_search' onSubmit={e => { e.preventDefault(); }}>
            <input
              type="text"
              placeholder="Search for your food and kitchen here ."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit" className='navbar_search_button'>
              <img src={searchIcon} alt="Search" />
            </button>
          </form>
        </div>
        <div className='navbar_actions'>
          <div className='navbar_cart'>
            <Link to='/cart'><img src={cart} alt="cart" height={30} width={30}/></Link>
            <div className={getTotalCartAmount()===0?" ":'dot'}></div>
          </div>
          {!token?<button onClick={() => setShowLogin(true)}  className='navbar__login'>Sign in</button>
          : <div className='navbar_profile'>
            <img 
              src={userProfile?.profilePicture ? `http://localhost:4000${userProfile.profilePicture}` : assets.profile_icon} 
              alt="user" 
              height={30} 
              width={30}
            />
             <ul className='navbar_profile_dropdown'>
              <li onClick={()=> navigate('/myorders')}><img src={assets.bag_icon} alt="" />
              <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => setShowProfileUpload(true)}><img src={assets.profile_icon} alt="" />
              <p>Update Profile Picture</p>
              </li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" />
              <p>Logout</p>
              </li>
                     
             </ul>
          </div>
          }
        </div>

        {showProfileUpload && (
          <ProfilePictureUpload onClose={() => setShowProfileUpload(false)} />
        )}
    </div>

  )
}

export default Navbar