const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const WaterLevel = require('./water-level-app/models'); // Import the WaterLevel model
const cors = require('cors'); // Import the cors package
const app = express();
const port = 5000;

// Connection URI
connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.get('/api/water_level', async (req, res) => {
    try {
        const water_levels = await WaterLevel.find().sort({ timestamp: -1 });
        res.json(water_levels);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.post('/api/water_level', async (req, res) => {
    const { water_level, timestamp } = req.body;

    try {
        const water_l = new WaterLevel({
            water_level,
            timestamp
        });

        const saved_data = await water_l.save();
        res.json(saved_data);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
// DELETE all water levels
app.delete('/api/water_level', async (req, res) => {
    try {
        await WaterLevel.deleteMany({});
        res.json({ msg: 'All data deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
