"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// * Variables de entorno
const config_1 = __importDefault(require("./config"));
// *Rutas
const mobo_routes_1 = __importDefault(require("./routes/mobo/mobo.routes"));
const cpu_routes_1 = __importDefault(require("./routes/cpu/cpu.routes"));
const ram_routes_1 = __importDefault(require("./routes/ram/ram.routes"));
const gpu_routes_1 = __importDefault(require("./routes/gpu/gpu.routes"));
const power_routes_1 = __importDefault(require("./routes/power/power.routes"));
const case_routes_1 = __importDefault(require("./routes/case/case.routes"));
const nvme_routes_1 = __importDefault(require("./routes/nvme/nvme.routes"));
const ssd_routes_1 = __importDefault(require("./routes/ssd/ssd.routes"));
const hdd_routes_1 = __importDefault(require("./routes/hdd/hdd.routes"));
const cooler_routes_1 = __importDefault(require("./routes/cooler/cooler.routes"));
const fan_routes_1 = __importDefault(require("./routes/fan/fan.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin/admin.routes"));
var clientURI = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://192.168.0.148:3000",
        "http://192.168.0.148:3001",
        "https://setupps.com",
        "https://www.setupps.com",
        "https://admin.setupps.com",
        "http://setupps-admin.s3-website-us-east-1.amazonaws.com",
    ],
};
const app = (0, express_1.default)();
app.set("port", config_1.default.PORT);
app.use((0, morgan_1.default)("dev"));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use((0, cors_1.default)(clientURI));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// !rutas
app.use(mobo_routes_1.default);
app.use(cpu_routes_1.default);
app.use(ram_routes_1.default);
app.use(gpu_routes_1.default);
app.use(power_routes_1.default);
app.use(case_routes_1.default);
app.use(nvme_routes_1.default);
app.use(ssd_routes_1.default);
app.use(hdd_routes_1.default);
app.use(cooler_routes_1.default);
app.use(fan_routes_1.default);
app.use(admin_routes_1.default);
exports.default = app;
