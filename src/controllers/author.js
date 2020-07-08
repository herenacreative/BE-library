const helpers = require('../helpers/index')
const authorModel = require('../models/author')
const Joi = require('@hapi/joi');

module.exports = {
    getAllAuthor: async function(req, res) {
        const sort = req.query.sort
        const search = req.query.search
        const page = req.query.page || 1
        const limit = req.query.limit || 5
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
                const result = await authorModel.getAllAuthorModel()
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (sort && !search) {
                const result = await authorModel.searchPageSortModel('', sort)
                results.results = result.slice(start, end)
                console.log(results.results)
                return helpers.response(res, 'success', results, 200)
            } else if (search && !sort) {
                const result = await authorModel.searchPageSortModel(search, 'created_at')
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            }
            const result = await authorModel.searchPageSortModel(search, sort)
            results.results = result.slice(start, end)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err, 'erra')
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    getIdAuthor: async function(req, res) {
        const id = req.params.id;
        try {
            const result = await authorModel.getIdAuthorModel(id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal server error', 500)
        }
    },

    postAuthor: async function(req, res) {
        const setData = req.body
        const schema = Joi.object({
            'author_name': Joi.string().required()
        });

        try {
            try {
                await schema.validateAsync(setData)
                const result = await authorModel.postAuthorModel(setData)
                return helpers.response(res, 'success', result, 200)
            } catch (err) {
                return helpers.response(res, 'fail', 'Name is a required field', 400)
            }
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    putAuthor: async function(req, res) {
        const setData = req.body;
        const id = req.params.id;
        const schema = Joi.object({
            'author_name': Joi.string().required()
        });

        try {
            try {
                await schema.validateAsync(setData)
                const result = await authorModel.putAuthorModel(setData, id)
                return helpers.response(res, 'success', result, 200)
            } catch (err) {
                return helpers.response(res, 'fail', 'Name is a required field', 400)
            }
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    deleteAuthor: async function(req, res) {
        const id = req.params.id;

        try {
            const result = await authorModel.deleteAuthorModel(id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }

    }


}