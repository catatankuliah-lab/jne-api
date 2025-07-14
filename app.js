import express from "express";
import cors from "cors";
import multer from "multer";
import sequelize from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import woRoutes from "./routes/woRoutes.js";
import loRoutes from "./routes/loRoutes.js";
import detailWORoutes from "./routes/detailWORoutes.js";
import detailLORoutes from "./routes/detailLORoutes.js";
import ProvinsiRoutes from "./routes/provinsiRoutes.js";
import KabupatenRoutes from "./routes/kabupatenRoutes.js";
import KemacamatanRoutes from "./routes/kecamatanRoutes.js";
import DesaRoutes from "./routes/desaRoutes.js";
import AlokasiRoutes from "./routes/alokasiRoutes.js";



const app = express();
const PORT = process.env.PORT || 3090;
const upload = multer();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const init = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database.");
        await sequelize.sync();
        console.log("Database & tables created!");

        app.use("/api/v1", authRoutes);
        app.use("/api/v1", roleRoutes);
        app.use("/api/v1", userRoutes);

        app.use("/api/v1", woRoutes);
        app.use("/api/v1", detailWORoutes);
        app.use("/api/v1", loRoutes);
        app.use("/api/v1", detailLORoutes);

        app.use("/api/v1", ProvinsiRoutes);
        app.use("/api/v1", KabupatenRoutes);
        app.use("/api/v1", KemacamatanRoutes);
        app.use("/api/v1", DesaRoutes);
        app.use("/api/v1", AlokasiRoutes);



        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

init();