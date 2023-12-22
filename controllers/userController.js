
var commonfile = require('../helper/common.js')

var encryptDrycpt = require('../helper/encryptDecrypt.js')

const { Validator } = require('node-input-validator');

const userSchema = require('../models/user.js');
const orgSchema = require('../models/organization.js');
const common = require('../helper/common.js');

const dbPrefix = process.env.dbPrefix;
const collectionNames = require("../helper/collection.js")


exports.viewDetails = async (req, res) => {


    try {
        if (req.id != undefined || req.role != undefined) {
            let id = req.id;
            let role = req.role;
            if (role != 'admin') {

                try {
                    userSchema.findById({ _id: id }, { _id: 0 })
                        .then(userdata => {
                            res.json({
                                status: 200,
                                message: "Success",
                                data: userdata
                            })
                        }).catch(error => {
                            res.json({
                                status: 400,
                                message: error.message,
                                data: null
                            })
                        })


                } catch (error) {

                    console.log("console--->> ~ file: userController.js:23 ~ error:", error)
                    return res.json({
                        status: 500,
                        message: "Internal server Error",
                        data: []

                    })

                }

            } else {
                console.log('elseeee')

                orgSchema.aggregate([

                    {
                        $lookup: {
                            from: "SCI_dXNlckluZm8=",
                            localField: "nameOFtheOrganization",
                            foreignField: "org_name",
                            as: "userDetails"
                        }
                    },
                    {
                        $unwind: '$userDetails'
                    },
                    {
                        $match: { "userDetails.role": "employee" }
                    },
                    {
                        $group: {
                            _id: '$_id',
                            nameOFtheOrganization: { $first: '$nameOFtheOrganization' },
                            companyStartDate: { $first: '$companyStartDate' },
                            numberOfEmployess: { $first: '$numberOfEmployess' },
                            discription: { $first: '$discription' },
                            services: { $first: '$services' },
                            blogs: { $first: '$blogs' },
                            contact_us: { $first: '$contact_us' },

                            allEmp: {
                                $push: {
                                    $cond: {
                                        if: { $eq: ['$userDetails.role', 'employee'] },
                                        then: {
                                            $mergeObjects: [
                                                {
                                                    _id: '$userDetails._id',
                                                    name: '$userDetails.username',
                                                    email: '$userDetails.email',
                                                    role: '$userDetails.role',
                                                    org_name: '$userDetails.org_name',
                                                    profile: '$userDetails.profile',
                                                    bio: '$userDetails.bio',
                                                    social: '$userDetails.social',
                                                    createdAt: '$userDetails.createdAt'


                                                },

                                            ]
                                        },

                                        else: null
                                    }
                                }
                            }
                        }
                    },




                ]).then(result => {

                    try {
                        result = result[0];
                        console.log("console--->> ~ file: userController.js:119 ~ result:", result)
                        result.numberOfEmployess = result.allEmp.length != undefined ? result.allEmp.length : 0

                        res.json({
                            status: 200,
                            message: "Success",
                            organization_data: result
                        })
                    } catch (error) {
                        console.log("console--->> ~ file: userController.js:128 ~ error:", error)
                        res.json({ status: 400, message: "Kindly Signup for Single Employee atleast" })

                    }

                }).catch(error => {
                    res.json({ status: 400, message: error.message, organization_data: null })
                })

                // orgSchema.aggregate([
                //     {
                //         $lookup: {
                //             from: "SCI_dXNlckluZm8=",
                //             localField: "nameOFtheOrganization",
                //             foreignField: "org_name",
                //             as: "userDetails"
                //         }
                //     },
                //     {
                //         $unwind: '$userDetails'
                //     },
                //     {
                //         $match: { "userDetails.role" : "employee"}
                //     },
                //     {
                //         $sort: {createdAt: -1 }
                //     }
                // ]).then(result => {
                //     res.json({ status: 200, message: "Success", data: result })
                // }).catch(error => {
                //     res.json({ status: 400, message: error.message, data: null })
                // })

                // aggr
                // return res.json({
                //     status: 500,
                //     message: "Not admin role",
                //     data: []

                // })


            }

        } else {
            res.json({
                status: 402,
                message: "Something went wrong, try again after sometimes",
                data: []

            })
        }
    } catch (error) {

        console.log("console--->> ~ file: userController.js:18 ~ error:", error)

        return res.json({

            status: 500,
            message: "Internal server Error",
            data: []

        })
    }

}



