import React, { useContext } from 'react'
import './LoginPopup.css' // Assuming you have a CSS file for styling
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
    const {url,setToken} = useContext(StoreContext);
    const [currState, setCurrState] = React.useState("Sign Up"); 
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }
    const onLogin = async (event)=>{
        event.preventDefault();
        let newUrl = url;
        if(currState==="Login"){
            newUrl += "/api/user/login";
        }
        else{
            newUrl += "/api/user/register";
        }
        const response = await axios.post(newUrl,data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("userId",response.data.user._id);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    }


    

  return (
    <div className='login_popup'>
        <form onSubmit={onLogin} className='login_popup_container'>
            <div className="login_popup_title">
                <h2>{currState}</h2>
                <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login_popup_input">
                {currState==="Login"
                ?<></>
                :<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required />
                }
               <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
               <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Your password ' required />
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login_popup_condition">
                <input type="checkbox" required />
                <p>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
            </div>
            {currState==="Login"
            ?<p>Create a new Account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
            :<p>Already have an Account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup