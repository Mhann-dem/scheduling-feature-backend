const db = require('../config/dbConfig');

// Fetch all meetings
const getAllMeetings = (callback) => {
  const query = 'SELECT * FROM meetings';
  console.log('Executing query:', query); // Debugging log
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err.message); // Debugging log
      return callback(err);
    }
    console.log('Query results:', results); // Debugging log
    callback(null, results);
  });
};


// Get a single meeting by ID
const getMeetingById = (id, callback) => {
  db.query('SELECT * FROM meetings WHERE id = ?', [id], callback);
};

// Create a new meeting
const createMeeting = (data, callback) => {
  const { title, date, time, duration, participants } = data;

  const query = `
    INSERT INTO meetings (title, date, time, duration, participants)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [title, date, time, duration, JSON.stringify(participants)];

  console.log('Executing query:', query);
  console.log('With values:', values); // Debugging log

  db.query(query, values, callback);
};



// Update a meeting
const updateMeeting = (id, data, callback) => {
  const { title, date, time, duration, participants } = data;

  const query = `
    UPDATE meetings
    SET title = ?, date = ?, time = ?, duration = ?, participants = ?
    WHERE id = ?
  `;
  const values = [title, date, time, duration, JSON.stringify(participants), id];

  console.log('Executing query:', query); // Debugging log
  console.log('With values:', values); // Debugging log

  db.query(query, values, callback);
};

module.exports = {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting
};