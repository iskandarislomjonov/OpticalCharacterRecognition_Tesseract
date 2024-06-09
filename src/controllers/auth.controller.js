const pg = require("../libs/pg");
const {passCompare,passHash}=require("../libs/bcrypt");
const { sign } = require("../libs/jwt");

const Register = async(req,res)=>{
    try {
        const { email,password,last_name,first_name} = req.body;
        const findUser = await pg("select * from users where email = $1",email);
        if (findUser.length) {
            return res.status(403).json({message:'Bunday foydalanuvchi mavjud'})
        }
        else{   
        const hashPass = await passHash(password);
       const newUser=( await pg (`insert into users(password,email,first_name,last_name) values($1,$2,$3,$4)`,
       hashPass,email,first_name,last_name))[0];
            // res.redirect('/login_page');
        res.status(201).json({message:"succes register"})
        }
        } catch (error) {
        res.status(400).json({message:error.message})
        }
        }
const Login = async(req,res) => {
    try {
        const {email,password } = req.body;
        const findUser = (await pg("select * from users where email = $1",email))[0];
              console.log(findUser);
        if (!findUser) { 
            return  res.status(403).json({message:'Bunday foydalanuvchi mavjud emas.'})
        }
        console.log(password,findUser.password);
        const compare = await passCompare(password,findUser.password)
        if(!compare){
            return res.status(403).json({message:'Password xato'})
        }
        const token = await sign(findUser.id);
        res.cookie("token", token);
        res.status(200).json({message:'Success'})
        } catch (error) {
        res.status(400).json({message:error.message})
    }
    }
    module.exports={
        Login,
        Register
    }