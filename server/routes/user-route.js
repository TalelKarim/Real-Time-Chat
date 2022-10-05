import express from 'express'

const router = express.Router()
import {registerUser} from '../controllers/userController.js'
import {authUser} from '../controllers/userController.js'

router.post('/', registerUser) 
router.post('/login', authUser)


export default router