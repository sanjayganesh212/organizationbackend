var commonfile = require('../helper/common.js')
const { Validator } = require('node-input-validator');
const { ObjectId } = require('mongodb');
var userSchema = require('../models/user.js')



function isValidObjectId(id) {

    return new Promise((resolve, reject) => {
        resolve(ObjectId.isValid(id));
    })
}


/// get all Employee
exports.getEmployeeList = async (req, res) => {

    try {

        let fetchAllEmp = await userSchema.find({ role: { $ne: 'admin' } }, { password: 0 });

        let obj = {
            TotalEmployee: fetchAllEmp.length,
            data: fetchAllEmp
        }
        res.json({
            status: 200,
            data: obj
        })
        res.end();


    } catch (error) {
        console.log("console--->> ~ file: studentsController.js:116 ~ error:", error)

        res.json({
            status: 500,
            message: 'Internal Server error'
        })

    }


}

/// get all employee By ID
exports.getEmployeeByID = async (req, res) => {

    console.log("console--->> ~ file: getEmployeeByID.js:156 ~ req.query:", req.params)
    try {
        if (req.params.id != undefined) {

            let _id = req.params.id
            let idvalid = await isValidObjectId(_id)
            if (idvalid) {
                console.log("console--->> ~ file: adminRoleController.js:48 ~ _id:", _id)

                let respfromdb = await userSchema.find({ $and: [{ _id }, { role: { $ne: 'admin' } }] }, { password: 0 });

                if (respfromdb.length != 0) {

                    res.json({
                        status: 200,
                        message: respfromdb
                    })
                } else {
                    res.json({
                        status: 200,
                        message: `Employee ID not Found Or the Id is not assosiated with the role Employee`
                    })

                }
            } res.json({
                status: 403,
                message: 'Invalid Id format'
            })
            res.end()
        } else {
            res.json({
                status: 403,
                message: 'Kindly provide Id of the employee'
            })
        }



    } catch (error) {

        console.log("console--->> ~ file: adminRoleController.js:85 ~ error:", error)
        res.json({
            status: 500,
            message: 'Internal Server error'
        })

    }


}


/// Update  Employee bio By ID
exports.updateEmployeeBioById = async (req, res) => {

    try {

        if (req.params.id != undefined) {

            const validationcheck = new Validator(req.body, {

                bio: 'required|minLength:1'

            });

            validationcheck.check().then(async (matched) => {

                if (!matched) {
                    let erkey = Object.keys(validationcheck.errors)
                    let err = validationcheck.errors[erkey[0]].message;
                    res.json({
                        status: 402,
                        message: err
                    })
                    res.end();
                } else {

                    let id = req.params.id;
                    let bio = req.body.bio;
                    let idvalid = await isValidObjectId(id)
                    if (idvalid) {
                        try {

                            let respfromdb = await userSchema.find({ $and: [{ _id:id }, { role: { $ne: 'admin' } }] }, { password: 0 });

                            if (respfromdb.length != 0) {


                            const BioNeedToupd = { $set: {  bio: bio  }};
                            const result = await userSchema.updateOne({ _id: id }, BioNeedToupd);

                            if (result.modifiedCount === 1) {
                                res.json({
                                    status: 200,
                                    message: `The  Bio has been updated successfully`
                                })
                                res.end();
                            } else {

                                res.json({
                                    status: 402,
                                    message: 'Something Went wrong in updating Employee'
                                })
                                res.end();
                            }
                        }else{
                            res.json({
                                status: 402,
                                message: 'Employee ID not Found Or the Id is not assosiated with the role Employee'
                            })
                            res.end();
                        }

                        } catch (error) {
                            console.log("console--->> ~ file: adminRoleController.js:133 ~ error:", error)

                            res.json({
                                status: 500,
                                message: 'Error Occurs while update , try after somtimes'
                            })
                            res.end()

                        }

                    } else {
                        res.json({
                            status: 403,
                            message: 'Invalid Id format'
                        })
                        res.end()
                    }
                }
                })

        } else {
            res.json({
                status: 403,
                message: 'Kindly provide Id of the Employee'
            })
        }

    } catch (error) {

        console.log("console--->> ~ file: studentsController.js:116 ~ error:", error)

        res.json({
            status: 500,
            message: 'Internal Server error'
        })
        res.end()
    }



}


/// Delete Student By Id 
exports.deleteEmployeeById = async (req, res) => {

    try {
        if (req.params.id != undefined) {
            let id = req.params.id;
            let idvalid = await isValidObjectId(id)
            if (idvalid) {

                const findResult = await userSchema.findOne({ $and: [{ _id: id }, { role: 'employee' }] })
                console.log("console--->> ~ file: adminRoleController.js:180 ~ findResult:", findResult)
                if (findResult) {
                    const result = await userSchema.deleteOne({ _id: id });
                    if (result.deletedCount === 1) {
                        console.log('Document deleted successfully');
                        res.json({
                            status: 200,
                            message: `The Employee Id of ${req.params.id} has been deleted successfully`
                        })
                        res.end();
                    } else {
                        console.log('Document not found');
                        res.json({
                            status: 402,
                            message: 'Something Went wrong in deleting Student'
                        })
                        res.end();
                    }
                } else {
                    res.json({
                        status: 403,
                        message: 'The Given Employee Id is not assosiated with the Role Employee or Id has been deleted already'
                    })
                    res.end()
                }
            } else {

                res.json({
                    status: 403,
                    message: 'Invalid Id format'
                })
                res.end()
            }

        } else {
            res.json({
                status: 403,
                message: 'Kindly provide Id of the Employee'
            })
            res.end()
        }

    } catch (error) {
        console.log("console--->> ~ file: adminRoleController.js:234 ~ error:", error)

        res.json({
            status: 500,
            message: 'Internal Server error'
        })
        res.end()
    }



}




