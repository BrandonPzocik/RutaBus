import express from "express";
import cors from "cors";
import connectDB from "./db/database.js";
import comunicacionesRoutes from "./routes/comunicaciones.routes.js";
import lineasRoutes from "./routes/lineas.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";

import router from "./routes/auth.routes.js";
import routerForum from "./routes/forum.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://ruta-bus-dev.vercel.app"
];

// Conectar DB
connectDB();

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS no permitido"));
      }
    },
    credentials: true
  })
);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas
app.use(router);
app.use("/api", comunicacionesRoutes);
app.use("/api", lineasRoutes);
app.use("/api", favoritosRoutes);
app.use("/forums", routerForum);

// Start
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
