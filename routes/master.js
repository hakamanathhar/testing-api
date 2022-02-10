var express = require('express');
var router = express.Router();

const countriesController = require('../controllers/masters/CountriesController')
const countries = 'countries'
router.get(`/${countries}/`, countriesController.index);


const statesController = require('../controllers/masters/StateController')
const states = 'states'
router.get(`/${states}/:countries`, statesController.getByCountries);
router.get(`/${states}-id/:countries`, statesController.getByCountriesId);

const citiesController = require('../controllers/masters/CitiesController')
const cities = 'cities'
router.get(`/${cities}/:state`, citiesController.getByState);
router.get(`/${cities}-id/:state`, citiesController.getByStateId);

module.exports = router;