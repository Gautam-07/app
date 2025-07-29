import React, { useState, useEffect, useContext } from 'react'
import './Meals.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Meals = () => {
  const { url } = useContext(StoreContext)
  const [mealPlans, setMealPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDuration, setSelectedDuration] = useState('all')
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    fetchMealPlans()
  }, [])

  const fetchMealPlans = async () => {
    try {
      const response = await axios.get(`${url}/api/meals/list`)
      if (response.data.success) {
        setMealPlans(response.data.mealPlans)
      } else {
        toast.error('Failed to fetch meal plans')
      }
    } catch (error) {
      console.error('Error fetching meal plans:', error)
      toast.error('Failed to fetch meal plans')
    } finally {
      setLoading(false)
    }
  }

  const filteredPlans = selectedDuration === 'all' 
    ? mealPlans 
    : mealPlans.filter(plan => plan.duration === selectedDuration)

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan)
    // Here you would typically open a modal or navigate to subscription page
    toast.info(`Subscribing to ${plan.name} - Coming Soon!`)
  }

  const getDurationText = (duration) => {
    return duration === 'weekly' ? 'Weekly' : 'Monthly'
  }

  const getMealsText = (mealsPerDay) => {
    return `${mealsPerDay} ${mealsPerDay === 1 ? 'Meal' : 'Meals'} per Day`
  }

  if (loading) {
    return (
      <div className="meals_loading">
        <div className="loading_spinner"></div>
        <p>Loading meal plans...</p>
      </div>
    )
  }

  return (
    <div className='meals'>
      <div className="meals_header">
        <div className="meals_header_content">
          <h1>Meal Subscription Plans</h1>
          <p>Choose the perfect meal plan that fits your lifestyle and budget</p>
        </div>
        <div className="meals_header_image">
          <div className="header_image_container">
            <div className="floating_card card1">
              <span>🍽️</span>
              <p>Fresh Meals</p>
            </div>
            <div className="floating_card card2">
              <span>🚚</span>
              <p>Free Delivery</p>
            </div>
            <div className="floating_card card3">
              <span>⭐</span>
              <p>Premium Quality</p>
            </div>
          </div>
        </div>
      </div>

      <div className="meals_filter">
        <div className="filter_buttons">
          <button 
            className={`filter_btn ${selectedDuration === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedDuration('all')}
          >
            All Plans
          </button>
          <button 
            className={`filter_btn ${selectedDuration === 'weekly' ? 'active' : ''}`}
            onClick={() => setSelectedDuration('weekly')}
          >
            Weekly Plans
          </button>
          <button 
            className={`filter_btn ${selectedDuration === 'monthly' ? 'active' : ''}`}
            onClick={() => setSelectedDuration('monthly')}
          >
            Monthly Plans
          </button>
        </div>
      </div>

      {mealPlans.length === 0 ? (
        <div className="no_meal_plans">
          <div className="no_plans_content">
            <span>🍽️</span>
            <h3>No Meal Plans Available</h3>
            <p>Check back soon for exciting meal subscription options!</p>
          </div>
        </div>
      ) : (
        <div className="meals_grid">
          {filteredPlans.map((plan, index) => (
            <div key={plan._id} className="meal_plan_card">
              <div className="plan_image_container">
                <img src={`${url}/images/${plan.image}`} alt={plan.name} />
                <div className="plan_badge">
                  <span>{getDurationText(plan.duration)}</span>
                </div>
              </div>
              
              <div className="plan_content">
                <div className="plan_header">
                  <h3>{plan.name}</h3>
                  <p className="plan_description">{plan.description}</p>
                </div>
                
                <div className="plan_features">
                  <div className="feature_item">
                    <span className="feature_icon">🍽️</span>
                    <span>{getMealsText(plan.mealsPerDay)}</span>
                  </div>
                  {plan.features && plan.features.map((feature, idx) => (
                    <div key={idx} className="feature_item">
                      <span className="feature_icon">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="plan_price">
                  <div className="price_info">
                    <span className="price_amount">₹{plan.price}</span>
                    <span className="price_duration">/{plan.duration === 'weekly' ? 'week' : 'month'}</span>
                  </div>
                  <div className="price_per_meal">
                    <span>₹{Math.round(plan.price / (plan.mealsPerDay * (plan.duration === 'weekly' ? 7 : 30)))} per meal</span>
                  </div>
                </div>
                
                <button 
                  className="subscribe_btn"
                  onClick={() => handleSubscribe(plan)}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="meals_footer">
        <div className="footer_content">
          <h3>Why Choose Our Meal Plans?</h3>
          <div className="benefits_grid">
            <div className="benefit_item">
              <span className="benefit_icon">🥗</span>
              <h4>Healthy & Fresh</h4>
              <p>All meals are prepared with fresh, high-quality ingredients</p>
            </div>
            <div className="benefit_item">
              <span className="benefit_icon">⚡</span>
              <h4>Convenient</h4>
              <p>No more meal planning or grocery shopping hassles</p>
            </div>
            <div className="benefit_item">
              <span className="benefit_icon">💰</span>
              <h4>Cost Effective</h4>
              <p>Save money compared to eating out or ordering individually</p>
            </div>
            <div className="benefit_item">
              <span className="benefit_icon">🎯</span>
              <h4>Flexible Plans</h4>
              <p>Choose from weekly or monthly plans that suit your needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Meals