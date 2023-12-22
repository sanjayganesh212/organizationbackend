
var common = require('./common.js')

module.exports.authcheck = async (req , res, next)=>{


    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

        try {
            let token = req.headers.authorization.split(' ')[1]
            let decodeToken = await common.jwtcheck(req, res, token);
 

            if (decodeToken.data != null) {
                let datas = decodeToken.data ;
                 req.id = datas.id ;
                 req.role = datas.role;
                next()  /// token Valid

            } else {
                
                res.json({
                    status: 401,
                    message: 'Unauthorized'
                })
                res.end()
            }

        } catch (error) {
            console.log("console--->> ~ file: middleware.js:21 ~ error:", error)
            res.json({
                status: 401,
                message: 'Unauthorized'
            })
            res.end()
        }


    } else {

        res.json({
            status: 401,
            message: 'Unauthorized'
        })
        res.end()
    }





}

module.exports.rolecheck =  async(req, res , next)=>{
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

        try {
            let token = req.headers.authorization.split(' ')[1]
            let decodeToken = await common.jwtcheck(req, res, token);
 

            if (decodeToken.data != null) {
                let datas = decodeToken.data ;
                if( datas?.role == 'admin'){
                    req.id = datas.id ;
                    req.role = datas.role;
                   next()  /// token Valid
                }else{
                    res.json({
                        status: 401,
                        message: 'Unauthorized ! Only Admin role has privilage'
                    })
                    res.end() 
                }
             

            } else {
                
                res.json({
                    status: 401,
                    message: 'Unauthorized'
                })
                res.end()
            }

        } catch (error) {
            console.log("console--->> ~ file: middleware.js:21 ~ error:", error)
            res.json({
                status: 401,
                message: 'Unauthorized'
            })
            res.end()
        }


    } else {

        res.json({
            status: 401,
            message: 'Unauthorized'
        })
        res.end()
    }


}