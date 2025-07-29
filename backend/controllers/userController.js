import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create token
const createToken = (id)=> {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Function to create a login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const token = createToken(user._id);
        res.json({ success: true, user, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
}

// Function to create a register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user =  await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, user, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
}

// Function to update profile picture
const updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const { profilePicture } = req.body;
        
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        user.profilePicture = profilePicture;
        await user.save();
        
        res.json({ success: true, user, message: "Profile picture updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
}

// Function to get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select('-password');
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
}

export {loginUser, registerUser, updateProfilePicture, getUserProfile};
