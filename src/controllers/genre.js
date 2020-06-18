const helpers = require('../helpers/index')
const genreModel = require('../models/genre')
const Joi = require('@hapi/joi');

module.exports = {
    getAllGenre: async function(req, res) {
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
            } else if (sort && !search) {
                const result = await genreModel.searchPageSortModel('', sort)
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (search && !sort) {
                const result = await genreModel.searchPageSortModel(search, 'created_at')
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            }
            const result = await genreModel.searchPageSortModel(search, sort)
            results.results = result.slice(start, end)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    getIdGenre: async function(req, res) {
        const id = req.params.id;
        try {
            const result = await genreModel.getIdGenreModel(id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal server error', 500)
        }
    },

    postGenre: async function(req, res) {
        const setData = req.body
        const schema = Joi.object({
            'genre_name': Joi.string().required()
        });

        try {
            try {
                await schema.validateAsync(setData)
                const result = await genreModel.postGenreModel(setData)
                return helpers.response(res, 'success', result, 200)
            } catch (err) {
                return helpers.response(res, 'fail', 'Name is a required field', 400)
            }
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    putGenre: async function(req, res) {
        const setData = req.body;
        const id = req.params.id;
        const schema = Joi.object({
            'genre_name': Joi.string().required()
        });

        try {
            try {
                await schema.validateAsync(setData)
                const result = await genreModel.putGenreModel(setData, id)
                return helpers.response(res, 'success', result, 200)
            } catch (err) {
                return helpers.response(res, 'fail', 'Name is a required field', 400)
            }
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
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    }
}