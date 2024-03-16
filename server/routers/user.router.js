import { Router } from 'express'
import userController from '../controller/user.controller.js'
import upload from '../middleware/upload.js'
const router = new Router()
router.post('/user', upload.single('avatar'), userController.createUser)
router.get('/user', userController.getUser)
router.get('/user/:id', userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
export default router
