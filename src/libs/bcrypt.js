const bcrypt=require('bcrypt')


const passHash=async(password)=>await bcrypt.hash(password,10)

const passCompare=async(password,hashPass)=>await bcrypt.compare(password,hashPass);



module.exports={
    passHash,
    passCompare,
}