import React, { useEffect, useState }from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
    const [image, setImage] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState ({
        name: " ",
        description: " ",
        price: " ",
        category: ""
        
    });

    // Fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/categories/admin/categories`);
            if (response.data.success) {
                const activeCategories = response.data.categories.filter(cat => cat.isActive);
                setCategories(activeCategories);
                if (activeCategories.length > 0 && !data.category) {
                    setData(prev => ({ ...prev, category: activeCategories[0].name }));
                }
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [url]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]: value}));
    }
    
    const onSubHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', Number(data.price));
            formData.append('category', data.category);
            
            const response = await axios.post(`${url}/api/food/add`, formData);
            if(response.data.success) {
                setData({
                    name: " ",
                    description: " ",
                    price: " ",
                    category: categories.length > 0 ? categories[0].name : ""
                });
                setImage(false);
                toast.success('Item Added Successfully');
            }
        } catch (error) {
            console.error('Error adding item:', error);
            toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className='add'>
            <div className="add_header">
                <h2>Add New Food Item</h2>
                <p>Create a new food item for your menu</p>
            </div>
            
            <form className='add_form' onSubmit={onSubHandler}>
                <div className="flex_col">
                    <div className="add_image_upload">
                        <p>Upload Image</p>
                        <label htmlFor="image">
                            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                    </div>
                    <div className="add_procut_name">
                        <p>Product name</p>
                        <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                    </div>
                    <div className="add_procut_description">
                        <p>Product description</p>
                        <input onChange={onChangeHandler} value={data.description} type="text" name='description' placeholder='Type here' required />
                    </div>
                </div>
                <div className="add_category_price">
                    <div className="add_category">
                        <select onChange={onChangeHandler} name="category" value={data.category} required>
                            {loading ? (
                                <option value="">Loading categories...</option>
                            ) : categories.length === 0 ? (
                                <option value="">No categories available</option>
                            ) : (
                                categories.map((category) => (
                                    <option key={category._id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="add_price">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Enter Price' required />
                    </div>
                </div>
                <button type='submit' className='add_btn'>ADD ITEM</button>
            </form>
        </div>
    )
}

export default Add