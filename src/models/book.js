const connection = require('../helpers/mysql')

module.exports = {
    getAllBookModel: function() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT b.book_id, b.book_name, b. description, b.image, g.genre_name, a.author_name, b.status FROM book_tb b INNER JOIN author_tb a INNER JOIN genre_tb g ON b.author_id=a.author_id', function(err, result) {
                if (err) {
                    reject(err)
                }
                console.log(result, 'b')
                resolve(result)
            })
        })
    },

    postBookModel: function(setData) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO book_tb SET ? ', setData, function(err, result) {
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

    putBookModel: function(setData, id) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE book_tb SET ? WHERE book_id=?', [setData, id], function(err, result) {
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

    deleteBookModel: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM book_tb WHERE book_id=?', id, function(err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }
}