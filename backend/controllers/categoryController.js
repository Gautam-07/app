import categoryModel from '../models/categoryModel.js';
import foodModel from '../models/foodModel.js';

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({ isActive: true }).sort({ name: 1 });
        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        });
    }
};

// Get all categories (including inactive for admin)
export const getAllCategoriesAdmin = async (req, res) => {
    try {
        const categories = await categoryModel.find().sort({ name: 1 });
        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        });
    }
};

// Add new category
export const addCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        // Check if category already exists
        const existingCategory = await categoryModel.findOne({ 
            name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } 
        });
        
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            });
        }

        const newCategory = new categoryModel({
            name: name.trim(),
            description: description || '',
            image: image || null
        });

        await newCategory.save();

        res.status(201).json({
            success: true,
            message: 'Category added successfully',
            category: newCategory
        });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add category'
        });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, isActive } = req.body;

        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        // Check if category exists
        const existingCategory = await categoryModel.findById(id);
        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check if new name conflicts with existing category (excluding current category)
        const nameConflict = await categoryModel.findOne({
            _id: { $ne: id },
            name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
        });

        if (nameConflict) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {
                name: name.trim(),
                description: description || '',
                image: image !== undefined ? image : existingCategory.image,
                isActive: isActive !== undefined ? isActive : existingCategory.isActive
            },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Category updated successfully',
            category: updatedCategory
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update category'
        });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if category exists
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check if category is being used by any food items
        const foodItemsUsingCategory = await foodModel.find({ category: category.name });
        if (foodItemsUsingCategory.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete category. It is being used by ${foodItemsUsingCategory.length} food item(s). Please reassign or delete those items first.`
            });
        }

        await categoryModel.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete category'
        });
    }
};

// Toggle category status (activate/deactivate)
export const toggleCategoryStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        category.isActive = !category.isActive;
        await category.save();

        res.json({
            success: true,
            message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`,
            category
        });
    } catch (error) {
        console.error('Error toggling category status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to toggle category status'
        });
    }
}; 