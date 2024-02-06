import express from "express";
import {
  createtodoController,
  createtodonotauth,
  deletetodoController,
  getsingletodoController,
  gettodoController,
  updatetodoController,
} from "../controller/todoController.js";
import { Requiresignin } from "../utlis/authMiddleware.js";

const router = express.Router();

router.post("/create-todo",Requiresignin, createtodoController);

router.post("/create-todo", createtodonotauth);

router.put("/update-todo/:id", updatetodoController);

//get single todo
router.get("/single-todo/:id", getsingletodoController);

// delete todo
router.delete("/delete-todo/:id", deletetodoController);

//get all todo
router.get("/todos", gettodoController);

export default router;
