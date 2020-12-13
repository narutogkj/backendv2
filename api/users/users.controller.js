const {
    create,
    getUserByUserUserName,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser
} = require("./users.services");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.createUser = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection errror"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}
exports.login = (req, res) => {
    const body = req.body;
    getUserByUserUserName(body.userName, (err, results) => {
        if (err) {
            console.log(err);
        }
        if (!results) {
            return res.json({
                success: 0,
                data: "Invalid email or password"
            });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
            let admin;
            if (results.role === 'sa') {
                admin = true
            } else {
                admin = false
            }
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
                expiresIn: "1h"
            });
            return res.json({
                success: 1,
                message: "login successfully",
                token: jsontoken,
                admin

            });
        } else {
            return res.json({
                success: 0,
                data: "Invalid email or password"
            });
        }
    });
}
exports.getUserByUserId = (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record not Found"
            });
        }
        results.password = undefined;
        return res.json({
            success: 1,
            data: results
        });
    });
}
exports.getUsers = (req, res) => {
    getUsers((err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            data: results
        });
    });
}
exports.updateUsers = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            message: "updated successfully"
        });
    });
}
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    deleteUser(id, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (results.affectedRows == 0) {
            return res.json({
                success: 0,
                message: "Record Not Found"
            });
        }
        return res.json({
            success: 1,
            message: "user deleted successfully"
        });
    });
}




