import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiErrors.js"
import {User} from "../models/user.model.js"

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
      // check for images : for avtar and coverimage 
      // upload them on cloudinary, avtar
      // create user object - create entry in db
      // remove password and refresh token field from response 
      // check for user creation : return response 

})

export {registerUser};