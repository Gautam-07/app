import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyOrders = () => {
  const { url, food_list } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // redirect to home/login if not authenticated
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.post(url + '/api/order/userorder', {}, {
          headers: { token }
        });

        if (response.data.success) {
          setOrders(response.data.orders.reverse());
        } else {
          setOrders([]);
          setError(response.data.message || 'No orders found');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        if (err.response?.status === 401) {
          setError('Invalid token. Please login again.');
          localStorage.removeItem('token');
          navigate('/');
        } else {
          setError('Failed to fetch orders. Please try again.');
        }
      }
      setLoading(false);
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
      setError('Please login to view your orders');
    }
  }, [url, navigate]);

  return (
    <div className="myorders-container">
      <h2>My Orders</h2>
      {loading ? (
        <div className="myorders-loading">Loading...</div>
      ) : error ? (
        <div className="myorders-error">{error}</div>
      ) : orders.length === 0 ? (
        <div className="myorders-empty">You have no orders yet.</div>
      ) : (
        <div className="myorders-list">
          {orders.map((order) => (
            <div className="myorders-order" key={order._id}>
              <div className="myorders-order-header">
                <span><b>Order ID:</b> {order._id}</span>
                <span><b>Date:</b> {new Date(order.date).toLocaleString()}</span>
                <span><b>Status:</b> {order.status}</span>
                <span><b>Payment:</b> {order.payment}</span>
              </div>
              <div className="myorders-order-body">
                <div className="myorders-order-items">
                  <b>Items:</b>
                  <ul>
                    {order.items.map((item, idx) => {
                      const food = food_list?.find(f => f._id === item.itemId);
                      return (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          {food && (
                            <img
                              src={food.image ? url + '/images/' + food.image : ''}
                              alt={food.name || 'Food'}
                              style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }}
                            />
                          )}
                          <span>
                            {food ? food.name : 'Unknown Item'} x {item.quantity}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="myorders-order-info">
                  <b>Amount:</b> ₹{order.amount}
                  <br />
                  <b>Address:</b>
                  <ul>
                    {order.address && typeof order.address === 'object'
                      ? Object.entries(order.address).map(([key, value]) => (
                          <li key={key}>
                            <b>{key}:</b> {value}
                          </li>
                        ))
                      : <li>{order.address}</li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;