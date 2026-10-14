import express from "express";
import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data files
const dataFile = path.join(__dirname, "data","home", "data.json");
const aboutDataFile = path.join(__dirname, "data", "about", "data.json");

// Image folder
const imageFolder = path.join(__dirname, "public", "images");

// Middleware
app.use(cors());
app.use(express.json());

// Serve images from backend/public/images
app.use("/images", express.static(imageFolder));

// Root route
app.get("/", (req, res) => {
    res.json({
        message: "Elaichi Ghar API is running",
        endpoints: [
            "/home",
            "/about"
        ]
    });
});

// Read homepage data
const readData = () => {
    if (!fs.existsSync(dataFile)) {
        throw new Error(`Data file not found: ${dataFile}`);
    }

    return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
};

// Reads all homepage data from backend/data/data.json
app.get("/home", (req, res) => {
    try {
        const homeData = readData();
        return res.json(homeData);
    } catch (error) {
        console.error("Failed to read homepage data:", error.message);

        return res.status(500).json({
            message: "Failed to load homepage data."
        });
    }
});

// About route
// Reads backend/data/about/data.json
app.get("/about", (req, res) => {
    try {
        if (!fs.existsSync(aboutDataFile)) {
            return res.status(404).json({
                message: `About data file not found: ${aboutDataFile}`
            });
        }

        const aboutData = JSON.parse(
            fs.readFileSync(aboutDataFile, "utf-8")
        );

        return res.json(aboutData);
    } catch (error) {
        console.error("Failed to read About data:", error.message);

        return res.status(500).json({
            message: "Failed to load About page data."
        });
    }
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: `Route ${req.method} ${req.path} not found.`
    });
});

// Export Express app for Vercel
export default app;

// Start server locally
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(
            `Elaichi Ghar API running at http://localhost:${PORT}`
        );
    });
}