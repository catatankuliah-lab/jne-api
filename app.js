import express from "express";
import cors from "cors";
import sequelize from "./config/config.js";

const app = express();
const PORT = process.env.PORT || 3090;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

const init = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database.");
        await sequelize.sync();
        console.log("Database & tables created!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

init();
