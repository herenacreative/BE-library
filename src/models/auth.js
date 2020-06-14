const connection = require('../helpers/mysql')

module.exports = {
    registerModel: function(setData) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user_tb SET ?', setData, function(error, result) {
                if (error) {
                    reject(error)
                }
                const newData = {
                    id: result.insertId,
                    ...setData
                };

                resolve(newData)
            })
        })
    },

    loginModel: function(username) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user_tb WHERE username=?', username, function(error, result) {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}