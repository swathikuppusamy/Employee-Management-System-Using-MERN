import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addSalary, getSalary } from '../controllers/salaryContoller.js'

const router = express.Router()


router.post('/add', authMiddleware,addSalary)
router.get('/:id', authMiddleware,getSalary)

export default router