import { createContext, useState , useEffect} from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [userProfile, setUserProfile] = useState(null);
    const url = "https://homely-backend-cj6n.onrender.com";
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    // Filter food list based on search query
    const filteredFoodList = food_list.filter((food) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            food.name.toLowerCase().includes(query) ||
            food.description.toLowerCase().includes(query) ||
            food.category.toLowerCase().includes(query)
        );
    });

    const addToCart = async (itemId) => {
        if (!cartItems) {
            setCartItems({ [itemId]: 1 });
        } else if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }
    
    const removeFromCart = async (itemId) => {
        if (!cartItems || !cartItems[itemId]) return;
        
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }
    // useEffect(()=>{
    //     console.log("Cart Items Updated:", cartItems);
    // }),[cartItems];
    const getTotalCartAmount =()=>{
        let totalAmount =0;
        if (!cartItems || !food_list) return totalAmount;
        
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product)=> product._id === item);
                if (itemInfo && itemInfo.price) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }
    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.foods);
    
    }
    
    useEffect(() => {
        fetchFoodList();
    }, []);
    
    const loadCartData = async (token) => {
        const response = await axios.get(url+"/api/cart/get", {
            headers: {token}
        });
        setCartItems(response.data.cartData);
    }

    // Function to upload profile picture
    const uploadProfilePicture = async (file) => {
        try {
            const formData = new FormData();
            formData.append('profilePicture', file);
            
            const response = await axios.post(url + '/api/upload-profile-picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token
                }
            });
            
            if (response.data.success) {
                return response.data.imageUrl;
            }
            return null;
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            return null;
        }
    };

    // Function to update user profile picture
    const updateUserProfilePicture = async (imageUrl) => {
        try {
            const response = await axios.put(url + '/api/user/profile-picture', 
                { profilePicture: imageUrl },
                { headers: { token } }
            );
            
            if (response.data.success) {
                setUserProfile(response.data.user);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating profile picture:', error);
            return false;
        }
    };

    // Function to get user profile
    const getUserProfile = async () => {
        try {
            if (!token) return;
            
            const response = await axios.get(url + '/api/user/profile', {
                headers: { token }
            });
            
            if (response.data.success) {
                setUserProfile(response.data.user);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(()=>{
        async function loadData(){
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                await getUserProfile();
            }
            
        }
        loadData();
    },[]);

    // Effect to fetch user profile when token changes
    useEffect(() => {
        if (token) {
            getUserProfile();
        }
    }, [token]);

    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setToken("");
        setUserProfile(null);
        navigate("/");
    }

    const contextValue = {
        food_list,
        filteredFoodList,
        searchQuery,
        setSearchQuery,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userProfile,
        uploadProfilePicture,
        updateUserProfilePicture,
        getUserProfile,
        logout

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
