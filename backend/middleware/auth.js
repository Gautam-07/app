import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Unauthorized access" });
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: token_decode.id };
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Invalid token" });
    }
}

export default authMiddleware;