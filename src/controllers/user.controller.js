import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req,res)=>{
      //get user details from frontend
      //add validation check
      // check if user already exist : username , email
      // check for images : for avtar and coverimage 
      // upload them on cloudinary, avtar
      // create user object - create entry in db
      // remove password and refresh token field from response 
      // check for user creation : return response 

})

export {registerUser};