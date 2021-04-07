const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');
const secure = require('../../../utils/middlewares/secure');

router.get('/', secure('auth'), list);
router.get('/:id', secure('auth'), get);
router.post('/', secure('auth'), insert);
router.put('/', secure('auth'), update);
router.delete('/:id', secure('auth'), remove);

function list(req, res, next) {
  controller.list()
    .then((data) => {
      response.success(req, res, data, 200);
    }).catch(next);
}

function get(req, res, next) {
  controller.get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function insert(req, res, next) {
  controller.insert(req.body)
    .then((result) => {
      response.success(req, res, result, 200);
    }).catch(next);
}

function update(req, res, next) {
  controller.update(req.body)
    .then((result) => {
      response.success(req, res, result, 200);
    }).catch(next);
}

function remove(req, res, next) {
  controller.remove(req.params.id)
    .then((result) => {
      response.success(req, res, result, 200);
    }).catch(next);
}

module.exports = router;
