const redis = require('../services/redis')

exports.userLog = (req,res, next)=>{
    let tokenHeader = req.headers['authorization']
    const token = tokenHeader.split(" ");
    console.log('token',token);
    
    redis.get(token[1], (err, result)=>{
        if (err) {            
            res.sendStatus(403)
            throw err
        }
        try{
            let response = result
            let resp = JSON.parse(response)
           
            if (resp.id_role!==1) {
                return res.status(403).send('no eres administrador')
            }
            next();            
        }catch(e){
            return res.status(500).send('error middlware')
        }
    })
}