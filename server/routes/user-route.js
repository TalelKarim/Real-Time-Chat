import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import {registerUser} from '../controllers/userController.js'
import {authUser} from '../controllers/userController.js'
import {allUsers} from "../controllers/userController.js"


const router = express.Router()



router.post('/',registerUser) 
router.post('/login', authUser)

router.get('/',protect,  allUsers)

export default router