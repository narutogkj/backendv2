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


exports.updateUser = (data, callBack) => {
    pool.query(
        `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
}


exports.deleteUser = (data, callBack) => {
    pool.query(
        `delete from registration where id = ?`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
}

