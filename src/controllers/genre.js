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

    postGenre: async function(req, res) {
        const setData = req.body
        try {
            const result = await genreModel.postGenreModel(setData)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

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