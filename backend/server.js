import express from "express";
import cors  from "cors";
import multer from "multer";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import mealsRouter from "./routes/mealsRoute.js";

//app config
const app = express()
const port =4000 

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use("/api/meals",mealsRouter);
app.use("/api/categories",categoryRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

// File upload endpoint for profile pictures
app.post('/api/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: 'No file uploaded' });
        }
        const imageUrl = `/images/${req.file.filename}`;
        res.json({ success: true, imageUrl, message: 'File uploaded successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Upload failed' });
    }
});

// File upload endpoint for category images
app.post('/api/upload-category-image', upload.single('categoryImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: 'No file uploaded' });
        }
        const imageUrl = `/images/${req.file.filename}`;
        res.json({ success: true, imageUrl, message: 'Category image uploaded successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Upload failed' });
    }
});

app.get( "/", (req, res) => {
    res.send("API is running")
})

//listen
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
}   
)