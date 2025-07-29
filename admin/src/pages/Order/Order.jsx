import React from 'react'
import './Order.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = React.useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Error fetching orders");
    }
  };

  React.useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='order-admin-container'>
      <h2 className="order-admin-title">Order Management</h2>
      <div className="order-list">
        {orders.length === 0 ? (
          <div className="order-empty">No orders found.</div>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel" className="order-item-img" />
              <div className="order-item-details">
                <p className='order-item-food'>
                  <b>Items:</b>{" "}
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name ? item.name : `ID: ${item.itemId}`} x {item.quantity}
                      {idx !== order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p className='order-item-customer'>
                  <b>Customer:</b> {order.address?.firstName} {order.address?.lastName}
                </p>
                <p className='order-item-address'>
                  <b>Address:</b>{" "}
                  {order.address
                    ? `${order.address.city || ''}, ${order.address.state || ''}, ${order.address.country || ''}, ${order.address.zipcode || ''}`
                    : 'N/A'}
                </p>
                <div className="order-item-status">
                  <label>Status: </label>
                  <select
                    value={order.status || "Placed"}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        const response = await axios.post(url + "/api/order/status", {
                          orderId: order._id,
                          status: newStatus,
                        });
                        if (response.data.success) {
                          toast.success("Order status updated!");
                          fetchAllOrders(); // Refresh the list
                        } else {
                          toast.error("Failed to update order status");
                        }
                      } catch (err) {
                        toast.error("Failed to update order status");
                      }
                    }}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;