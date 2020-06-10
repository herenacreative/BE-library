const connection = require('../helpers/mysql')

module.exports = {
    getAllGenreModel: function() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM genre_tb', function(err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    },

    postGenreModel: function(setData) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO genre_tb SET ?', setData, function(err, result) {
                if (err) {
                    reject(err)
                }
                const newData = {
                    id: result.insertId,
                    ...setData
                };

                resolve(newData)
            })
        })
    },

    putGenreModel: function(setData, id) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE genre_tb SET ? WHERE genre_id=?', [setData, id], function(err, result) {
                if (err) {
                    reject(err)
                }
                const newData = {
                    id,
                    ...setData
                };
                resolve(newData)
            })
        })
    },

    deleteGenreModel: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM genre_tb WHERE genre_id=?', id, function(err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }
}