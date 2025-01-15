// src/routes/meetingRoutes.js
const express = require('express');
const router = express.Router();
const { fetchMeetings, scheduleMeeting, cancelMeeting , updateMeeting} = require('../controllers/meetingController');

// Define routes
router.get('/', fetchMeetings);
router.post('/', scheduleMeeting);
router.delete('/:id', cancelMeeting);
router.put('/:id', updateMeeting); 

module.exports = router;
