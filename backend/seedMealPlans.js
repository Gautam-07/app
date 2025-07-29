import mongoose from "mongoose";
import mealsModel from "./models/mealsModel.js";
import { connectDB } from "./config/db.js";

const sampleMealPlans = [
    {
        name: "Weekly Basic Plan",
        description: "Perfect for busy professionals who want healthy meals without the hassle. Includes 3 nutritious meals per day for 7 days.",
        price: 1200,
        duration: "weekly",
        mealsPerDay: 3,
        image: "1753725210690-c.butterscotch cake.jpg", // Using existing image
        features: [
            "Fresh ingredients daily",
            "Free delivery",
            "Nutritionist approved",
            "No cooking required"
        ],
        isActive: true
    },
    {
        name: "Weekly Premium Plan",
        description: "Our most popular plan featuring gourmet meals with premium ingredients. Perfect for food enthusiasts who appreciate quality.",
        price: 1800,
        duration: "weekly",
        mealsPerDay: 3,
        image: "1753725260132-c.chocolate cake.jpg", // Using existing image
        features: [
            "Premium ingredients",
            "Chef-crafted recipes",
            "Free delivery",
            "Priority customer support",
            "Customizable preferences"
        ],
        isActive: true
    },
    {
        name: "Weekly Light Plan",
        description: "Ideal for those watching their calorie intake. Delicious, portion-controlled meals that help you maintain a healthy lifestyle.",
        price: 900,
        duration: "weekly",
        mealsPerDay: 2,
        image: "1753725313495-c.vanilla cake.jpg", // Using existing image
        features: [
            "Calorie-controlled portions",
            "Fresh ingredients",
            "Free delivery",
            "Nutritional information included"
        ],
        isActive: true
    },
    {
        name: "Monthly Basic Plan",
        description: "Great value for long-term commitment. Enjoy 3 meals per day for a full month with significant savings.",
        price: 4200,
        duration: "monthly",
        mealsPerDay: 3,
        image: "1753725475121-d.kheer.jpg", // Using existing image
        features: [
            "Best value for money",
            "Fresh ingredients daily",
            "Free delivery",
            "Flexible meal times",
            "Monthly discount applied"
        ],
        isActive: true
    },
    {
        name: "Monthly Premium Plan",
        description: "The ultimate dining experience with premium ingredients and exclusive recipes. Perfect for those who demand the best.",
        price: 6500,
        duration: "monthly",
        mealsPerDay: 3,
        image: "1753725783445-d.jalebi rabdi.jpg", // Using existing image
        features: [
            "Premium ingredients",
            "Exclusive recipes",
            "Free delivery",
            "Priority support",
            "Customizable menu",
            "Monthly discount applied"
        ],
        isActive: true
    },
    {
        name: "Monthly Family Plan",
        description: "Designed for families who want healthy, delicious meals without the stress of meal planning and cooking.",
        price: 8000,
        duration: "monthly",
        mealsPerDay: 3,
        image: "1753725874177-n.vegetable-noodles.jpg", // Using existing image
        features: [
            "Family-sized portions",
            "Kid-friendly options",
            "Free delivery",
            "Flexible scheduling",
            "Monthly discount applied",
            "Family nutrition guidance"
        ],
        isActive: true
    }
];

const seedMealPlans = async () => {
    try {
        await connectDB();
        
        // Clear existing meal plans
        await mealsModel.deleteMany({});
        console.log("Cleared existing meal plans");
        
        // Insert new meal plans
        const insertedPlans = await mealsModel.insertMany(sampleMealPlans);
        console.log(`Successfully seeded ${insertedPlans.length} meal plans`);
        
        // Display the created plans
        insertedPlans.forEach(plan => {
            console.log(`- ${plan.name}: ₹${plan.price} (${plan.duration})`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding meal plans:", error);
        process.exit(1);
    }
};

seedMealPlans(); 