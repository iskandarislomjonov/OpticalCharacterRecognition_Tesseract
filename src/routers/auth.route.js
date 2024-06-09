const { Register, Login } = require('../controllers/auth.controller')
const isAuth = require('../middlewares/isAuth')


const router=require('express').Router()


router.post('/auth/register',Register)

router.post('/auth/login',Login)




module.exports=router
