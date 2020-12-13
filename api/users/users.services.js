const pool = require("../../config/database");

exports.create = (data, callBack) => {
    pool.query(
        `insert into registration(firstName, lastName, role, userName, password, company) values(?,?,?,?,?,?)`,
        [
            data.firstName,
            data.lastName,
            'cl',
            data.userName,
            data.password,
            data.companyname
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}


exports.getUserByUserUserName = (userName, callBack) => {
    pool.query(
        `select * from registration where userName = ?`,
        [userName],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
}


exports.getUserByUserId = (id, callBack) => {
    pool.query(
        `select * from registration where id = ?`,
        [id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
}


exports.getUsers = callBack => {
    pool.query(
        `select id,firstName,lastName,role,userName,company from registration where role = 'cl'`,
        [],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}


exports.updateUser = (id, data, callBack) => {
    console.log(data.newpassword)
    pool.query(
        `update registration set firstName=?, lastName=?, password=?,userName=?,company=?  where id = ?`,
        [
            data.firstName,
            data.lastName,
            data.newpassword,
            data.userName,
            data.company,
            id
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}


exports.deleteUser = (id, callBack) => {
    console.log('service', id)
    pool.query(
        `delete from registration where id = ?`,
        [id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

