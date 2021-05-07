const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');
const secure = require('../../../utils/middlewares/secure');

router.get('/:id', secure('auth'), (req, res, next) => {
    controller.get(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200);
        }).catch(next);
});

router.get('/', secure('auth'), (req, res, next) => {
    controller.list()
    .then((data) => {
        response.success(req, res, data, 200);
    }).catch(next);
});

router.post('/', secure('auth'), (req, res, next) => {
    controller.insert(req.body)
    .then((data) => {
        response.success(req, res, data, 201);
    }).catch(next);
});

router.put('/', secure('auth'), (req, res, next) => {
    controller.update(req.body)
    .then((data) => {
        response.success(req, res, data, 201);
    }).catch(next);
});


module.exports = router;