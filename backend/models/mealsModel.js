import mongoose from "mongoose";

const mealsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true, enum: ['weekly', 'monthly'] },
    mealsPerDay: { type: Number, required: true, default: 3 },
    image: { type: String, required: true },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const mealsModel = mongoose.models.meals || mongoose.model("meals", mealsSchema);
export default mealsModel; 