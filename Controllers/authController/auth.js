const daoUser = require("../../DAO/userDao");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const redis = require('../../services/redis')
const sendEmail = require('../../services/sendEmail')



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
                                res.json({result: true, token : token, user:user})
                            }
                        })    
                        
                        
                    }
                    
                })  
            }
        }); 
        
    } catch (e) {
        console.log(e);
    }
}
exports.resetPass = async (req,res)=>{
    //console.log(req.body);
    const codeEmail = CodePass();
    const userEmail = req.body.email
    userCode = {
        email : userEmail,
        code : codeEmail
    }
    redis.insert(JSON.stringify(codeEmail),userEmail,900,errr=>{
        if(errr) res.status(500).send('Error insert')
        
    })
    sendEmail.emailSend(userCode,(err,result)=>{
        if (err)res.status(500).send("Internal Server Error")
            
    })
    res.json({message: "Email enviado!"})
    
}
exports.resetPassCode = async (req,res)=>{
    const code = req.query.code;
    redis.get(JSON.stringify(code),(err,result)=>{
        if (err) {            
            res.sendStatus(403)
            throw err
        }
        
         // aca devolvemos el usario q esta reseteando la contraseña  
         console.log('result resetpass', result);
          
         return res.json({user : result, code : code})
                       
        
    
    })
    
    //return res.json('hola');
}
exports.changePass = async (req,res)=>{
    let {email,pass,confirmPass}=req.body;
    if(pass===confirmPass){
        await  daoUser.getUserByNamePass(email,async (err,response)=>{
            if(err){
                res.status(500).json({ result: false, message: "internal error" })
            }
            else{      
                await bcrypt.hash(pass,10).then( async hash=>{                
                    pass =hash;
                    let id = response[0].id
                    let user = {
                        id: id,
                        pass : pass,
                        confirmPass :pass
                    }
                    await  daoUser.updateUser(user,(err,responses)=>{
                            if(err){
                                res.status(500).json({ result: false, message: "internal error" })
                            }else{
                                res.status(200).json({message:'Contraseña Cambiada con exito!'})
                                    
                            }
                    })
                })
                
            }
        }); 
    }else{
        res.status(500).json({ result: false, message: "Las contraseñas no son iguales" })
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

  CodePass = (size = 6)=>{
    let code = '';
    let possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i++) {
        code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return code;
  }