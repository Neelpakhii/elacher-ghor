import express from "express";
import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Backend paths
const dataFile = path.join(__dirname, "data", "data.json");
const imageFolder = path.join(__dirname, "public", "images");

// Middleware
app.use(cors());
app.use(express.json());

// Serve images locally from public/images
app.use("/images", express.static(imageFolder));

// Read JSON data
const readData = () => {
    if (!fs.existsSync(dataFile)) {
        throw new Error(`Data file not found: ${dataFile}`);
    }

    const fileContents = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(fileContents);
};

// Reusable GET route handler
const handleGet = (handler, errorMessage) => {
    return (req, res) => {
        try {
            const data = readData();
            const result = handler(data);

            if (result === undefined || result === null) {
                return res.status(404).json({
                    message: `${errorMessage} not found.`,
                });
            }

            return res.json(result);
        } catch (error) {
            console.error(`${errorMessage}:`, error.message);

            return res.status(500).json({
                message: `Failed to read ${errorMessage}.`,
            });
        }
    };
};

// Root route
app.get("/", (req, res) => {
    res.json({
        message: "Elaichi Ghar API is running",
        endpoints: [
            "/navbar",
            "/heroes",
            "/products",
            "/chef-section",
            "/grade-selector",
            "/world-best-cardamom",
            "/why-best",
        ],
    });
});

// Navbar
app.get(
    "/navbar",
    handleGet((data) => data, "store data")
);

// Hero images
app.get(
    "/heroes",
    handleGet(
        (data) => Array.isArray(data.hero) ? data.hero : [],
        "hero data"
    )
);

// Products
app.get(
    "/products",
    handleGet(
        (data) => Array.isArray(data.products) ? data.products : [],
        "product data"
    )
);

// Chef section
app.get(
    "/chef-section",
    handleGet(
        (data) => data.chefSection,
        "chef section"
    )
);

// Grade selector
app.get(
    "/grade-selector",
    handleGet(
        (data) => data.gradeSelector ?? {},
        "grade selector data"
    )
);

// World's Best Cardamom
app.get(
    "/world-best-cardamom",
    handleGet(
        (data) => data.worldBestCardamom,
        "World's Best Cardamom section"
    )
);

// Why Best
app.get(
    "/why-best",
    handleGet(
        (data) => data.whyBest,
        "Why Best section"
    )
);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: `Route ${req.method} ${req.path} not found.`,
    });
});

// Export Express app for Vercel
export default app;

// Start server only in local development
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(
            `Elaichi Ghar API running at http://localhost:${PORT}`
        );
    });
}