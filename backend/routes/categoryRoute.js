import express from 'express';
import { 
    getAllCategories, 
    getAllCategoriesAdmin, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    toggleCategoryStatus 
} from '../controllers/categoryController.js';

const categoryRouter = express.Router();

// Public routes (for frontend)
categoryRouter.get('/categories', getAllCategories);

// Admin routes
categoryRouter.get('/admin/categories', getAllCategoriesAdmin);
categoryRouter.post('/admin/categories', addCategory);
categoryRouter.put('/admin/categories/:id', updateCategory);
categoryRouter.delete('/admin/categories/:id', deleteCategory);
categoryRouter.patch('/admin/categories/:id/toggle', toggleCategoryStatus);

export default categoryRouter; 