const helpers = require('../helpers/index')
const bookModel = require('../models/book')

module.exports = {
    getAllBook: async function(req, res) {
        try {
            const result = await bookModel.getAllBookModel()
            console.log(result, 'a')
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    postBook: async function(req, res) {
        const setData = req.body;
        setData.image = req.file ? req.file.filename : '';
        try {
            const result = await bookModel.postBookModel(setData)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    putBook: async function(req, res) {
        const setData = req.body;
        const id = req.params.id;
        setData.image = req.file ? req.file.filename : '';
        try {
            const result = await bookModel.putBookModel(setData, id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    deleteBook: async function(req, res) {
        const id = req.params.id;
        try {
            const result = await bookModel.deleteBookModel(id)
            return helpers.response(res, 'success', result, 200)
        } catch (error) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }

    }
}