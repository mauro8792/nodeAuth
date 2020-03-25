exports.ensureToken =(req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    //chequeamos q la cabecera no sea undefined
    if(typeof bearerHeader !== 'undefined'){
        //seaparamos nuestra cabecera, la plabra bearer del token
        const bearer = bearerHeader.split(" ");
        //guardamos el token en una variable, anterior mente se hizo un arreglo de dos posiciones
        const bearerToken = bearer[1]
        req.token = bearerToken
        next();
    }else{
        res.sendStatus(403)
    }
    
}