import User from "../Models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInuserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInuserId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error in getUsers" });
  }
};
