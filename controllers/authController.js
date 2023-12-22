
var commonfile = require('../helper/common.js')

var encryptDrycpt = require('../helper/encryptDecrypt.js')

const { Validator } = require('node-input-validator');

const userSchema = require('../models/user.js');
const orgSchema = require('../models/organization.js');

const common = require('../helper/common.js');


/// employee / user SignUp
exports.signupPortal = async (req, res) => {

    try {

        const { username, email, password, role, bio, profile, social } = req.body;

        const validationcheck = new Validator(req.body, {
            email: 'required|email',
            password: 'required|minLength:3|maxLength:15',
            cpassword: 'required|same:password',

        });

        validationcheck.check().then(async (matched) => {
            if (!matched) {
                let erkey = Object.keys(validationcheck.errors)
                let err = validationcheck.errors[erkey[0]].message;
                res.json({
                    status: 422,
                    message: err
                })
                res.end();
            } else {
                try {

                    let org_name = await orgSchema.find({})
                    if (org_name?.length == 1) {
                        let orgobj =  org_name[0];
                        const existingUser = await userSchema.findOne({
                            $or: [
                                { username },
                                { email },
                            ],
                        });

                        if (existingUser) {

                            return res.json({
                                status: 402,
                                message: 'Email or username is already in use'
                            });

                        }
                        // Create a new user instance
                        let hashedPassword = await encryptDrycpt.bcrypt_hashpass(password)
                        const newUser = new userSchema({
                            username,
                            email,
                            password: hashedPassword,
                            role: 'employee', //  Since this signup API is from user side the role is set as employee as default,
                            bio,
                            profile,
                            social,
                            org_name:orgobj.nameOFtheOrganization

        });

                        // Save the user to the database
                        try {
                            let resp = await newUser.save()
                            if (resp) {

                                res.json({
                                    status: 201,
                                    message: 'your have registered successfully',
                                });
                            } else {
                                res.json({
                                    status: 402,
                                    message: 'Unable to Signup , try after sometime',

                                });
                            }
                        } catch (error) {
                            console.log("console--->> ~ file: authController.js:84 ~ error:", error)
                            res.json({
                                status: 402,
                                message: 'Unable to Signup , try after sometime',

                            });
                        }

                    } else {
                        res.json({
                            status: 402,
                            message: 'Ask admin to seed organization details',

                        });
                    }






                } catch (error) {
                    console.error('Error registering user:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }


            }
        })        // Check if the email already exists




    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


/// employee / user / Login SignUp
exports.LoginPortal = async (req, res) => {

    try {
        const validationcheck = new Validator(req.body, {
            email: 'required|email',
            password: 'required'
        });

        validationcheck.check().then(async (matched) => {
            if (!matched) {
                let erkey = Object.keys(validationcheck.errors)
                let err = validationcheck.errors[erkey[0]].message;
                res.json({
                    status: 422,
                    message: err
                })
                res.end();
            } else {

                try {
                    const { email, password } = req.body;

                    // Find the user by email
                    const user = await userSchema.findOne({ email });

                    // If the user doesn't exist, return an error
                    if (!user) {
                        return res.json({
                            status: 401,
                            message: 'Invalid emailId'
                        });
                    }

                    let userpwd = user.password
                    const isPasswordValid = await encryptDrycpt.comparePassword(password, userpwd);
                    console.log("console--->> ~ file: authController.js:47 ~ isPasswordValid:", isPasswordValid)

                    if (!isPasswordValid) {
                        return res.json({
                            status: 401,
                            message: 'Invalid Credentials'
                        });
                    }

                    // If the password is valid, generate a JWT token
                    let objforjwt = {
                        id: user._id,
                        email: user.email,
                        role: user.role
                    }

                    try {
                        let generateJwt = await common.jwtsign(objforjwt);
                        console.log("console--->> ~ file: authController.js:65 ~ generateJwt:", generateJwt)
                        if (generateJwt) {
                            if (user.role != 'admin') {
                                return res.json({
                                    status: 200,
                                    message: `Hi ${user.username}`,
                                    token: generateJwt
                                });
                            } else {
                                return res.json({
                                    status: 200,
                                    message: `Hi ${user.username} alis ADMIN , You  can access all APIs by passing this below Bearer Token in the headers of APIs`,
                                    token: generateJwt
                                });
                            }


                        } else {
                            return res.json({
                                status: 401,
                                message: 'Unable to login , Try aftersometimes'
                            });
                        }
                    } catch (error) {

                        console.error('Error during login:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    }

                    // Return the token and user information
                    res.json({ token, user: { username: user.username, email: user.email } });
                } catch (error) {
                    console.error('Error during login:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        })

    } catch (error) {

        console.log("console--->> ~ file: authController.js:11 ~ error:", error)
        res.json({
            status: 400,
            message: 'Cannot able to create DDP users'
        })
    }

};




