const express = require('express');
const app = express();
const cors = require('cors');
const net = require('net');
const client = new net.Socket();

app.use(cors());
app.use(express.json());

// API endpoint
app.get('/heyThere', (req, res) => {
    res.send('Hello, Daijah!');
});

// Handle gender creation
app.post('/createGender', (req, res) => {
    //console.log("You have reached the backend!");
    //console.log("data: " + JSON.stringify(req.body.gender))
    //console.log(req.body);
    // Send response back to the client
    //res.json({ message: "Gender received successfully", data: req.body });
    client.connect(12345, '127.0.0.1', () => {
        console.log('Connected to MakeHuman socket');
        client.write(JSON.stringify(req.body.gender));
    });
    
    // client.on('close', () => {
    //     console.log('Connection closed');
    // });
    
    client.on('error', (err) => {
        console.error('Error:', err);
    });
});



app.listen(3000, () => {
    console.log("The backend is running and is happy!");
});