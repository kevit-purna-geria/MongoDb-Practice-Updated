import { verify } from 'jsonwebtoken'


const auth = async (req, res, next) =>{
    try{
        const token = req.header('Authorization').replace("Bearer ", "")
        const decoded = verify(token, "Secret-key")
        req.token = token
    }catch(e){
        res.status(401).send("Please Authenticate")
    }
    next()
}


export default auth