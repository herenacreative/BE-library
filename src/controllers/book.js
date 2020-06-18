const helpers = require('../helpers/index')
const bookModel = require('../models/book')

module.exports = {
    getAllBook: async function(req, res) {
        const sort = req.query.sort
        const search = req.query.search
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const start = (page - 1) * limit
        const end = page * limit

        results = {}
        results.next = {
            page: page + 1,
            limit: limit
        }
        results.preveuos = {
            page: page - 1,
            limit: limit
        }
        try {
            if (!search && !sort) {
                const result = await bookModel.getAllBookModel()
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (sort && !search) {
                const result = await bookModel.searchPageSortModel('', sort)
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (search && !sort) {
                const result = await bookModel.searchPageSortModel(search, 'created_at')
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            }
            const result = await bookModel.searchPageSortModel(search, sort)
            results.results = result.slice(start, end)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    getIdBook: async function(req, res) {
        const id = req.params.id;
        try {
            const result = await bookModel.getIdBookModel(id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal server error', 500)
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