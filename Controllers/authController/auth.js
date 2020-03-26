const daoUser = require("../../DAO/userDao");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const redis = require('../../services/redis')



exports.signIn = async (req, res)=>{
    let {name, lastName,email, password, id_role } = req.body;  
   
    bcrypt.hash(password,10).then(  hash=>{
        password =hash;
        console.log(password);

        try {
            let user = {
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            id_role: id_role
            };        
            daoUser.createUser(user,(err,response)=>{
            if(err){
                res.status(500).json({ result: false, message: "internal error" })
            }
            else{
                console.log("created",response);
                res.json({"created":response})
                
            }
            });
            
        } catch (e) {
            console.log(e);
        }
    })
   
}


exports.login = async (req, res)=>{
    let {email, password } = req.body;      
    const token = Token()
    try {
               
        await daoUser.getUserByNamePass(email,(err,response)=>{
            if(err){
                res.status(500).json({ result: false, message: "internal error" })
            }
            else{
                let pass = response[0].password
                bcrypt.compare(password, pass).then(result =>{
                    if(!result){
                        res.status(403).send('Contraseña invalida!')
                    }else{
                        //console.log('datos', response);
                        let user = {
                            name : response[0].name,
                            lastName : response[0].lastName,
                            email : response[0].email,
                            id_role : response[0].id_role
                        }
                        let tokenTime= process.env.TOKEN_TIME
                        redis.insert(token,JSON.stringify(user),tokenTime, err=>{
                            if(err) res.status(500).send('Error')
                            else{
                                res.json({result: true, token : token, role:user.id_role})
                            }
                        })    
                        
                        // redisService.insert(
                        //     `TOKEN_${token}`,
                        //     JSON.stringify(result),
                        //     process.env.TOKEN_TIME,
                        //     err => {
                        //       if (err) {
                        //         return res.status(500).send(false);
                        //       }
                        //       const resp = {
                        //         user: {
                        //           id: result.id,
                        //           username: result.username
                        //         },
                        //         access_token: token
                        //       };
                        //       return res.send(resp);
                        //     }
                        //   );
                    }
                    
                })
                
                //res.json({"created":response})
                //res.json({token})
                
            }
        }); 
        
    } catch (e) {
        console.log(e);
    }
}
Token = (size = 10) => {
    let text = '';
    let possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i++) {
        text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return text;
  };