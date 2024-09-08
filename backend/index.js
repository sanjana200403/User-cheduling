const express = require('express');
const cors = require('cors');
const {DBconnection} = require('./DbConnection/DbConnection.js')
const UserSchema = require('./models/UserSchema.js')
const Availability = require('./models/Availabilty.js')

const Session = require('./models/Session.js')
const availabilityRoutes = require('./Routes/AvailabilityRoutes.js');
const sessionRoutes = require('./Routes/SessionRoutes.js');
require('dotenv').config();
const Attendee = require('./models/AttendeeSchema.js')

const PORT = 4000

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
// ---- db connection ---
DBconnection()
app.use('/api/availability', availabilityRoutes);
app.use('/api/sessions', sessionRoutes);
app.use(require('./Routes/UserRoutes.js'))


// --- application running-----

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });