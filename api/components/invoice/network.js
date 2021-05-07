const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');
const secure = require('../../../utils/middlewares/secure');

router.get('/', secure('auth'), (req, res, next) => {
    controller.list()
        .then((data) => {
            response.success(req, res, data, 200);
        }).catch(next);
});

router.get('/:id', secure('auth'), (req, res, next) => {
    controller.get(req.params.id)
    .then((data) => {
        response.success(req, res, data, 200);
    }).catch(next);
});

router.post('/', secure('auth'), (req, res, next) => {
    controller.create(req.body)
    .then((data) => {
        response.success(req, res, data, 200);
    }).catch(next);
});

router.delete('/:id', secure('auth'), (req, res, next) => {
    controller.remove(req.params.id)
    .then((data) => {
        response.success(req, res, data, 200);
    }).catch(next);
});

router.get('/reports/totals', secure('auth'), (req, res, next) => {
    console.log(req.query.sdate, req.query.fdate);
    controller.reportTotals(req.query.sdate, req.query.fdate)
        .then((data) => {
            response.success(req, res, data, 200);
        }).catch(next);
});

module.exports = router;