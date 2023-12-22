
# Project Name

Organization 

description :

This is  an Organization where admin can view organization datas and as well as employees data and able to delete and modify the bio of the employee data , where as Employee can Only view his/him data after login 

there func are done by passing BearerToken in the headers (JWT) which you can get from login responce 



## Installation

**IMPORTANT**
 Since Git repo won't allow to download .env file so i,ve included new file called "env.example" 
copy env.example file and make new file as .env near app.js  and paste datas from here to there and proceed further
npm i 

## run commond 

Since i've used Nodemon in the script 

the run common will be ----> "nodemon app.js" 

## Usage

STEP 1 :

The seeding should proceed should be done first 

Seeding APIs

Method : GET
http://localhost:8083/dataseed/seedOrganizationDetails  // it will seed organization details

Method : GET
http://localhost:8083/dataseed/seedAdminSignupData  // it will seed admin signup data (Only One admin data is allowed)



STEP 2 :

-- This is signup api for employee --

Method : POST
http://localhost:8083/auth/signupPortal

Sample Req :

{
    "username": "sanjay",
    "email": "sanjayganesh2000@gmail.com",
    "password": "sanjay",
    "cpassword": "sanjay",
    "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "profile": {
        "firstName": "sanjay",
        "lastName": "ganesh",
        "profileimg": "https://sampleimg.org"
    },
    "social": {
        "twitter": "https://twitter/",
        "linkedin": "https://linkedIn/",
        "github": "https://github/"
    }
}





-- loginAPI Which return Token --

Method : POST
http://localhost:8083/auth/LoginPortal

Sample Request :

 {

    "email":"sanjayganesh2000@gmail.com",
    "password" : "sanjay"
}


Sample Responce : 

{
    "status": 200,
    "message": "",
    "token": ""
}


STEP : 3 

Note : This API Should be hit after employee signup

Method : GET
Requied : Bearer {Token} in Authetication headers

http://localhost:8083/user/viewDetails

responce : 

Result will be differ based on role 


STEP 4:

Other APis are below which admin can only access

Method : GET

http://localhost:8083/employee/getEmployeeList


Method : GET
Params : id
http://localhost:8083/employee/getEmployeeByID/:id


Method : PATCH
Params : id

http://localhost:8083/employee/updateEmployeeBioById/:id  

Request Body : 

{
    "bio" : "Sample......"
}


Method : DELETE
Params : id

http://localhost:8083/employee/deleteEmployeeById/:id



Other Ideas To Implements in furture 

*--> Socket.io connections implementation 
*--> Encrypt Email Id in db 
*--> require RateLimit for con-currency Connection req per second
*--> Limit Req Size 
*--> Make as Micro-server arch ( Organization as seperate and employee as seperate)
*--> Implementation Of redis 




APIs Idea

*--> Forget password for Employee
*--> change password for employee
*--> Admin side Block user 
*--> Login Count for employee
*--> When user sign up increase the TotalEmp count in Organization db 
*--> Logout functionality

