const helpers = require('../helpers/index')
const genreModel = require('../models/genre')


module.exports = {
    getAllGenre: async function(req, res) {
        try {
            const result = await genreModel.getAllGenreModel()
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    Pagenation: async function(req, res) {
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
                const result = await genreModel.getAllGenreModel()
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (sort) {
                const result = await genreModel.searchGenreModel(sort)
                results.results = result.slice(start, end)
                console.log(sort, 'g', results)
                return helpers.response(res, 'success', results, 200)
            } else if (search) {
                const result = await genreModel.searchGenreModel(search)
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            }
            const result = await genreModel.searchGenreModel(search, sort)
            results.results = result.slice(start, end)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    postGenre: async function(req, res) {
        const setData = req.body
        try {
            const result = await genreModel.postGenreModel(setData)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },


    // postGenre: async function(req, res) {
    //     const setData = req.body
    //     try {
    //         const valid = await schema.validateAsync(result)
    //         const result = await genreModel.postGenreModel(setData, valid)
    //         return helpers.response(res, 'success', result, 200)
    //     } catch (err) {
    //         return helpers.response(res, 'fail', 'internal Server Error', 500)
    //     }
    // },

    putGenre: async function(req, res) {
        const setData = req.body;
        const id = req.params.id;
        try {
            const result = await genreModel.putGenreModel(setData, id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    deleteGenre: async function(req, res) {
        const id = req.params.id;
        try {
            const result = await genreModel.deleteGenreModel(id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    }
}