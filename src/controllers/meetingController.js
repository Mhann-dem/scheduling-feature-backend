const { getAllMeetings, createMeeting, deleteMeeting, updateMeeting, getMeetingById } = require('../models/meetingModel');

// Get all meetings
const fetchMeetings = (req, res) => {
  getAllMeetings((err, results) => {
    if (err) {
      console.error('Database error in fetchMeetings:', err.message); // Debugging log
      res.status(500).json({ error: 'Failed to fetch meetings' });
    } else {
      res.json(results);
    }
  });
};


// Schedule a meeting
const scheduleMeeting = (req, res) => {
  console.log('Received request body for new meeting:', req.body); // Debugging log

  createMeeting(req.body, (err, result) => {
    if (err) {
      console.error('Database error in scheduleMeeting:', err.message); // Debugging log
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Meeting scheduled successfully', id: result.insertId });
  });
};


// Update a meeting
const updateMeetingController = (req, res) => {
  const { id } = req.params;
  console.log('Received request to update meeting with id:', id);
  console.log('Request body:', req.body);

  updateMeeting(id, req.body, (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Meeting not found' });
      } else {
        // Fetch the updated meeting and return it
        getMeetingById(id, (err, meeting) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.json(meeting[0]);
          }
        });
      }
    }
  });
};

// Cancel a meeting
const cancelMeeting = (req, res) => {
  const { id } = req.params;
  deleteMeeting(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Meeting canceled successfully' });
    }
  });
};

module.exports = { fetchMeetings, scheduleMeeting, updateMeeting: updateMeetingController, cancelMeeting };