const express = require('express');
const { createAvailability, getUserAvailability, deleteAvailability } = require('../Controllers/AvailabilityController.js');
const { isAuthenticated } = require('../Middleare/auth.js');

const router = express.Router();

router.post('/', createAvailability);
router.get('/:userId', getUserAvailability);
router.delete('/:id',deleteAvailability);

module.exports = router;
