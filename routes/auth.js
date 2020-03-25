const express = require( 'express' )
const authController = require( '../Controllers/authController/auth' )
const router = express.Router()

router.post('/login', authController.login  )
router.post('/register', authController.signIn)


module.exports = router 