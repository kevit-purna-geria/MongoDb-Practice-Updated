const jwt = require('jsonwebtoken')


const auth = async (req, res, next) =>{
    try{
        const token = req.header('Authorization').replace("Bearer ", "")
        const decoded = jwt.verify(token, "Secret-key")
        req.token = token
    }catch(e){
        res.status(401).send("Please Authenticate")
    }
    next()
}


module.exports = auth