import { Router } from "express";
import {
  checkUser,
  deleteUser,
  getAllUsers,
  onBoardUser,
  updateUser
} from "../controllers/AuthController.js";

const router = Router();

// Route to check user
router.post("/check-user", checkUser);

// Route to onboard user
router.post("/onBoardUser", onBoardUser);

// Route to get all users
router.get("/get-contacts", getAllUsers);

// Route to delete users
router.delete("/deleteUser/:id", deleteUser);

// Route to update users
router.put("/updateUser/:id", updateUser);

export default router;
