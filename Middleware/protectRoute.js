import jwt from 'jsonwebtoken';
import User from "../Models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
   //console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token provided" });
    }

    //verify token

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    //console.log(decodedToken);
    const user = await User.findById(decodedToken.id).select("-password");
   //console.log(user);
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    req.user = user;
    //console.log(user);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error in protectRoute" });
  }
};
