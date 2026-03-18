import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const stateFile = path.join(__dirname, "state.json");

// Enable CORS so the React app can talk to us
app.use(cors());
app.use(express.json());

/* ESP32 will call this */
app.get("/status", (req, res) => {
    fs.readFile(stateFile, "utf8", (err, data) => {
        if (err) {
            console.error("[ERROR] Failed to read state.json");
            return res.status(500).json({ error: "Cannot read state file" });
        }
        try {
            const json = JSON.parse(data);
            const timestamp = new Date().toLocaleTimeString();
            console.log(`[${timestamp}] [HARDWARE POLL] from ${req.ip} -> Current State: ${json.state.toUpperCase()}`);
            res.json(json);
        } catch (e) {
            res.status(500).json({ error: "Invalid JSON in state file" });
        }
    });
});

/* Update bulb state from UI */
app.post("/state", (req, res) => {
    const newState = req.body.state;
    const timestamp = new Date().toLocaleTimeString();

    if (newState !== "on" && newState !== "off") {
        return res.status(400).json({ error: "state must be 'on' or 'off'" });
    }

    const updated = { state: newState };

    fs.writeFile(stateFile, JSON.stringify(updated, null, 2), (err) => {
        if (err) {
            console.error("[ERROR] Failed to write state.json");
            return res.status(500).json({ error: "Failed to update state" });
        }
        console.log(`\n[${timestamp}] [!!! UI COMMAND !!!] Result: State saved as ${newState.toUpperCase()}`);
        res.json({ success: true, state: newState });
    });
});

// Listen on 0.0.0.0 for network visibility
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n================================`);
    console.log(` Hardware Bridge (File Persistent)`);
    console.log(`================================`);
    console.log(`Running on port ${PORT}`);
    console.log(`Network Access: http://172.20.10.2:${PORT}`);
    console.log(`File: ${stateFile}`);
});
