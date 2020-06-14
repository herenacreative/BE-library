const helpers = require('../helpers/index')
const genreModel = require('../models/genre')
const Joi = require('@hapi/joi');

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
        const schema = Joi.object({
            genre_name: Joi.string().required()
        });
        const setData = req.body
        const valid = await schema.validateAsync(result)
        try {

            const result = await genreModel.postGenreModel(setData, valid)
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