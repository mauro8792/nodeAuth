const daoUser = require("../../DAO/userDao");

const jwt = require('jsonwebtoken')

exports.signIn = (req, res)=>{
    let {name, lastName,email, password, id_role } = req.body;  
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
    
    
}
exports.login = (req, res)=>{
    let {email, password } = req.body;
    user ={
        email :email,
        password : password
    }  
    const token = jwt.sign(user, 'my_secret_key')
    try {
               
        daoUser.getUserByNamePass(email, password,(err,response)=>{
        if(err){
            res.status(500).json({ result: false, message: "internal error" })
        }
        else{
            console.log("created",response);
            console.log(token);
            
            res.json({"created":response,
            'token' : token})
            //res.json({token})
            
        }
        }); 
        
    } catch (e) {
        console.log(e);
    }
}