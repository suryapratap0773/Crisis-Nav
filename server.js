const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/alerts', (req, res) => {
    // Example data
    const alerts = [
        { area: 'Delhi', type: 'Earthquake' },
        { area: 'Chandigarh', type: 'Flood' }
    ];
    res.json({ alerts });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
