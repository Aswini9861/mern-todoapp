import express from "express";
import dotenv from "dotenv";
import todorouter from "./routes/todoRoutes.js";
import authrouter from "./routes/authRoutes.js"
import ConnectDB from "./config/db.js";
import morgan from "morgan";
import cors from 'cors'
dotenv.config();
ConnectDB();

const app = express();
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

const port = process.env.PORT || 9000;

app.use("/api/v1/todo", todorouter);
app.use("/api/v1/auth", authrouter);

app.get("/", (request, response) => {
  response.send("hello world");
});

app.listen(port, () => {
  console.log(`server running on ${port} made on port ${port}`.bgCyan.white);
});
