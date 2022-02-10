var express = require('express');
const multer = require('../middlewares/multer');
var router = express.Router();

const  queueController = require('../controllers/visitor/QueueController')
router.get(`/add/:id`, queueController.store);
router.get(`/detail/:idBarcode`, queueController.detail);
router.get(`/last`, queueController.lastData);
router.get(`/index/:perPage/:page`, queueController.index);

module.exports = router;