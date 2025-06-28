import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiErrors.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const generateAccessAndRefreshTokens = async(userId)=>{
      try {
            const user = await User.findById(userId)
            const accessToken = user.generateAccessToken()
            const refreshToken = user.generateRefreshToken()
      } catch (error) {
            throw new apiError(500,"Something went wrong While generating refresh and access token")
      }
}

const registerUser = asyncHandler(async (req,res)=>{
      //get user details from frontend
      const {username , email , fullName ,password}=req.body

      //add validation check
      // if(fullName==="")
      // {
      //       throw new apiError(400,"Full Name is required !! !")
      // }
      if([username, email,fullName,password].some((field)=>{
            field?.trim()===""
      }))
      {
            throw new apiError(400, "All Fields Are Required!!")
      }
      // check if user already exist : username , email
      const existedUser= await User.findOne({
            $or:[ { username } , { email }]
      })
      if(existedUser) {
            throw new apiError(409,"user already exist")
      }

      // check for images : for avtar and coverimage 
       const avatarLocalPath= req.files?.avatar[0]?.path;
       const coverImageLocalPath= req.files?.coverImage[0]?.path;
       
       
       if(!avatarLocalPath)
       {
            throw new apiError(400,"Avatar image needed")
       }

      // upload them on cloudinary, avtar
      const avatar = await uploadOnCloudinary(avatarLocalPath)
      const coverImage = await uploadOnCloudinary(coverImageLocalPath)
      
      if(!avatarLocalPath)
       {
            throw new apiError(400,"Avatar image needed")
       }


      // create user object - create entry in db
      const user = await User.create({
            fullName,
            username: username.toLowerCase(),
            avatar: avatar.url,
            coverImage: coverImage?.secure_url || "",
            email,
            password,
            
      })

      
      // remove password and refresh token field from response 
      const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
      )
      

      // check for user creation : return response
      if(!createdUser)
      {
            throw new apiError(500,"Something went wrong while creating the user")
      }
      return res.status(201).json(
            new apiResponse(200 , createdUser , "User Registered Successfully" )
      ) 

})

const loginUser = asyncHandler(async (req,res) =>{
      //req.body=> data
      const{ email , username , password } =req.body
     
      //username or email
       if(!username || !email){
          throw new apiError(400,"username or email is required!")
      }


      // find the user
      const user = await User.findOne({
            $or:[{username},{email}]
      })

      if(!user){
            throw new apiError(404,"User does not exixt!")
      }


      //password check
      const isPasswordValid =await user.isPasswordCorrect(password)
      if(!isPasswordValid){
            throw new apiError(401,"Incorrect Password!")
      }


      // access and refresh token
      //send cookie
      // send response

})

export {
      registerUser,
      loginUser
};