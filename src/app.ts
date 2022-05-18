import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
// * Variables de entorno
import config from "./config";
// *Rutas
import moboRoutes from "./routes/mobo/mobo.routes";
import cpuRoutes from "./routes/cpu/cpu.routes";
import ramRoutes from "./routes/ram/ram.routes";
import gpuRoutes from "./routes/gpu/gpu.routes";
import powerRoutes from "./routes/power/power.routes";
import caseRoutes from "./routes/case/case.routes";
import nvmeRoutes from "./routes/nvme/nvme.routes";
import ssdRoutes from "./routes/ssd/ssd.routes";
import hddRoutes from "./routes/hdd/hdd.routes";
import coolerRoutes from "./routes/cooler/cooler.routes";

var clientURI = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://192.168.0.148:3000",
    "http://192.168.0.148:3001",
    "https://www.setupps.com",
    "https://admin.setupps.com",
    "https://setupps.com",
    "http://setupps-admin.s3-website-us-east-1.amazonaws.com/",
  ],
};
const app = express();

app.set("port", config.PORT);
app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "../public")));
app.use(cors(clientURI));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// !rutas
app.use(moboRoutes);
app.use(cpuRoutes);
app.use(ramRoutes);
app.use(gpuRoutes);
app.use(powerRoutes);
app.use(caseRoutes);
app.use(nvmeRoutes);
app.use(ssdRoutes);
app.use(hddRoutes);
app.use(coolerRoutes);

export default app;
