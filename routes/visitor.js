var express = require('express');
const multer = require('../middlewares/multer');
var router = express.Router();

const visitorController = require('../controllers/visitor/VisitorController')
router.get(`/byPage/:perPage/:page`, visitorController.index);
router.get(`/detail/:id`, visitorController.detail);
router.post(`/store`, multer.uploadSingle, visitorController.store);
router.post(`/update`, multer.uploadSingle, visitorController.edit);
router.post(`/search`, multer.uploadSingle, visitorController.search);

module.exports = router;