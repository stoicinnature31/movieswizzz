import express from 'express'
import { registerUser } from '../Controllers/UserController.js';



const router = express.Router();

// ************* PUBLIC ROUTES *************
router.post("/", registerUser)


export default  router;