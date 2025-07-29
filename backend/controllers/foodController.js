import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image: image_filename,

    })
    try {
        await food.save();
        res.json({success: true, message: "Food item added successfully", food});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to add food item"});
    }
}

// add food list 

const listFood = async (req, res)=> {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, foods});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Failed to fetch food items"});
        
    }

}

// remove food item

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=> {})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food item removed successfully"})
    } catch (error) { 
        console.log(error);
        res.json({success: false, message: "Failed to remove food item"});
    }
}

// Update food item
const updateFood = async (req, res) => {
    try {
        console.log('UpdateFood called. req.body:', req.body);
        console.log('UpdateFood called. req.file:', req.file);
        const { id, name, description, price, category, image: oldImage } = req.body;
        let updateData = { name, description, price, category };
        let oldFood = await foodModel.findById(id);
        if (!oldFood) {
            console.log('Food item not found for id:', id);
            return res.json({ success: false, message: "Food item not found" });
        }
        // If a new image is uploaded, handle file and delete old image
        if (req.file) {
            updateData.image = req.file.filename;
            // Delete old image file
            if (oldFood.image) {
                try {
                    fs.unlinkSync(`uploads/${oldFood.image}`);
                } catch (err) {
                    // Ignore error if file doesn't exist
                }
            }
        } else {
            // No new image, keep the old one
            updateData.image = oldImage || oldFood.image;
        }
        console.log('UpdateFood updateData:', updateData);
        const updateResult = await foodModel.findByIdAndUpdate(id, updateData);
        console.log('UpdateFood updateResult:', updateResult);
        res.json({ success: true, message: "Food item updated successfully" });
    } catch (error) {
        console.log('UpdateFood error:', error);
        res.json({ success: false, message: "Failed to update food item", error: error.message });
    }
}


export {addFood, listFood, removeFood, updateFood};