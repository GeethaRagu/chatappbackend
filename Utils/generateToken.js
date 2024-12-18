import jwt from 'jsonwebtoken';

const generateTokenandsetCookie = (userId,res)=>{
  const token = jwt.sign({id:userId},process.env.JWT_SECRET_KEY,{
    expiresIn : '15d'
  })

  res.cookie("jwt",token,{
    maxAge : 15*24*60*60*1000,
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_ENV !== 'development'  // secure set true only if not in development phase
  })
}
export default generateTokenandsetCookie;