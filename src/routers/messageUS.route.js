const { messageUS } = require('../controllers/messageUS.controller')

const router=require('express').Router()

router.post('/message',messageUS)

module.exports=router