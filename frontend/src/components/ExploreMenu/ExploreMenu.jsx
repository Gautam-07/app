import React, { useState, useEffect, useContext } from 'react'
import './ExploreMenu.css'
import { assets, menu_list } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const ExploreMenu = ({ category, setCategory }) => {
    const { url } = useContext(StoreContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories from backend
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/categories/categories`);
            if (response.data.success) {
                setCategories(response.data.categories);
                // Set "All" as default if none selected
                if (!category) {
                    setCategory("All");
                }
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback to static categories if API fails
            setCategories([
                { name: "Salad", image: assets.menu_1 },
                { name: "Rolls", image: assets.menu_2 },
                { name: "Desserts", image: assets.menu_3 },
                { name: "Sandwich", image: assets.menu_4 },
                { name: "Cake", image: assets.menu_5 },
                { name: "Pure Veg", image: assets.menu_6 },
                { name: "Pasta", image: assets.menu_7 },
                { name: "Noodles", image: assets.menu_8 }
            ]);
            if (!category) {
                setCategory("All");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [url]);

    // Handle category selection with toggle functionality
    const handleCategoryClick = (categoryName) => {
        if (category === categoryName) {
            // If clicking on already selected category, deselect it and show "All"
            setCategory("All");
        } else {
            // Select the new category
            setCategory(categoryName);
        }
    };

    // Get fallback image for a category
    const getFallbackImage = (categoryName) => {
        const menuItem = menu_list.find(item => item.menu_name === categoryName);
        return menuItem ? menuItem.menu_image : assets.logo;
    };

    if (loading) {
        return (
            <div className="explore-menu">
                <h1>Food Menu</h1>
                <p className="explore-menu-text">Discover the comforting taste of home with our unique food menu—crafted by moms, for everyone who craves real food. Delivering healthy, lovingly prepared home-cooked food straight to your doorstep.</p>
                <div className="explore-menu-list">
                    <div className="loading-categories">Loading categories...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="explore-menu" id="explore_menu">
            <h1>Explore Menu</h1>
            <p className="explore-menu-text">Discover the comforting taste of home with our unique food menu—crafted by moms, for everyone who craves real food. Delivering healthy, lovingly prepared home-cooked food straight to your doorstep.</p>
            <div className="explore-menu-list">
                {/* All Categories Option */}
                <div 
                    className="explore-menu-list-item"
                    onClick={() => handleCategoryClick("All")}
                >
                    <img 
                        className={category === "All" ? "active" : ""} 
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiNGMTVBMjQiLz4KPHBhdGggZD0iTTMwIDQwQzMwIDM1IDM1IDMwIDQwIDMwSDYwQzY1IDMwIDcwIDM1IDcwIDQwVjYwQzcwIDY1IDY1IDcwIDYwIDcwSDQwQzM1IDcwIDMwIDY1IDMwIDYwVjQwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTM1IDM1QzM1IDMyLjUgMzcuNSAzMCA0MCAzMEg2MEM2Mi41IDMwIDY1IDMyLjUgNjUgMzVIMzVaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzUgMjVDMzUgMjIuNSAzNy41IDIwIDQwIDIwSDYwQzYyLjUgMjAgNjUgMjIuNSA2NSAyNUgzNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="
                        alt="All Categories"
                        onError={(e) => {
                            e.target.src = assets.logo;
                        }}
                    />
                    <p>All</p>
                </div>
                
                {/* Dynamic Categories */}
                {categories.map((item, index) => (
                    <div 
                        key={index} 
                        className="explore-menu-list-item"
                        onClick={() => handleCategoryClick(item.name)} 
                    >
                        <img 
                            className={category === item.name ? "active" : ""} 
                            src={item.image ? `${url}${item.image}` : getFallbackImage(item.name)} 
                            alt={item.name}
                            onError={(e) => {
                                e.target.src = getFallbackImage(item.name);
                            }}
                        />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu