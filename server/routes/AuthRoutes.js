import { Router } from "express";
import {
  checkUser,
  getAllUsers,
  onBoardUser
} from "../controllers/AuthController.js";

import {
  AdminGetAllUsers,
  updateUser,
  deleteUser,
  cronUser
} from "../controllers/AdminController.js"

const router = Router();

// Route to check user
router.post("/check-user", checkUser);

// Route to onboard user
router.post("/onBoardUser", onBoardUser);

// Route to get all users
router.get("/get-contacts", getAllUsers);

// Route handler to fetch all users
router.get('/getAllUsers', AdminGetAllUsers);

// Route handler to update a user
router.put('/updateUser/:id', updateUser);

// Route handler to delete a user
router.delete('/deleteUser/:id',deleteUser);

router.post('/cronUser',cronUser);

export default router;
