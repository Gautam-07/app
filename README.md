# Food Delivery App with Meal Subscription System

A complete food delivery application with a beautiful meal subscription system featuring weekly and monthly plans.

## Features

### 🍽️ Meal Subscription System
- **Weekly Plans**: 1-week meal subscriptions with different tiers
- **Monthly Plans**: 1-month meal subscriptions with better value
- **Multiple Meal Options**: 1, 2, or 3 meals per day
- **Beautiful UI**: Modern, responsive design with animations
- **Admin Management**: Complete CRUD operations for meal plans

### 🛒 Food Delivery Features
- Food item management
- Shopping cart functionality
- Order management
- User authentication
- Responsive design

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Multer** for file uploads
- **JWT** for authentication
- **CORS** enabled

### Frontend
- **React.js** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **React Toastify** for notifications
- **CSS3** with modern animations

### Admin Panel
- **React.js** admin interface
- **Toast notifications**
- **Image upload functionality**
- **Real-time data management**

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Admin Setup
```bash
cd admin
npm install
```

### 5. Environment Configuration
Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```

### 6. Database Setup
```bash
cd backend
npm run seed
```

This will populate the database with sample meal plans.

## Running the Application

### 1. Start Backend Server
```bash
cd backend
npm run server
```
Server will run on `http://localhost:4000`

### 2. Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### 3. Start Admin Panel
```bash
cd admin
npm run dev
```
Admin panel will run on `http://localhost:5174`

## API Endpoints

### Meal Plans
- `GET /api/meals/list` - Get all active meal plans
- `POST /api/meals/add` - Add new meal plan (admin only)
- `GET /api/meals/:id` - Get specific meal plan
- `PUT /api/meals/:id` - Update meal plan (admin only)
- `POST /api/meals/remove` - Remove meal plan (admin only)
- `PATCH /api/meals/:id/toggle` - Toggle meal plan status (admin only)

### Food Items
- `GET /api/food/list` - Get all food items
- `POST /api/food/add` - Add new food item (admin only)
- `POST /api/food/remove` - Remove food item (admin only)

### User Management
- `POST /api/user/login` - User login
- `POST /api/user/register` - User registration

### Cart & Orders
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/order/add` - Place order
- `GET /api/order/list` - Get user orders

## Sample Meal Plans

The system comes with 6 pre-configured meal plans:

### Weekly Plans
1. **Weekly Basic Plan** - ₹1,200 (3 meals/day)
2. **Weekly Premium Plan** - ₹1,800 (3 meals/day)
3. **Weekly Light Plan** - ₹900 (2 meals/day)

### Monthly Plans
1. **Monthly Basic Plan** - ₹4,200 (3 meals/day)
2. **Monthly Premium Plan** - ₹6,500 (3 meals/day)
3. **Monthly Family Plan** - ₹8,000 (3 meals/day)

## Features Overview

### Frontend Features
- **Responsive Design**: Works on all devices
- **Beautiful Animations**: Smooth transitions and hover effects
- **Filter System**: Filter plans by duration (weekly/monthly)
- **Price Calculation**: Shows price per meal
- **Interactive UI**: Hover effects and modern design

### Admin Features
- **Add Meal Plans**: Complete form with image upload
- **Manage Plans**: List, edit, delete, and toggle status
- **Feature Management**: Add/remove features for each plan
- **Image Upload**: Drag and drop image functionality
- **Real-time Updates**: Instant feedback on actions

### Backend Features
- **RESTful API**: Clean and organized endpoints
- **File Upload**: Image handling with Multer
- **Data Validation**: Input validation and error handling
- **Database Management**: Efficient MongoDB operations
- **Authentication**: JWT-based security

## File Structure

```
app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── foodController.js
│   │   ├── mealsController.js
│   │   ├── userController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── foodModel.js
│   │   ├── mealsModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── foodRoute.js
│   │   ├── mealsRoute.js
│   │   └── userRoute.js
│   ├── uploads/
│   ├── server.js
│   └── seedMealPlans.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── Meals/
│   │   │       ├── Meals.jsx
│   │   │       └── Meals.css
│   │   └── App.jsx
│   └── package.json
└── admin/
    ├── src/
    │   ├── pages/
    │   │   ├── AddMealPlan/
    │   │   └── ListMealPlans/
    │   └── App.jsx
    └── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

---

**Note**: Make sure to install `react-toastify` in the frontend if you encounter any import errors:
```bash
cd frontend
npm install react-toastify
``` 