import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';


const PlaceOrder = () => {
  const {getTotalCartAmount, food_list , cartItems,url} = useContext(StoreContext);
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=> ({ ...data, [name]: value }));
  }
  const placeOrder = async (event) => {
     event.preventDefault();
     let orderItems = [];
     food_list.map((item) => {
      const itemCount = cartItems && cartItems[item._id] ? cartItems[item._id] : 0;
      if (itemCount > 0) {
      orderItems.push({
        itemId: item._id,
        quantity: itemCount
      });
    }

   })
   let orderData = {
    address: data,
    items: orderItems,
    amount:getTotalCartAmount() + 2, // Adding delivery fee of ₹2

  }
  const token = localStorage.getItem("token");
  let response = await axios.post(url+"/api/order/place", orderData, { headers: { token } });
  if(response.data.success){    
    window.location.replace("/")
    toast.success('Item Order Successfully');
    
  }
  }

  //  useEffect (() => {
  //   console.log("Data Updated:", data);
  // }, [data]);
  return (
    <form onSubmit={placeOrder} className="place_order">
      <div className="place_order_left">
        <p className='title'>Delivery Information</p>
        <div className='multi_fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
        <input  required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone number'/>
        <div className="multi_fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
        </div>
        <div className="multi_fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
      </div>
      <div className="place_order_right">
      <b className='title'>Payment Information</b>
      <div className="cart_total">
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
              <button type='submit'>PROCEED TO PAYMENT</button>
            </div>

      </div>

    </form>
  )
}

export default PlaceOrder