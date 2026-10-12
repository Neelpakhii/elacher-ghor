import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, "data", "data.json");
const imageFolder = path.join(__dirname, "Image");

app.use(cors());
app.use(express.json());
app.use("/images", express.static(imageFolder));

const readData = () => {
    const fileContents = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(fileContents);
};

app.get("/navbar", (req, res) => {
    try {
        res.json(readData());
    } catch (error) {
        console.error("Failed to read store data:", error);
        res.status(500).json({ message: "Failed to read store data." });
    }
});

app.get("/heroes", (req, res) => {
    try {
        const data = readData();
        res.json(Array.isArray(data.hero) ? data.hero : []);
    } catch (error) {
        console.error("Failed to read hero data:", error);
        res.status(500).json({ message: "Failed to read hero data." });
    }
});

app.get("/products", (req, res) => {
    try {
        const data = readData();
        res.json(Array.isArray(data.products) ? data.products : []);
    } catch (error) {
        console.error("Failed to read product data:", error);
        res.status(500).json({ message: "Failed to read product data." });
    }
});

app.get("/chef-section", (req, res) => {
    try {
        const data = readData();

        if (!data.chefSection) {
            return res.status(404).json({ message: "Chef section not found." });
        }

        res.json(data.chefSection);
    } catch (error) {
        console.error("Failed to read chef section:", error);
        res.status(500).json({ message: "Failed to read chef section." });
    }
});

app.get("/grade-selector", (req, res) => {
    try {
        const data = readData();
        res.json(data.gradeSelector || {});
    } catch (error) {
        console.error("Failed to read grade selector data:", error);
        res.status(500).json({ message: "Failed to read grade selector data." });
    }
});

app.get("/world-best-cardamom", (req, res) => {
    try {
        const data = readData();

        if (!data.worldBestCardamom) {
            return res.status(404).json({
                message: "World's Best Cardamom section not found.",
            });
        }

        res.json(data.worldBestCardamom);
    } catch (error) {
        console.error("Failed to read World's Best Cardamom data:", error);
        res.status(500).json({
            message: "Failed to read World's Best Cardamom data.",
        });
    }
});

app.get("/why-best", (req, res) => {
    try {
        const data = readData();

        if (!data.whyBest) {
            return res.status(404).json({ message: "Why Best section not found." });
        }

        res.json(data.whyBest);
    } catch (error) {
        console.error("Failed to read Why Best data:", error);
        res.status(500).json({ message: "Failed to read Why Best data." });
    }
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

export default app;