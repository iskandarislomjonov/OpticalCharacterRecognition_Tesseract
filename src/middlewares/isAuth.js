
const { verify } = require("../libs/jwt");

const isAuth =async (req, res, next) => {
  try {
    const {token} = req.cookies;
    console.log(token);
    if (token) {
      const Verify=await verify(token);
      if(Verify){
        console.log(Verify);
        req.userId = Verify;
        res.redirect("/")
      }
    }
  else{
    next()
  }
  } catch (error) {
    res.status(403).json({msg:error.message})
  }
};

module.exports = isAuth;
