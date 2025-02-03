import express from 'express'
import { loginUser, registerUser, UpdateUserProfile } from '../Controllers/UserController.js';



const router = express.Router();

// ************* PUBLIC ROUTES *************
router.post("/", registerUser)
router.post("/login", loginUser)

// ************* PRIVATE ROUTES *************
router.put("/", UpdateUserProfile);


export default router;