const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../Middleare/auth.js'); // Middleware to check for authentication
const Session = require('../models/Session');
const { createSession, getUserSessions, getAvailableUsers } = require('../Controllers/SessionController.js');

router.post('/',createSession )
router.get('/:userId',getUserSessions)
router.get('/availableUser', getAvailableUsers)

module.exports = router
