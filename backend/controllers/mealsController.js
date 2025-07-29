import mealsModel from "../models/mealsModel.js";
import fs from "fs";

// Add new meal plan
const addMealPlan = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const mealPlan = new mealsModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        duration: req.body.duration,
        mealsPerDay: req.body.mealsPerDay,
        image: image_filename,
        features: req.body.features ? JSON.parse(req.body.features) : []
    });

    try {
        await mealPlan.save();
        res.json({ success: true, message: "Meal plan added successfully", mealPlan });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add meal plan" });
    }
};

// Get all meal plans
const listMealPlans = async (req, res) => {
    try {
        const mealPlans = await mealsModel.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, mealPlans });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to fetch meal plans" });
    }
};

// Get meal plan by ID
const getMealPlanById = async (req, res) => {
    try {
        const mealPlan = await mealsModel.findById(req.params.id);
        if (!mealPlan) {
            return res.json({ success: false, message: "Meal plan not found" });
        }
        res.json({ success: true, mealPlan });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to fetch meal plan" });
    }
};

// Update meal plan
const updateMealPlan = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            duration: req.body.duration,
            mealsPerDay: req.body.mealsPerDay,
            features: req.body.features ? JSON.parse(req.body.features) : []
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const mealPlan = await mealsModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!mealPlan) {
            return res.json({ success: false, message: "Meal plan not found" });
        }

        res.json({ success: true, message: "Meal plan updated successfully", mealPlan });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to update meal plan" });
    }
};

// Remove meal plan
const removeMealPlan = async (req, res) => {
    try {
        const mealPlan = await mealsModel.findById(req.body.id);
        if (mealPlan && mealPlan.image) {
            fs.unlink(`uploads/${mealPlan.image}`, () => {});
        }
        await mealsModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Meal plan removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to remove meal plan" });
    }
};

// Toggle meal plan status
const toggleMealPlanStatus = async (req, res) => {
    try {
        const mealPlan = await mealsModel.findById(req.params.id);
        if (!mealPlan) {
            return res.json({ success: false, message: "Meal plan not found" });
        }

        mealPlan.isActive = !mealPlan.isActive;
        await mealPlan.save();

        res.json({ 
            success: true, 
            message: `Meal plan ${mealPlan.isActive ? 'activated' : 'deactivated'} successfully`,
            mealPlan 
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to toggle meal plan status" });
    }
};

export { addMealPlan, listMealPlans, getMealPlanById, updateMealPlan, removeMealPlan, toggleMealPlanStatus }; 