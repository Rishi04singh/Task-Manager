require('dotenv').config();   // ✅ MUST be first

const express = require('express');
const app = express();
require('./Models/db');

const PORT = process.env.PORT || 8080;
const TaskRouter = require('./Routes/TaskRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.use('/tasks', TaskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT=${PORT}`);
});