const experess = require('express')
const router = experess.Router()
const genreController = require('../controllers/genre')
const midAuth = require('../middleware/auth')
const Joi = require('@hapi/joi');



//const valid = await schema.validateAsync(result)

router.get('/', midAuth.verifyJwtToken, genreController.Pagenation)
router.post('/', genreController.postGenre, async(req, res) => {
    let { err } = ValidationErr(genreController.postGenre)
    if (err) { return res.status(403).send(err.details[0].message) }

})

function ValidationErr(msg) {
    const Schema = Joi.object({
        'genre_name': Joi.string().required()
    });
    const result = Joi.validate(context.data, schema);
    if (result.error !== null) {
        return Promise.reject(new errors.BadRequest(result.error.details[0].message));

    }
}
router.put('/:id', genreController.putGenre)
router.delete('/:id', genreController.deleteGenre)

module.exports = router