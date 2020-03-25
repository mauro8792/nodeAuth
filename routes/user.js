const express = require( 'express' )
const userController = require( '../controllers/userController' )
const router = express.Router()

router.get('/', userController.index  )
router.post('/', userController.store )
// router.post('/login', userController.login )
router.get('/:id', userController.show )
// router.delete('/:id', userController.delete )
// router.put('/:id', userController.update )

module.exports = router 