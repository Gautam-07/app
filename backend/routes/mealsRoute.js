import express from "express";
import { addMealPlan, listMealPlans, getMealPlanById, updateMealPlan, removeMealPlan, toggleMealPlanStatus } from "../controllers/mealsController.js";
import multer from "multer";

const mealsRouter = express.Router();

// Image store engine 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
mealsRouter.post("/add", upload.single("image"), addMealPlan);
mealsRouter.get("/list", listMealPlans);
mealsRouter.get("/:id", getMealPlanById);
mealsRouter.put("/:id", upload.single("image"), updateMealPlan);
mealsRouter.post("/remove", removeMealPlan);
mealsRouter.patch("/:id/toggle", toggleMealPlanStatus);

export default mealsRouter; 