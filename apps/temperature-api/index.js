const express = require('express');

const app = express();
const PORT = 8081;

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok'
    });
});

app.get('/temperature', (req, res) => {
    const locationParam = req.query.location;
    const sensorIDParam = req.query.sensorID;

    const temperature = Math.round(
        (Math.random() * (30 - 10) + 10) * 10
    ) / 10;

    let locationRes = "";

    if (!locationParam || locationParam === "") {
        switch (sensorIDParam) {
            case "1":
                locationRes = "Living Room"
                break;
            case "2":
                locationRes = "Bedroom";
                break;
            case "3":
                locationRes = "Kitchen";
                break;
            default:
                locationRes = "Unknown";
                break;
        }
    }

    let sensorIdRes = "";

    if (!sensorIDParam || sensorIDParam === "") {
        switch (sensorIDParam) {
            case "1":
                sensorIdRes = "Living Room"
                break;
            case "2":
                sensorIdRes = "Bedroom";
                break;
            case "3":
                sensorIdRes = "Kitchen";
                break;
            default:
                sensorIdRes = "Unknown";
                break;
        }
    }


    res.json({
        value: temperature,
        unit: "°C",
        timestamp: new Date().getDate(),
        location: locationRes,
        status: "active",
        sensorID: sensorIdRes,
        sensorType: "temperature",
        description: `Temperature sensor: ${locationRes}`,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});