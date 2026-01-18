const express = require('express');

const app = express();
const PORT = 8081;

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok'
    });
});

app.get('/', (req, res) => {
    const { location } = req.query;

    const SENSORS = {
        "1": "Living Room",
        "2": "Bedroom",
        "3": "Kitchen",
    };

    const resolvedLocation =
        (typeof location === "string" && location.trim() !== "")
            ? SENSORS[location] || "Unknown"
            : "Unknown";

    const temperature =
        Math.round((Math.random() * (30 - 10) + 10) * 10) / 10;

    const resDTO = {
        value: temperature,
        unit: "°C",
        timestamp: new Date().toISOString(),
        location: resolvedLocation,
        status: "active",
        sensor_id: null,
        sensor_type: "temperature",
        description: `Temperature sensor: ${resolvedLocation}`,
    };

    res.json(resDTO);
});

app.get("/temperature/:sensorID", (req, res) => {
    const { sensorID } = req.params;

    const SENSORS = {
        "1": "Living Room",
        "2": "Bedroom",
        "3": "Kitchen",
    };

    const resolverSensor =
        (typeof sensorID === "string" && sensorID.trim() !== "")
            ? SENSORS[sensorID] || "Unknown"
            :  "Unknown";

    const temperature =
        Math.round((Math.random() * (30 - 10) + 10) * 10) / 10;

    const resDTO = {
        value: temperature,
        unit: "°C",
        timestamp: new Date().toISOString(),
        location: resolverSensor,
        status: "active",
        sensor_id: sensorID || null,
        sensor_type: "temperature",
        description: `Temperature sensor: ${resolverSensor}`,
    };

    res.json(resDTO);
})

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} ${req.query}`);
    next();
});

app.listen(PORT, "0.0.0.0",() => {
    console.log(`Server listening on port ${PORT}`);
});