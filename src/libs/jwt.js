const jwt =require('jsonwebtoken')
const config = require('../../config')

const secret=config.key


const sign=async(payload)=> jwt.sign(payload,secret)

const verify=async(payload)=> jwt.verify(payload,secret)


module.exports={
    sign,
    verify
}