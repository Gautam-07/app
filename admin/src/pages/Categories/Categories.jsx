import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Categories.css';

const Categories = ({ url }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/categories/admin/categories`);
            if (response.data.success) {
                setCategories(response.data.categories);
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

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle image selection
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }
            
            setFormData(prev => ({ ...prev, image: file }));
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Upload image and get URL
    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('categoryImage', file);
            
            const response = await axios.post(`${url}/api/upload-category-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.success) {
                return response.data.imageUrl;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            image: null
        });
        setImagePreview(null);
        setEditingCategory(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Add new category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = null;
            
            if (formData.image) {
                imageUrl = await uploadImage(formData.image);
            }

            const response = await axios.post(`${url}/api/categories/admin/categories`, {
                name: formData.name,
                description: formData.description,
                image: imageUrl
            });
            
            if (response.data.success) {
                toast.success('Category added successfully!');
                setShowAddModal(false);
                resetForm();
                fetchCategories();
            }
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error(error.response?.data?.message || 'Failed to add category');
        }
    };

    // Edit category
    const handleEditCategory = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = editingCategory.image;
            
            if (formData.image) {
                imageUrl = await uploadImage(formData.image);
            }

            const response = await axios.put(`${url}/api/categories/admin/categories/${editingCategory._id}`, {
                name: formData.name,
                description: formData.description,
                image: imageUrl
            });
            
            if (response.data.success) {
                toast.success('Category updated successfully!');
                setShowEditModal(false);
                resetForm();
                fetchCategories();
            }
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error(error.response?.data?.message || 'Failed to update category');
        }
    };

    // Delete category
    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await axios.delete(`${url}/api/categories/admin/categories/${categoryId}`);
                if (response.data.success) {
                    toast.success('Category deleted successfully!');
                    fetchCategories();
                }
            } catch (error) {
                console.error('Error deleting category:', error);
                toast.error(error.response?.data?.message || 'Failed to delete category');
            }
        }
    };

    // Toggle category status
    const handleToggleStatus = async (categoryId) => {
        try {
            const response = await axios.patch(`${url}/api/categories/admin/categories/${categoryId}/toggle`);
            if (response.data.success) {
                toast.success(response.data.message);
                fetchCategories();
            }
        } catch (error) {
            console.error('Error toggling category status:', error);
            toast.error('Failed to toggle category status');
        }
    };

    // Open edit modal
    const openEditModal = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description || '',
            image: null
        });
        setImagePreview(category.image ? `${url}${category.image}` : null);
        setShowEditModal(true);
    };

    return (
        <div className="categories-container">
            <div className="categories-header">
                <h1>Category Management</h1>
                <button 
                    className="add-category-btn"
                    onClick={() => setShowAddModal(true)}
                >
                    + Add New Category
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading categories...</div>
            ) : (
                <div className="categories-list">
                    {categories.length === 0 ? (
                        <div className="no-categories">
                            <p>No categories found. Add your first category!</p>
                        </div>
                    ) : (
                        categories.map((category) => (
                            <div key={category._id} className={`category-card ${!category.isActive ? 'inactive' : ''}`}>
                                <div className="category-image">
                                    <img 
                                        src={category.image ? `${url}${category.image}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iNDAiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTQwIDQwQzQ0LjE4MyA0MCA0Ny41IDM2LjY4MyA0Ny41IDMyLjVDNDcuNSAyOC4zMTcgNDQuMTgzIDI1IDQwIDI1QzM1LjgxNyAyNSAzMi41IDI4LjMxNyAzMi41IDMyLjVDMzIuNSAzNi42ODMgMzUuODE3IDQwIDQwIDQwWiIgZmlsbD0iI0NDQyIvPgo8cGF0aCBkPSJNNDAgNDVDNDYuMDc1IDQ1IDUxIDQwLjA3NSA1MSAzNEM1MSAyNy45MjUgNDYuMDc1IDIzIDQwIDIzQzMzLjkyNSAyMyAyOSAyNy45MjUgMjkgMzRDMjkgNDAuMDc1IDMzLjkyNSA0NSA0MCA0NVoiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTQwIDQ1QzQ2LjA3NSA0NSA1MSA0MC4wNzUgNTEgMzRDNTEgMjcuOTI1IDQ2LjA3NSA0MyA0MCA0M0MzMy45MjUgNDMgMjkgMjcuOTI1IDI5IDM0QzI5IDQwLjA3NSAzMy45MjUgNDUgNDAgNDVaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo='} 
                                        alt={category.name}
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iNDAiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTQwIDQwQzQ0LjE4MyA0MCA0Ny41IDM2LjY4MyA0Ny41IDMyLjVDNDcuNSAyOC4zMTcgNDQuMTgzIDI1IDQwIDI1QzM1LjgxNyAyNSAzMi41IDI4LjMxNyAzMi41IDMyLjVDMzIuNSAzNi42ODMgMzUuODE3IDQwIDQwIDQwWiIgZmlsbD0iI0NDQyIvPgo8cGF0aCBkPSJNNDAgNDVDNDYuMDc1IDQ1IDUxIDQwLjA3NSA1MSAzNEM1MSAyNy45MjUgNDYuMDc1IDIzIDQwIDIzQzMzLjkyNSAyMyAyOSAyNy45MjUgMjkgMzRDMjkgNDAuMDc1IDMzLjkyNSA0NSA0MCA0NVoiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTQwIDQ1QzQ2LjA3NSA0NSA1MSA0MC4wNzUgNTEgMzRDNTEgMjcuOTI1IDQ2LjA3NSA0MyA0MCA0M0MzMy45MjUgNDMgMjkgMjcuOTI1IDI5IDM0QzI5IDQwLjA3NSAzMy45MjUgNDUgNDAgNDVaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo=';
                                        }}
                                    />
                                </div>
                                <div className="category-info">
                                    <h3>{category.name}</h3>
                                    <p>{category.description || 'No description'}</p>
                                    <div className="category-meta">
                                        <span className={`status ${category.isActive ? 'active' : 'inactive'}`}>
                                            {category.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <span className="created-date">
                                            Created: {new Date(category.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="category-actions">
                                    <button 
                                        className="edit-btn"
                                        onClick={() => openEditModal(category)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className={`toggle-btn ${category.isActive ? 'deactivate' : 'activate'}`}
                                        onClick={() => handleToggleStatus(category._id)}
                                    >
                                        {category.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDeleteCategory(category._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Add Category Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Category</h2>
                            <button 
                                className="close-btn"
                                onClick={() => setShowAddModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleAddCategory}>
                            <div className="form-group">
                                <label htmlFor="name">Category Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter category description (optional)"
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Category Image</label>
                                <div className="image-upload-section">
                                    <input
                                        type="file"
                                        id="image"
                                        ref={fileInputRef}
                                        onChange={handleImageSelect}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    <button 
                                        type="button" 
                                        className="select-image-btn"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Select Image
                                    </button>
                                    {imagePreview && (
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Category Modal */}
            {showEditModal && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Category</h2>
                            <button 
                                className="close-btn"
                                onClick={() => setShowEditModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleEditCategory}>
                            <div className="form-group">
                                <label htmlFor="edit-name">Category Name *</label>
                                <input
                                    type="text"
                                    id="edit-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-description">Description</label>
                                <textarea
                                    id="edit-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter category description (optional)"
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-image">Category Image</label>
                                <div className="image-upload-section">
                                    <input
                                        type="file"
                                        id="edit-image"
                                        ref={fileInputRef}
                                        onChange={handleImageSelect}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    <button 
                                        type="button" 
                                        className="select-image-btn"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {imagePreview ? 'Change Image' : 'Select Image'}
                                    </button>
                                    {imagePreview && (
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Update Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories; 