const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');
const secure = require('./secure');

router.get('/', secure('auth'), list);
router.get('/:id', secure('auth'), get);
router.delete('/:id', secure('auth'), drop);
router.post('/', secure('auth'), insert);
router.put('/', secure('auth'), update);

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
    }).catch(next);
}

function insert(req, res, next) {
  controller.insert(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    }).catch(next);
}

function update(req, res, next) {
  controller.update(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    }).catch(next);
}

function drop(req, res, next) {
  controller.drop(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    }).catch(next);
}

module.exports = router;