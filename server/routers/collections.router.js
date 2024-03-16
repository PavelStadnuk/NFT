import { Router } from 'express'
import CollectionController from '../controller/collections.controller.js'
import uploadMultiple from '../middleware/uploadC.js'
const router = new Router()
router.post(
	'/collection',
	uploadMultiple,
	CollectionController.createCollection
)
router.get('/collections', CollectionController.getCollections)
router.get('/collection/:user_id', CollectionController.getCollection)
export default router
