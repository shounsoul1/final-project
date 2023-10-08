import {Router} from 'express'
import {getAllChampions} from '../controllers/champions.controllers.js';
import {getAllItems} from '../controllers/items.controllers.js'

const router = Router();


router.get('/tft/champions', getAllChampions)
router.post('/tft/champions/create')
router.put('/tft/champions/updateChampion')
router.delete('/tft/champions/deleteChampion')

router.get('/tft/items', getAllItems)
router.post('tft/items/createItem')
router.put('/tft/items/updateItem')
router.delete('/tft/items/deleteItem')

export default router;