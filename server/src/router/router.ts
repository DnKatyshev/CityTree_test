import express from "express";
import DataController from '../controllers/dataController'


const router = express.Router()

router.get('/get-citizens', DataController.getData)
router.post('/add-citizen', DataController.addCitizen)

export default router;