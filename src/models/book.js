const connection = require('../helpers/mysql')
const multer = require('multer')
const upload = multer({ dest: __dirname + './public/images' });
//const path = require('path');
//const upload = multer({ dest: './public/images' })

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/images');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, '../public/uploadssss')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

//const upload = multer({ storage: storage })

module.exports = {
    getAllBookModel: function() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT b.book_id, b.book_name, b.description, b.image, g.genre_name, a.author_name, b.status FROM book_tb b INNER JOIN author_tb a INNER JOIN genre_tb g ON (b.author_id=a.author_id && b.genre_id=g.genre_id)', function(err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    },

    postBookModel: function(setData) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO book_tb SET ? ', upload.single('image'), setData, function(err, result) {
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