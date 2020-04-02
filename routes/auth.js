const express = require( 'express' )
const authController = require( '../Controllers/authController/auth' )
const router = express.Router()

router.post('/login', authController.login  )
router.post('/register', authController.signIn)
router.post('/resetPassword', authController.resetPass)
router.get('/resetPassword/', authController.resetPassCode)
router.put('/changePassword', authController.changePass) 


module.exports = router 