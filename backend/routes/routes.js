import {Router} from 'express'
import {getAllChampions, getChampionByNameOrId, createChampion, updateChampion} from '../controllers/champions.controllers.js';
import {getAllItems} from '../controllers/items.controllers.js'

const router = Router();


router.get('/champions', getAllChampions)
router.get('/champion/:nameOrId', getChampionByNameOrId)
router.post('/champions/createChampion', createChampion)
router.put('/champions/updateChampion/:id', updateChampion)
// router.delete('/champions/deleteChampion')

router.get('/items', getAllItems)
router.post('/items/createItem')
router.put('/items/updateItem')
router.delete('/items/deleteItem')

export default router;