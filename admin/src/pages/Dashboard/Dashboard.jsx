import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalMealPlans: 0,
    totalOrders: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch food items
      const foodResponse = await axios.get(`${url}/api/food/list`)
      const foods = foodResponse.data.success ? foodResponse.data.foods : []

      // Fetch meal plans
      const mealsResponse = await axios.get(`${url}/api/meals/list`)
      const mealPlans = mealsResponse.data.success ? mealsResponse.data.mealPlans : []

      // Fetch orders (you might need to create this endpoint)
      const ordersResponse = await axios.get(`${url}/api/order/list`)
      const orders = ordersResponse.data.success ? ordersResponse.data.orders : []

      // Calculate revenue (assuming each order has a total amount)
      const revenue = orders.reduce((total, order) => total + (order.totalAmount || 0), 0)

      setStats({
        totalFoods: foods.length,
        totalMealPlans: mealPlans.length,
        totalOrders: orders.length,
        totalRevenue: revenue
      })

      // Get recent orders (last 5)
      setRecentOrders(orders.slice(0, 5))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="loading_container">
        <div className="loading_spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard_container">
      <div className="dashboard_header">
        <h1 className="dashboard_title">Welcome Back, Admin!</h1>
        <p className="dashboard_subtitle">Here's what's happening with your food delivery business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats_grid">
        <div className="stat_card">
          <div className="stat_icon">🍽️</div>
          <div className="stat_content">
            <div className="stat_title">Total Food Items</div>
            <div className="stat_value">{stats.totalFoods}</div>
            <div className="stat_change">+12% from last month</div>
          </div>
        </div>

        <div className="stat_card">
          <div className="stat_icon">📋</div>
          <div className="stat_content">
            <div className="stat_title">Meal Plans</div>
            <div className="stat_value">{stats.totalMealPlans}</div>
            <div className="stat_change">+5% from last month</div>
          </div>
        </div>

        <div className="stat_card">
          <div className="stat_icon">📦</div>
          <div className="stat_content">
            <div className="stat_title">Total Orders</div>
            <div className="stat_value">{stats.totalOrders}</div>
            <div className="stat_change">+8% from last month</div>
          </div>
        </div>

        <div className="stat_card">
          <div className="stat_icon">💰</div>
          <div className="stat_content">
            <div className="stat_title">Total Revenue</div>
            <div className="stat_value">{formatCurrency(stats.totalRevenue)}</div>
            <div className="stat_change">+15% from last month</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="content_area">
        <div className="content_header">
          <h2>Recent Orders</h2>
          <button className="btn btn_primary">View All Orders</button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="empty_state">
            <div className="empty_state_icon">📦</div>
            <h3 className="empty_state_title">No Orders Yet</h3>
            <p className="empty_state_description">Orders will appear here once customers start placing them.</p>
          </div>
        ) : (
          <div className="recent_orders">
            {recentOrders.map((order, index) => (
              <div key={index} className="order_item">
                <div className="order_info">
                  <div className="order_id">Order #{order._id?.slice(-6) || 'N/A'}</div>
                  <div className="order_customer">{order.customerName || 'Customer'}</div>
                  <div className="order_amount">{formatCurrency(order.totalAmount || 0)}</div>
                </div>
                <div className="order_status">
                  <span className={`status_badge ${order.status || 'pending'}`}>
                    {order.status || 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="content_area">
        <h2>Quick Actions</h2>
        <div className="quick_actions">
          <button className="btn btn_primary">
            <span>➕</span>
            Add New Food Item
          </button>
          <button className="btn btn_primary">
            <span>📋</span>
            Create Meal Plan
          </button>
          <button className="btn btn_secondary">
            <span>📊</span>
            View Analytics
          </button>
          <button className="btn btn_secondary">
            <span>⚙️</span>
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 