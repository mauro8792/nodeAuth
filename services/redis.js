"use strict";
const redis = require('redis')
exports.get = (key, callBack)=>{
    console.log('key', key);
    
    let user = redis.createClient({host: "localhost", port: 6379});
    user.on('error', function(err){
        return callBack(err)
    })
    user.get(key, function(err,result){
        user.quit();        
        console.log('result redis GET', result);
        
        return callBack(err, result)
    })
};

exports.insert= (key, value, ttl, callBack)=>{
    console.log('valor del redis', value);
    
    console.log('key insert', key);
    let user = redis.createClient()
    user.on('connect', function(){
        console.log('user connect');
    })
    if(ttl){
       user.set(key, value, 'EX', ttl, function(err, result){
           user.quit()
           console.log('result redis linea 26', result);
           
           return callBack(err, result)
        })
     }else{
         user.set(key, value, function(err, result){
             user.quit()
             return callBack(err, result)
         })

     }
}

