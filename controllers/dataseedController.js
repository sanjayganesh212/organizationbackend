
const { Validator } = require('node-input-validator');
const fs = require('fs');
const path = require('path');
const OrgSchema = require('../models/organization.js');
const userSchema = require('../models/user.js');

const common = require('../helper/common.js');



var commonfile = require('../helper/common.js')
var encryptDrycpt = require('../helper/encryptDecrypt.js')



exports.seedorgData  = async(req , res)=>{

try {
    let finddata = await OrgSchema.find({})

    if(finddata?.length == 0){
   // Path to the JSON file
   const filePath = path.join( __dirname, '../seeddata/organizationdata.json');
    
   // Read data from the JSON file
   fs.readFile(filePath, 'utf8', async (error, data) => {
     if (error) {
       res.json({
           status : 500 ,
           message : error.message
       })
       return;
     }
   try{
       
     const jsonData = JSON.parse(data);
     let saveOrgDetails = await OrgSchema.create(jsonData);
     console.log("console--->> ~ file: dataseedController.js:32 ~ saveOrgDetails:", saveOrgDetails)
     if(saveOrgDetails){
       res.json({
           status : 200 ,
           message : "Organization Details Seeded Successfully"
       })
       return;
     }else{
       res.json({
           status : 500 ,
           message : error.message
       })
       return;
     }
       
   }catch(error){
       res.json({
           status : 500 ,
           message : error.message
       })
       return;
   }
   
   });
    }else{
        res.json({
            status : 400 ,
            message : "Organization data already Seeded"
        })
        return; 
    }
 
} catch (error) {

    console.log("console--->> ~ file: dataseedController.js:61 ~ error:", error)
    
}



}


exports.seedAdminSignupData  = async(req , res)=>{

try {

    let findadminData = await userSchema.find({role : 'admin'})

    if(findadminData?.length != 0){

        res.json({
            status : 402,
            message : "Admin data is already Exist"
        })
        res.end();
    }else{


    const filePath = path.join( __dirname, '../seeddata/adminRoleSignup.json');
    
    // Read data from the JSON file
    fs.readFile(filePath, 'utf8', async (error, data) => {
      console.log("console--->> ~ file: dataseedController.js:102 ~ data:", data)
      console.log("console--->> ~ file: dataseedController.js:101 ~ error:", error)
      if (error) {
        res.json({
            status : 500 ,
            message : error.message
        })
        res.end()
        return;
      }
    try{
      let jsonData = JSON.parse(data);
      jsonData.password = await encryptDrycpt.bcrypt_hashpass(jsonData.password)

      let saveuserDetails = await userSchema.create(jsonData);
      console.log("console--->> ~ file: dataseedController.js:32 ~ saveOrgDetails:", saveuserDetails)
      if(saveuserDetails){
        res.json({
            status : 200 ,
            message : "Admin role data has been inserted , kindly Log-in"
        })
        return;
      }else{
        res.json({
            status : 500 ,
            message : error.message
        })
        return;
      }
        
    }catch(error){
        res.json({
            status : 500 ,
            message : error.message
        })
        return;
    }  
    });
}


} catch (error) {
    
    res.json({
        status : 500,
        message : error.message 
    })
    res.end()
}
}
