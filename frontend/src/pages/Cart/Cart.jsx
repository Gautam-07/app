import React from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount,url } = React.useContext(StoreContext);
  const navigate = useNavigate();
  
  return (
    <div className='cart'>
      {/* Left Panel - Purple Background */}
      <div className="cart-left-panel">
        <div className="cart-logo">
          Shopping Cart
        </div>
        <div className="cart-amount">
          ₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}
        </div>
        <div className="cart-details">
          <div className="detail-line"></div>
          <div className="detail-line"></div>
          <div className="detail-line"></div>
          <div className="detail-line"></div>
        </div>
      </div>

      {/* Right Panel - White Background */}
      <div className="cart-right-panel">
        <h2 className="cart-title">Your Cart Items</h2>
        <div className="cart_items">
          <div className="cart_items_title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <div>
            {food_list.map((item,index)=>{
              const itemCount = cartItems && cartItems[item._id] ? cartItems[item._id] : 0;
              if(itemCount > 0){
                return(
                  <div key={index}>
                    <div className="cart_items_item">
                      <img src={url+"/images/"+item.image} alt={item.name} />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{itemCount}</p>
                      <p>₹{item.price * itemCount}</p>
                      <p onClick={()=>removeFromCart(item._id)} className='cross'>×</p>
                    </div>
                  </div>
                )
              }
              return null;
            })}
          </div>
          <div className="cart_bottom">
            <div className="cart_total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart_total_details">
                  <b>Subtotal</b>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <div className="cart_total_details">
                  <b>Delivery Fee</b>
                  <p>₹{getTotalCartAmount()===0?0:2}</p>
                </div>
                <div className="cart_total_details">
                  <b>Total</b>
                  <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
                </div>
              </div>
              <button onClick={()=>navigate('/order')}>CHECKOUT</button>
            </div>
            <div className='cart_promocode'>
              <h2>Promo Code</h2>
              <input type="text" placeholder='Enter Promo Code' />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart