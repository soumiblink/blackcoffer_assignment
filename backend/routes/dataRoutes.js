const express = require('express');
const router = express.Router();
const {
  getAllData,
  getFilterOptions,
  getDashboardData,
  filterData
} = require('../controllers/dataController');

router.get('/data', getAllData);
router.get('/data/filters', getFilterOptions);
router.get('/data/dashboard', getDashboardData);
router.post('/data/filter', filterData);

module.exports = router;

