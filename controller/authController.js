import authModel from "../model/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const registerController = async (request, response) => {
  const { name, email, password } = request.body;
  if (!name) {
    return response.send("Name is required");
  }
  if (!email) {
    return response.send("Email is required");
  }
  if (!password) {
    return response.send("Password is required");
  }
  const existingUser = await authModel.findOne({ email });
  if (existingUser) {
    return response.status(400).send({ message: "Email is already register" });
  }
  try {
    const hashpassword = await bcrypt.hash(request.body.password, 10);
    const user = new authModel({ name, email, password: hashpassword });
    user.save();
    return response.status(200).send({
      success: true,
      message: "Register successfully created",
      user,
    });
  } catch (error) {
    response.status(400).send({
      success: false,
      message: "Something went wrong while register",
      error: error,
    });
  }
};

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email) {
      return response.send("Email is required");
    }
    if (!password) {
      return response.send("Password is required");
    }
    const user = await authModel.findOne({ email });
    if (!user) {
      return response.status(400).send({ message: "Email is not register" });
    }
    if (user) {
      const comparepassword = await bcrypt.compare(
        request.body.password,
        user.password
      );
      if (!comparepassword) {
        return response.status(400).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      return response.status(200).send({
        success:true,
        message: "Login Successfully",
        user: {
          name: user.name,
          email: user.email,
        },
        token,
      });
    }

  } catch (error) {
    return response.status(400).send({
      success: false,
      message: "something went wrong while login",
    });
  }
};
