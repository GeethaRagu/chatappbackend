import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs';
import generateTokenandsetCookie from "../Utils/generateToken.js";
import jwt from 'jsonwebtoken';

//  SIGNUP / NEW USER REGISTRATION
export const signup=async(req,res)=>{
    try {
        const {email,username,password,confirmpassword,gender,profilepic} = req.body;
        if(password!==confirmpassword){
            return res.status(400).json({message:"Password doesn't match"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exist"})
        }
        //Profile picture
        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        //Hashed password

        const hashPassword = bcryptjs.hashSync(password,10);

        const newUser = new User({
            email,
            username,
            password:hashPassword,
            gender,
            profilepic : gender === "Male" ? boyprofilepic : girlprofilepic
        })
        generateTokenandsetCookie(newUser._id,res);
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn : '15d'
          })
        await newUser.save();
        
    
        res.status(201).json({message:"User created successfully",newUser,token})

   
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal server error in signup controller"})
    }

}

//  SIGNIN / LOGIN

export const signin = async(req,res)=>{
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});

        const isPasswordCorrect = await bcryptjs.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({message:"Invalid username or password"});
        }
        generateTokenandsetCookie(user._id,res);
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn : '15d'
          })
       // console.log(token);
        res.status(200).json({message:"User Logged in successfully",user,token});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal server error in signin controller"});
        
    }
}


// SIGNOUT/LOGOUT

export const signout=(req,res)=>{
try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"User Logged out successfully"});
} catch (error) {
    console.log(error.message);
        res.status(500).json({error:"Internal server error in signout controller"});
}
}