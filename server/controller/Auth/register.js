//main logic 
//step of api 
//we have to validate data of frontend (order) or req data
//second step
//we have to verify data from db etheri it exist or not.
//3rd step 
//data save in mongo db
//fourth step 
//send respose to frontend

const UserModel = require("../../models/user.models");
const momsvalidation = require("../../services/validationScheme");

const register = async (req, res, next) => {
  try {
    const { username, Email, password, college, year, confirmPassword } = req.body;

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const userExist = await UserModel.findOne({ Email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userCreate = new UserModel({
      username,
      Email,
      password,
      college,
      year,
    });

    await userCreate.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: { username, Email, college, year },
    });
  } catch (error) {
    next(error);
    console.error("Registration error:", error);
  }
};

module.exports = register;
