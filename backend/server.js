const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const loginRoutes = require('./routes/loginRoutes');
const signupRoutes = require('./routes/signupRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('API is running'));
app.use('/api', loginRoutes);
app.use('/api', signupRoutes); // Signup routes
app.use('/api',employeeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
