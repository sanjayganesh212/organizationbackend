var jwt = require('jsonwebtoken');

var jwtscrt = process.env.jwt;

module.exports = {

jwtsign : async (data)=>{
    try {
        return new Promise( async(resl , rej)=>{
            let enctwt =  jwt.sign({data}, jwtscrt, { expiresIn: '2h' });
            if(enctwt){
             resl(enctwt)
            }else{
             rej(false)
            }
         })
    } catch (error) {
        console.log("console--->> ~ file: common.js:19 ~ error:", error)
        rej(false)     
    } 
} ,

jwtcheck : async (req , res , token) =>{

    try {
        return new Promise( async(resl , rej)=>{

            jwt.verify(token, jwtscrt, function (err, decoded) {
                if (!err && decoded.data) {
                    resl(decoded)
                } else {
                    res.json({
                        status: 401,
                        message: 'Unauthorized'
                    })
                    res.end()
                }

            });
        })
      } catch(err) {
        
        console.log("console--->> ~ file: common.js:37 ~ err:", err)
        res.json({
            status :  401,
            message : 'Unauthorized'
           })
           res.end()
      }

}


}


