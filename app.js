import express from "express";
import cors from "cors";
import multer from "multer";
import sequelize from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ProvinsiRoutes from "./routes/provinsiRoutes.js";
import KabupatenRoutes from "./routes/kabupatenRoutes.js";
import KemacamatanRoutes from "./routes/kecamatanRoutes.js";
import DesaRoutes from "./routes/desaRoutes.js";
import jenisKelaminRoutes from "./routes/jenisKelaminRoutes.js";
import agamaRoutes from "./routes/agamaRoutes.js";
import golonganDarahRoutes from "./routes/golonganDarahRoutes.js";
import statusPernikahanRoutes from "./routes/statusPernikahanRoutes.js";
import departemenRoutes from "./routes/departemenRoutes.js";
import kantornRoutes from "./routes/kantorRoutes.js";
import pendidikanRoutes from "./routes/pendidikanRoutes.js";
import statuKaryawanRoutes from "./routes/statusKaryawanRoutes.js";
import bagianRoutes from "./routes/bagianRoutes.js";
import karyawanRoutes from "./routes/karyawanRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";
import cutiIzinRoutes from "./routes/cutiIzinRoutes.js";
import kinerjaRoutes from "./routes/kinerjaRoutes.js";
import jadwalRoutes from "./routes/jadwalRoutes.js";
import absensiRoutes from "./routes/absensiRoutes.js";
import dotenv from "dotenv";
dotenv.config();



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


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
        app.use("/api/v1", ProvinsiRoutes);
        app.use("/api/v1", KabupatenRoutes);
        app.use("/api/v1", KemacamatanRoutes);
        app.use("/api/v1", DesaRoutes);
        app.use("/api/v1", jenisKelaminRoutes);
        app.use("/api/v1", agamaRoutes);
        app.use("/api/v1", golonganDarahRoutes);
        app.use("/api/v1", statuKaryawanRoutes);
        app.use("/api/v1", statusPernikahanRoutes);
        app.use("/api/v1", departemenRoutes);
        app.use("/api/v1", kantornRoutes);
        app.use("/api/v1", pendidikanRoutes);
        app.use("/api/v1", bagianRoutes);
        app.use("/api/v1", karyawanRoutes);
        app.use("/api/v1", shiftRoutes);
        app.use("/api/v1", cutiIzinRoutes);
        app.use("/api/v1", kinerjaRoutes);
        app.use("/api/v1", jadwalRoutes);
        app.use("/api/v1", absensiRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

init();