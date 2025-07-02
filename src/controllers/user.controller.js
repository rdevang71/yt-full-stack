import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { apiError } from "../utils/apiErrors.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new apiError(400, "Invalid userId");
  }

  try {
    const user = await User.findById(userId).select("+refreshToken");
    if (!user) {
      throw new apiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong While generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  const { username, email, fullName, password } = req.body;

  //add validation check
  // if(fullName==="")
  // {
  //       throw new apiError(400,"Full Name is required !! !")
  // }
  if (
    [username, email, fullName, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new apiError(400, "All Fields Are Required!!");
  }
  // check if user already exist : username , email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new apiError(409, "user already exist");
  }

  // check for images : for avtar and coverimage
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar image needed");
  }

  // upload them on cloudinary, avtar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar image needed");
  }

  // create user object - create entry in db
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.secure_url || "",
    email,
    password,
  });

  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation : return response
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while creating the user");
  }
  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req.body=> data
  const { email, username, password } = req.body;

  //username or email
  if (!username && !email) {
    throw new apiError(400, "username or email is required!");
  }

  // find the user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new apiError(404, "User does not exixt!");
  }

  //password check
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(401, "Incorrect Password!");
  }

  // access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //send cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User Logged Out "));
});

const refreshAccessToken = asyncHandler(async ( req,res)=>{
      const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

     if(!incomingRefreshToken){
      throw new apiError(401, "Unauthorized Request ")
     }

     try {
      const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
 
      const user = await User.findById(decodedToken?._id)
 
      if(!user){
       throw new apiError(401, "Invalid Refresh Token")
      }
 
      if(incomingRefreshToken !== user?.refreshToken){
       throw new apiError(401,"Invalid refreshToken or Used !")
      }
 
      const options = {
       httpOnly: true,
       secure : true,
 
      }
 
      const {newaccessToken, newrefreshToken}=await generateAccessAndRefreshTokens(user._id);
 
      return res
      .status(200)
      .cookie("accessToken", newaccessToken,options)
      .cookie("refreshToken", newrefreshToken,options)
      .json(
       new apiResponse(
         200,
         {accessToken : newaccessToken , refreshToken: newrefreshToken },
         "access Token Refreshed Successfully"
       )
      )
     } catch (error) {
         throw new apiError(401, error?.message||"Invalid refresh token")
     }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;


  if (!currentPassword || !newPassword) {
    throw new apiError(400, "Current password and new password are required");
  }


  const user = await User.findById(req.user._id);
  if (!user) {
    throw new apiError(404, "User not found");
  }

 
  const isPasswordValid = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordValid) {
    throw new apiError(400, "Incorrect current password");
  }


  user.password = newPassword;
  await user.save({validateBeforeSave: false});

  return res
  .status(200)
  .json(new apiResponse(200, {}, "Password changed successfully"));
});



export { registerUser,
   loginUser,
    logoutUser,
  refreshAccessToken
 };
