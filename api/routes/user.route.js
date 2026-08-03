import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();

// Test route
router.get("/test", test);

// Update user by ID — requires authentication
router.put("/update/:userId", verifyToken, updateUser);

// Delete user by ID — requires authentication
router.delete("/delete/:userId", verifyToken, deleteUser);

// Sign out current user
router.post("/signout", signout);

// Get all users — admin only, requires authentication
router.get("/getusers", verifyToken, getUsers);

// Get single user by ID — public
router.get("/:userId", getUser);

export default router;