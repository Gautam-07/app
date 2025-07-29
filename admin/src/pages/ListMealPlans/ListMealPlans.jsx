import React, { useEffect, useState } from 'react'
import './ListMealPlans.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListMealPlans = ({ url }) => {
    const [mealPlans, setMealPlans] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchMealPlans = async () => {
        try {
            const response = await axios.get(`${url}/api/meals/list`)
            if (response.data.success) {
                setMealPlans(response.data.mealPlans);
            } else {
                toast.error("Failed to fetch meal plans");
            }
        } catch (error) {
            console.error("Failed to fetch meal plans:", error);
            toast.error("Failed to fetch meal plans");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMealPlans();
    }, [url]);

    const removeMealPlan = async (mealPlanId) => {
        try {
            const response = await axios.post(`${url}/api/meals/remove`, { id: mealPlanId });
            if (response.data.success) {
                toast.success("Meal plan removed successfully");
                await fetchMealPlans();
            } else {
                toast.error("Failed to remove meal plan");
            }
        } catch (error) {
            console.error("Failed to remove meal plan:", error);
            toast.error("Failed to remove meal plan");
        }
    }

    const toggleMealPlanStatus = async (mealPlanId) => {
        try {
            const response = await axios.patch(`${url}/api/meals/${mealPlanId}/toggle`);
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchMealPlans();
            } else {
                toast.error("Failed to toggle meal plan status");
            }
        } catch (error) {
            console.error("Failed to toggle meal plan status:", error);
            toast.error("Failed to toggle meal plan status");
        }
    }

    const formatPrice = (price) => {
        return `₹${price}`;
    }

    const formatDuration = (duration) => {
        return duration.charAt(0).toUpperCase() + duration.slice(1);
    }

    if (loading) {
        return (
            <div className="list_meal_plans_loading">
                <div className="loading_spinner"></div>
                <p>Loading meal plans...</p>
            </div>
        );
    }

    return (
        <div className='list_meal_plans'>
            <div className="list_meal_plans_header">
                <h2>Meal Subscription Plans</h2>
                <p>Manage your meal subscription plans</p>
            </div>

            {mealPlans.length === 0 ? (
                <div className="no_meal_plans">
                    <p>No meal plans found. Add your first meal plan to get started!</p>
                </div>
            ) : (
                <div className='list_meal_plans_table'>
                    <div className='list_meal_plans_table_format'>
                        <b>Image</b>
                        <b>Name</b>
                        <b>Duration</b>
                        <b>Meals/Day</b>
                        <b>Price</b>
                        <b>Status</b>
                        <b>Actions</b>
                    </div>
                    {mealPlans.map((item, index) => (
                        <div key={index} className="list_meal_plans_table_format">
                            <img src={`${url}/images/${item.image}`} alt={item.name} />
                            <div className="meal_plan_info">
                                <p className="meal_plan_name">{item.name}</p>
                                <p className="meal_plan_description">{item.description}</p>
                            </div>
                            <p className="meal_plan_duration">{formatDuration(item.duration)}</p>
                            <p className="meal_plan_meals">{item.mealsPerDay} meals</p>
                            <p className="meal_plan_price">{formatPrice(item.price)}</p>
                            <div className="meal_plan_status">
                                <span className={`status_badge ${item.isActive ? 'active' : 'inactive'}`}>
                                    {item.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div className="meal_plan_actions">
                                <button 
                                    onClick={() => toggleMealPlanStatus(item._id)}
                                    className={`toggle_btn ${item.isActive ? 'deactivate' : 'activate'}`}
                                >
                                    {item.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button 
                                    onClick={() => removeMealPlan(item._id)} 
                                    className='remove_meal_plan_btn'
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListMealPlans 