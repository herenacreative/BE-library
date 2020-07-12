const helpers = require('../helpers/index')
const authModel = require('../models/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../configs/server');

module.exports = {
    register: async function(req, res) {
        const setData = req.body
        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(setData.password, salt)
        setData.password = hashPass;
        setData.role = "user";
        try {
            const result = await authModel.registerModel(setData);
            delete result.password
            return helpers.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error);
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    login: async function(req, res) {
        const loginData = req.body
        try {
            const result = await authModel.loginModel(loginData.username);
            if (result.length > 0) {
                const hashPass = result[0].password;
                const checkPass = bcrypt.compareSync(loginData.password, hashPass);
                if (checkPass) {
                    delete result[0].password;
                    const tokenData = {
                        ...result[0]
                    }
                    const token = jwt.sign(tokenData, config.jwtSecretKey, { expiresIn: '1 days' })
                    result[0].token = token;
                    const refreshTokenNew = jwt.sign(tokenData, config.jwtSecretKeyNew, { expiresIn: '7 days' })
                    result[0].refreshTokenNew = refreshTokenNew;
                    return helpers.response(res, 'success', result, 200);
                }
                return helpers.response(res, 'fail', 'Username or password is wrong!', 400);
            }
            return helpers.response(res, 'fail', 'Username or password is wrong!', 400);
        } catch (err) {
            console.log(err, 'g');
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    refreshToken: async function(req, res) {
        const authorization = req.headers.authorization;
        try {
            const tokenData = {
                ...req.decodedRefreshToken
            }
            delete tokenData.iat;
            delete tokenData.exp;
            const token = jwt.sign(tokenData, config.jwtSecretKey, { expiresIn: '1 days' })
            const refreshTokenNew = jwt.sign(tokenData, config.jwtSecretKeyNew, { expiresIn: '7 days' })
            tokenData.refreshTokenNew = refreshTokenNew;
            tokenData.token = token;
            return helpers.response(res, 'success', tokenData, 200);
        } catch (err) {
            console.log(err);
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    getAllUser: async function(req, res) {
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
                const result = await authModel.getAllUserModel()
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            } else if (sort && !search) {
                const result = await authModel.searchPageSortModel('', sort)
                results.results = result.slice(start, end)
                console.log(results.results)
                return helpers.response(res, 'success', results, 200)
            } else if (search && !sort) {
                const result = await authModel.searchPageSortModel(search, 'created_at')
                results.results = result.slice(start, end)
                return helpers.response(res, 'success', results, 200)
            }
            const result = await authModel.searchPageSortModel(search, sort)
            results.results = result.slice(start, end)
            return helpers.response(res, 'success', results, 200)
        } catch (err) {
            console.log(err, 'erra')
            return helpers.response(res, 'fail', 'internal Server Error', 500)
        }
    },

    getIdUser: async function(req, res) {
        const id = req.params.id;
        try {
            const result = await authModel.getIdUserModel(id)
            return helpers.response(res, 'success', result, 200)
        } catch (err) {
            console.log(err)
            return helpers.response(res, 'fail', 'internal server error', 500)
        }
    },
}