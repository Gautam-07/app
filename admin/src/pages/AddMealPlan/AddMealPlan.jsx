import React, { useState } from 'react'
import './AddMealPlan.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddMealPlan = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "weekly",
        mealsPerDay: 3,
        features: []
    });
    const [newFeature, setNewFeature] = useState("");

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const addFeature = () => {
        if (newFeature.trim()) {
            setData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim()]
            }));
            setNewFeature("");
        }
    }

    const removeFeature = (index) => {
        setData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    }

    const onSubHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('duration', data.duration);
        formData.append('mealsPerDay', Number(data.mealsPerDay));
        formData.append('features', JSON.stringify(data.features));

        try {
            const response = await axios.post(`${url}/api/meals/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    duration: "weekly",
                    mealsPerDay: 3,
                    features: []
                });
                setImage(false);
                toast.success('Meal Plan Added Successfully');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add meal plan');
        }
    }

    return (
        <div className='add_meal_plan'>
            <form className='add_meal_plan_form' onSubmit={onSubHandler}>
                <div className="add_meal_plan_header">
                    <h2>Add New Meal Plan</h2>
                    <p>Create a new subscription meal plan for your customers</p>
                </div>

                <div className="add_meal_plan_image">
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>

                <div className="add_meal_plan_inputs">
                    <div className="add_meal_plan_input">
                        <p>Plan Name</p>
                        <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter Plan Name' required />
                    </div>
                    <div className="add_meal_plan_input">
                        <p>Description</p>
                        <textarea onChange={onChangeHandler} value={data.description} name='description' placeholder='Enter Plan Description' required />
                    </div>
                </div>

                <div className="add_meal_plan_options">
                    <div className="add_meal_plan_duration">
                        <p>Duration</p>
                        <select onChange={onChangeHandler} name="duration" value={data.duration}>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    <div className="add_meal_plan_meals">
                        <p>Meals Per Day</p>
                        <select onChange={onChangeHandler} name="mealsPerDay" value={data.mealsPerDay}>
                            <option value={1}>1 Meal</option>
                            <option value={2}>2 Meals</option>
                            <option value={3}>3 Meals</option>
                        </select>
                    </div>
                    <div className="add_meal_plan_price">
                        <p>Price (₹)</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Enter Price' required />
                    </div>
                </div>

                <div className="add_meal_plan_features">
                    <p>Features</p>
                    <div className="features_input">
                        <input
                            type="text"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            placeholder="Add a feature"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        />
                        <button type="button" onClick={addFeature}>Add</button>
                    </div>
                    <div className="features_list">
                        {data.features.map((feature, index) => (
                            <div key={index} className="feature_item">
                                <span>{feature}</span>
                                <button type="button" onClick={() => removeFeature(index)}>×</button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type='submit' className='add_meal_plan_btn'>ADD MEAL PLAN</button>
            </form>
        </div>
    )
}

export default AddMealPlan 