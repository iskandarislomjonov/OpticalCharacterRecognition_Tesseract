require('dotenv/config')

const {env}=process

const config={
    port:env.PORT,
    key:env.SECRET_KEY
}

module.exports=config
