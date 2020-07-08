const helpers = require('../helpers/index')
const borrowModel = require('../models/trans')
const returnModel = require('../models/trans')

module.exports = {
    getAllBorrow: async function(req, res) {
        const sort = req.query.sort
        const search = req.query.search
        const page = parseInt(req.query.page)   || 1
        const limit = parseInt(req.query.limit) || 6

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
                const result = await borrowModel.getAllBorrowModel()
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (sort && !search) {
                const result = await borrowModel.searchPageSortModel('', sort,  page, limit)
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (search && !sort) {
                const result = await borrowModel.searchPageSortModel(search, 'book_name', page, limit)
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            }
            const result = await borrowModel.searchPageSortModel(search, sort, page, limit)
            results.results = result.slice(start, end)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    getIdBorrow: async function(req, res) {
        const id = req.params.id;
        try {
            const result = await borrowModel.getIdBorrowModel(id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal server error', 500)
        }
    },

    postBorrow: async function(req, res) {
        const setData = req.body;
        try {
            const result = await borrowModel.postBorrowModel(setData)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },


    getAllReturn: async function(req, res) {
        const sort = req.query.sort
        const search = req.query.search
        const page = parseInt(req.query.page)   || 1
        const limit = parseInt(req.query.limit) || 6

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
                const result = await returnModel.getAllReturnedModel()
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (sort && !search) {
                const result = await returnModel.returnSearchPageSortModel('', sort,  page, limit)
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (search && !sort) {
                const result = await returnModel.returnSearchPageSortModel(search, 'book_name', page, limit)
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            }
            const result = await returnModel.returnSearchPageSortModel(search, sort, page, limit)
            results.results = result.slice(start, end)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    getIdReturn: async function(req, res) {
        const id = req.params.id;
        try {
            const result = await returnModel.getIDReturnedModel(id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal server error', 500)
        }
    },

    postReturn: async function(req, res) {
        const setData = req.body;
        try {
            const result = await returnModel.postReturnedModel(setData)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

}