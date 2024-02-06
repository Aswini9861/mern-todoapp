
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
dotenv.config();
export const Requiresignin = (request, response, next) => {
  try {
    const token = request.headers.authorization;
    const decodedToken = Jwt.verify(token, process.env.SECRET_KEY);
    request.user = decodedToken;
    next();
  } catch (error) {
    console.log(error)
    return response.status(401).send({
        message:'invalid request'
    })


  }
};
