"use strict";
const redis = require('redis')
exports.get = (key, callBack)=>{
    //console.log('key', key);
    
    let user = redis.createClient({host: "localhost", port: 6379});
    user.on('error', function(err){
        return callBack(err)
    })
    user.get(key, function(err,result){
        user.quit();        
        return callBack(err, result)
    })
};

exports.insert= (key, value, ttl, callBack)=>{
    let user = redis.createClient()
    user.on('connect', function(){
        console.log('user connect');
    })
    if(ttl){
       user.set(key, value, 'EX', ttl, function(err, result){
           user.quit()
           return callBack(err, result)
        })
     }else{
         user.set(key, value, function(err, result){
             user.quit()
             return callBack(err, result)
         })

     }
}

