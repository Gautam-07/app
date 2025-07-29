import orderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";


//placing  order

const placeOrder = async (req, res) => {
    try {
        // Get user ID from auth middleware
        const userId = req.user.id;
        // Get user data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        // Get order data from request body
        const { items, amount, address, paymentMethod } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.json({ success: false, message: "Order items required" });
        }
        if (!amount) {
            return res.json({ success: false, message: "Order amount required" });
        }
        if (!address) {
            return res.json({ success: false, message: "Address required" });
        }
        // Create order with provided payment method
        const order = new orderModel({
            userId,
            items,
            amount,
            address, // now storing as object
            payment: paymentMethod || "Cash on Delivery"
        });
        await order.save();
        // Clear user's cart
        user.cartData = {};
        await user.save();
        res.json({ success: true, message: `Order placed successfully (${order.payment})`, order });

    } catch (error) {
        console.error("Error placing order:", error);
        res.json({ success: false, message: "Failed to place order", error: error.message });
    }
}
const userOrders = async (req,res) =>{
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({userId});
        if (!orders || orders.length === 0) {
            return res.json({success:false, message:"No orders found for this user", orders: []});
        }
        res.json({success:true, message:"User orders fetched successfully", orders});
    } catch (error) {
        console.log("Error fetching user orders:", error);
        res.json({success:false, message:"Failed to fetch user orders"});
    }
}
// listing orders 

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data:orders });
        
    } catch (error) {
        console.log("Error listing orders:", error);
        res.json({ success: false, message: "Failed to list orders" });
        
        
    }

}
// api for status update 

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.log("Error updating order status:", error);
        res.json({ success: false, message: "Failed to update order status" });
    }
}
export {placeOrder, userOrders, listOrders, updateStatus }