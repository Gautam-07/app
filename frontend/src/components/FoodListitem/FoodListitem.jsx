import React, { useContext }from 'react'
import './FoodListitem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodListitem = ({id,name,price,description,image}) => {
      // const [itemCount,setItemCount] = React.useState(0);
      const {cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);
      
      // Safely get cart item count, defaulting to 0 if not found
      const itemCount = cartItems && cartItems[id] ? cartItems[id] : 0;
      
  return (
    <div className='food_item'>
        <div className="food_item_img_container">
            <img  className='food_item_image' src={ url +"/images/"+image} alt="" />
        </div>
        <div className="food_info_item">
            <div className="food_item_name_rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food_item_desc'>
                {description || "Delicious food item with fresh ingredients and authentic taste."}
            </p>
            <div className="food_item_price_cart">
                <p className='food_item_price'>₹{price}</p>
                <div className="cart_action_container">
                    {itemCount === 0 ? (
                        <button className='add_to_cart_btn' onClick={()=> addToCart(id)}>
                            Add to Cart
                        </button>
                    ) : (
                        <div className='cart_counter_buttons'>
                            <button 
                                className='counter_btn minus_btn' 
                                onClick={()=> removeFromCart(id)}
                            >
                                <span>−</span>
                            </button>
                            <span className='counter_display'>{itemCount}</span>
                            <button 
                                className='counter_btn plus_btn' 
                                onClick={()=> addToCart(id)}
                            >
                                <span>+</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default FoodListitem