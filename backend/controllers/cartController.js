import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        // let userData = await userModel.findOne({ _id: req.body.userId });
        // let userData = await userModel.findById(req.body.userId);
        let userData = await userModel.findById(req.user.id)
        let cartData = userData.cartData ;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1; // Add item with quantity 1
        }
        else {
            cartData[req.body.itemId] += 1; // Increment quantity if item already exists
        }
        await userModel.findByIdAndUpdate(req.user.id, { cartData });
        res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add item to cart" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user.id);
        let cartData = userData.cartData;
        // if (!cartData[req.body.itemId]>0){
        //     cartData[req.body.itemId] -= 1;

        // }
        // await userModel.findByIdAndUpdate(req.user.id, { cartData });
        // ==========FIXED ============
        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }
        await userModel.findByIdAndUpdate(
            req.user.id,
            { $set: { cartData } }
        );
        
        res.json({ success: true, message: "Item removed from cart successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to remove item from cart" });
    }

}

const  getCart = async (req, res) => {
    try {
        let userData= await userModel.findById(req.user.id);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to fetch cart data" });
        
    }
}
export { addToCart, removeFromCart, getCart };