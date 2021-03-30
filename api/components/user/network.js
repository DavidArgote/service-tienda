const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');

router.get('/', (req, res) => {
  controller.list()
    .then((users) => {
      response.success(req, res, users, 200);
    }).catch((error) => {
      response.error(req, res, error.message, 500);
    });
});

router.get('/:id', (req, res) => {
  controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    }).catch((error) => {
      response.error(req, res, error.message, 500);
    });
});

router.post('/', (req, res) => {
  controller.upsert(req.body.user)
    .then((user) => {
      response.success(req, res, user, 200);
    }).catch((error) => {
      response.error(req, res, error.message, 500);
    });
});

router.delete('/:id', (req, res) => {
  controller.delete(req.params.id)
    .then((confirm) => {
      response.success(req, res, confirm, 200);
    }).catch((error) => {
      response.error(req, res, error.message, 500);
    });
})


module.exports = router;