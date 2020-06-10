const helpers = require('../helpers/index')
const authorModel = require('../models/author')

module.exports = {
    getAllAuthor: async function(req, res) {
        try {
            const result = await authorModel.getAllAuthorModel()
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal server error', 500)
        }
    },

    postAuthor: async function(req, res) {
        const setData = req.body
        try {
            const result = await authorModel.postAuthorModel(setData)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    putAuthor: async function(req, res) {
        const setData = req.body;
        const id = req.params.id;
        try {
            const result = await authorModel.putAuthorModel(setData, id)
            return helpers.response(res, 'success', result, 200)
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
        } catch (error) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }

    }


}