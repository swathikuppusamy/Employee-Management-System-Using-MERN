import express from 'express'
import { login , verify } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'
// const app=express();
// import cors from 'cors';

// app.use(cors()); // Enable CORS for all routes

const router = express.Router()

router.post('/login',login)
router.get('/verify',authMiddleware , verify)

export default router;