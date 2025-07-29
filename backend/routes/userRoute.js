import express from 'express';
import { loginUser, registerUser, updateProfilePicture, getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

// Route for user registration
userRouter.post('/register', registerUser);
// Route for user login
userRouter.post('/login', loginUser);
// Route for updating profile picture
userRouter.put('/profile-picture', authMiddleware, updateProfilePicture);
// Route for getting user profile
userRouter.get('/profile', authMiddleware, getUserProfile);

// Export the user router
export default userRouter;