import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets';

const List = ({url}) => {
    
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({});
    const [editImage, setEditImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`)
            if(response.data.success) {
                setList(response.data.foods);
            } else {
                toast.error("Failed to fetch list");
            }
        } catch (error) {
            console.error("Failed to fetch list:", error);
            toast.error("Failed to fetch list");
        } finally {
            setLoading(false);
        }
    }

    // Fetch categories for edit dropdown
    const fetchCategories = async () => {
        try {
            setCatLoading(true);
            const response = await axios.get(`${url}/api/categories/admin/categories`);
            if (response.data.success) {
                const activeCategories = response.data.categories.filter(cat => cat.isActive);
                setCategories(activeCategories);
            }
        } catch (error) {
            toast.error('Failed to fetch categories');
        } finally {
            setCatLoading(false);
        }
    };

    useEffect(() => {
        fetchList();
        fetchCategories();
    }, [url]);

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, {id:foodId});
            if(response.data.success) {
                toast.success("Food item removed successfully");
                await fetchList();
            } else {
                toast.error("Failed to remove food item");
            }
        } catch (error) {
            console.error("Failed to remove food item:", error);
            toast.error("Failed to remove food item");
        }
    }

    const openEdit = (item, index) => {
        setEditIndex(index);
        setEditData({ ...item });
        setEditImage(null);
        setShowModal(true);
    };
    const closeEdit = () => {
        setEditIndex(null);
        setEditData({});
        setEditImage(null);
        setShowModal(false);
    };
    const onEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };
    const onEditImageChange = (e) => {
        setEditImage(e.target.files[0]);
    };
    const onEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', editData._id);
            formData.append('name', editData.name);
            formData.append('description', editData.description);
            formData.append('price', editData.price);
            formData.append('category', editData.category);
            if (editImage) {
                formData.append('image', editImage);
            } else {
                formData.append('image', editData.image); // Always send current image filename if no new image
            }
            const response = await axios.post(`${url}/api/food/update`, formData);
            if (response.data.success) {
                toast.success('Food item updated successfully');
                await fetchList();
                closeEdit();
            } else {
                toast.error(response.data.message || 'Failed to update food item');
            }
        } catch (error) {
            toast.error('Failed to update food item');
        }
    };

    if (loading) {
        return (
            <div className="list_loading">
                <div className="list_loading_spinner"></div>
                <p>Loading food items...</p>
            </div>
        );
    }

    return (
        <div className='list'>
            <div className="list_header">
                <h2>Food Items Management</h2>
                <p>Manage all your food items and menu</p>
            </div>

            {list.length === 0 ? (
                <div className="list_empty">
                    <div className="list_empty_icon">🍽️</div>
                    <h3 className="list_empty_title">No Food Items Found</h3>
                    <p className="list_empty_description">Add your first food item to get started!</p>
                </div>
            ) : (
                <div className='list_table'>
                    <div className='list_table_format'>
                        <b>Image</b>
                        <b>Name</b>
                        <b>Category</b>
                        <b>Price</b>
                        <b>Action</b>
                    </div>
                    {list.map((item, index) => (
                        <div key={index} className="list_table_format">
                            <img src={`${url}/images/` + item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>₹{item.price}</p>
                            <div style={{display:'flex',gap:'10px'}}>
                                <button style={{background:'#ff8a00',color:'#fff',border:'none',borderRadius:'6px',padding:'4px 10px',cursor:'pointer'}} onClick={() => openEdit(item, index)}>Edit</button>
                                <p onClick={() => removeFood(item._id)} className='remove_food_function'>×</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Modal Popup for Edit */}
            {showModal && (
                <div className="modal_overlay" onClick={closeEdit}>
                    <div className="modal_content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Food Item</h2>
                            <button className="close-btn" type="button" onClick={closeEdit}>×</button>
                        </div>
                        <form className='flex_col' onSubmit={onEditSubmit}>
                            <div className="add_image_upload">
                                <p>Upload Image</p>
                                <label htmlFor="edit_image">
                                    <img src={editImage ? URL.createObjectURL(editImage) : `${url}/images/${editData.image}`} alt="" />
                                </label>
                                <input onChange={onEditImageChange} type="file" id="edit_image" hidden />
                            </div>
                            <div className="add_procut_name">
                                <p>Product name</p>
                                <input onChange={onEditChange} value={editData.name} type="text" name='name' placeholder='Type here' required />
                            </div>
                            <div className="add_procut_description">
                                <p>Description</p>
                                <textarea
                                    onChange={onEditChange}
                                    value={editData.description}
                                    name='description'
                                    placeholder='Type here'
                                    required
                                    rows={2}
                                    style={{overflow: 'hidden'}}
                                    onInput={e => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = (e.target.scrollHeight) + 'px';
                                    }}
                                />
                            </div>
                            <div className="add_category_price">
                                <div className="add_category">
                                    <p>Category</p>
                                    <select name="category" value={editData.category} onChange={onEditChange} required>
                                        {catLoading ? <option>Loading...</option> : categories.map((cat, i) => (
                                            <option key={i} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="add_price">
                                    <p>Price</p>
                                    <input onChange={onEditChange} value={editData.price} type="number" name='price' placeholder='Type here' required />
                                </div>
                            </div>
                            <div style={{display:'flex',gap:'10px',marginTop:'10px'}}>
                                <button className='add_btn' type="submit">Save</button>
                                <button type="button" className='add_btn' style={{background:'#e2e8f0',color:'#374151'}} onClick={closeEdit}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default List