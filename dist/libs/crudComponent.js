"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponent = exports.getComponents = exports.deleteComponent = exports.updateComponent = exports.createComponent = void 0;
const moboSchema_1 = __importDefault(require("../routes/mobo/moboSchema"));
const cpuSchema_1 = __importDefault(require("../routes/cpu/cpuSchema"));
const ramSchema_1 = __importDefault(require("../routes/ram/ramSchema"));
const gpuSchema_1 = __importDefault(require("../routes/gpu/gpuSchema"));
const powerSchema_1 = __importDefault(require("../routes/power/powerSchema"));
const caseSchema_1 = __importDefault(require("../routes/case/caseSchema"));
const nvmeSchema_1 = __importDefault(require("../routes/nvme/nvmeSchema"));
const ssdSchema_1 = __importDefault(require("../routes/ssd/ssdSchema"));
const hddSchema_1 = __importDefault(require("../routes/hdd/hddSchema"));
const coolerSchema_1 = __importDefault(require("../routes/cooler/coolerSchema"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
var queryComponent = (req) => {
    //   console.log(req._parsedUrl);
    switch (req._parsedUrl.pathname.split("/")[1]) {
        case "cpu":
            return cpuSchema_1.default;
        case "mobo":
            return moboSchema_1.default;
        case "ram":
            return ramSchema_1.default;
        case "gpu":
            return gpuSchema_1.default;
        case "power":
            return powerSchema_1.default;
        case "case":
            return caseSchema_1.default;
        case "nvme":
            return nvmeSchema_1.default;
        case "ssd":
            return ssdSchema_1.default;
        case "hdd":
            return hddSchema_1.default;
        case "cooler":
            return coolerSchema_1.default;
        default:
            return cpuSchema_1.default;
    }
};
// !POST
const createComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let schema = queryComponent(req);
    let newComponent = new schema(req.body);
    const savedComponent = yield newComponent.save();
    console.log("Saved Component");
    res.json(savedComponent);
});
exports.createComponent = createComponent;
//! PUT
const updateComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let schema = queryComponent(req);
    const componentUpdated = yield schema.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
    });
    if (!componentUpdated)
        return res.status(204).json();
    console.log("Updated component!");
    return res.json(componentUpdated);
});
exports.updateComponent = updateComponent;
//! DELETE
const deleteComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let schema = queryComponent(req);
    const componentFound = yield schema.findByIdAndDelete(req.params.id);
    const pathDelete = path_1.default.join(__dirname, `../../public/${req.query.component}/`);
    if (!componentFound)
        return res.status(204).json();
    // !Delete previous image
    try {
        componentFound.imageM.map((i) => {
            fs_1.default.unlinkSync(`${pathDelete}${i}`);
            console.log("File M deleted!");
        });
    }
    catch (err) {
        console.error(err);
    }
    try {
        componentFound.imageS.map((i) => {
            fs_1.default.unlinkSync(`${pathDelete}${i}`);
            console.log("File S deleted!");
        });
    }
    catch (err) {
        console.error(err);
    }
    return res.status(204).json();
});
exports.deleteComponent = deleteComponent;
// !GET
const getComponents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let schema = queryComponent(req);
    const page = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.page, 10) || 1;
    const limit = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit, 10) || 10;
    const search = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.search) || "";
    console.log(req.query);
    // !Delete accents
    function diacriticSensitiveRegex(string = "") {
        return string
            .replace(/a/g, "[a,á,à,ä]")
            .replace(/e/g, "[e,é,ë]")
            .replace(/i/g, "[i,í,ï]")
            .replace(/o/g, "[o,ó,ö,ò]")
            .replace(/u/g, "[u,ü,ú,ù]");
    }
    try {
        //! Si parametro NO EXISTE
        if (search === "") {
            const components = yield schema.paginate({
            //   $or: [{ socket: { $regex: `${req.query.socket}*`, $options: "i" } }],
            }, {
                page,
                limit,
                sort: { createdAt: "desc" },
            });
            return res.json(components);
        }
        //! Si parametro  EXISTE
        if (search !== "") {
            const components = yield schema.paginate({
                $or: [
                    { model: { $regex: diacriticSensitiveRegex(`${search}*`), $options: "i" } },
                    { manufacturer: { $regex: diacriticSensitiveRegex(`${search}*`), $options: "i" } },
                ],
            }, {
                page,
                limit,
                sort: { createdAt: "desc" },
            });
            return res.json(components);
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.getComponents = getComponents;
// //! GET :id
const getComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let schema = queryComponent(req);
    const id = req.params.id;
    try {
        const component = yield schema.findById(id);
        return res.json(component);
    }
    catch (error) {
        return res.status(204).json();
    }
});
exports.getComponent = getComponent;
