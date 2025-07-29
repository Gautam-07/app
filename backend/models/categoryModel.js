import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    description: { 
        type: String, 
        default: "" 
    },
    image: { 
        type: String, 
        default: null 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Update the updatedAt field before saving
categorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);
export default categoryModel; 