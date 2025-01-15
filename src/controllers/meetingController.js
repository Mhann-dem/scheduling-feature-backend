const { getAllMeetings, createMeeting, deleteMeeting, updateMeeting } = require('../models/meetingModel');

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
const updateMeeting = (req, res) => {
  const id = parseInt(req.params.id, 10); // Convert to an integer
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid meeting ID' });
  }

  const updatedData = req.body;
  console.log('Received request to update meeting with ID:', id);
  console.log('Request body:', updatedData);

  updateMeetingModel(id, updatedData, (err, result) => {
    if (err) {
      console.error('Database error in updateMeeting:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    res.json({ message: 'Meeting updated successfully' });
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

module.exports = { fetchMeetings, scheduleMeeting, updateMeeting, cancelMeeting };