import express from 'express';
import { placeOrder, userOrders, listOrders, updateStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

// Route to place an order
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/userorder', authMiddleware, userOrders);
orderRouter.get('/list', listOrders)
orderRouter.post('/status', updateStatus )

export default orderRouter;