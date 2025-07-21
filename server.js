const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
const requestDemoRoutes = require('./routes/requestDemoRoutes')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contact', contactRoutes);
app.use('/api/send-demo-request', requestDemoRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
