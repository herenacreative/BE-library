const connection = require('../helpers/mysql')

module.exports = {
    getAllAuthorModel: function() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM author_tb', function(err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    },

    searchPageSortModel: function(search, sort, limit, sort) {
        return new Promise((resolve, reject) => {
            const sql = `select *from author_tb where author_name like '%${search}%' order by ${sort} desc limit ${limit} offset ${page}`
            connection.query(sql, function(err, result) {
                console.log(result, 'or', err)
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    },

    getIdAuthorModel: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM author_tb WHERE author_id=?', id, function(err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    },

    postAuthorModel: function(setData) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO author_tb SET ?', setData, function(err, result) {
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

    putAuthorModel: function(setData, id) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE author_tb SET ? WHERE author_id=?', [setData, id], function(err, result) {
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

    deleteAuthorModel: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM author_tb WHERE author_id=?', id, function(err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }


}