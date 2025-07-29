import React ,{ useContext }from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodListitem from '../FoodListitem/FoodListitem';
import { food_list } from '../../assets/frontend_assets/assets';

const FoodDisplay = ({category}) => {
    const { filteredFoodList } = useContext(StoreContext);
    
    // Use backend data if available, otherwise fallback to static food list
    const foodData = filteredFoodList && filteredFoodList.length > 0 ? filteredFoodList : food_list;
    
    // Filter by category with flexible matching
    const categoryFilteredList = foodData.filter((item) => {
        if (category === 'All') return true;
        
        // Handle both "Deserts" and "Desserts" spelling variations
        if (category === 'Desserts') {
            return item.category === 'Desserts' || item.category === 'Deserts' || item.category === 'Desert';
        }
        
        return category === item.category;
    });

  return (
    <div className='food_display' id='food_display' >
        <h2>Dishes near you</h2>
        <div className="food_display_list">
          {categoryFilteredList.length > 0 ? (
            categoryFilteredList.map((item, index) => {
              return <FoodListitem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            })
          ) : (
            <div className="no-results">
              <p>No dishes found matching your search .</p>
            </div>
          )}
        </div>
    </div>
  )
}

export default FoodDisplay