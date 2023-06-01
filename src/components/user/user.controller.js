import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';


class userController{
    hashPassword(password){
        const hashedPassword =  hash(password, 8);
        return hashedPassword
    }
    genrateToken(email){
        const token = sign(email, "Secret-key");
    }
    async signUp(req, res){
        const { name, email, password } = req.body;
  
        try {
          const admin = new Admin(req.body);
          admin.password = await this.hashPassword(password);
          await admin.save();
      
          console.log({ admin });
          res.status(201).send("Admin Registered Successfully");
        } catch (e) {
          if (e.code === 11000) {
            res.status(400).send("Email Already registered!");
          } else {
            console.error(e);
            res.status(500).send("Internal Server Error");
          }
        }
    }

    login(req, res){
        Admin.find({email : req.body.email})
        .exec()
        .then(admin => {
            if(admin.length<1){
                return res.status(401).send("User not Found")
            }else{
                // Compare passwords
                compare(req.body.password, admin[0].password, (err, result) => {
                    if (err) {
                    res.status(500).send(err);
                    } else {
                    if (result) {
                        const token = sign(admin[0].name, "Secret-Key");
                        res.status(200).send(`Token : ${token}`);
                        // res.send("token : ", token)
                    } else {
                        res.status(401).send('Passwords do not match!');
                        
                    }
                    }
                });
            }
        })
        .catch(error => {
            res.status(500).send("Error : ", error)
        })
        
    }
}
export default userController