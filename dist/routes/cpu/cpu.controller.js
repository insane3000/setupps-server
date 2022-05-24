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
const cpuSchema_1 = __importDefault(require("./cpuSchema"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// !POST
const createComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newComponent = new cpuSchema_1.default(req.body);
    const savedComponent = yield newComponent.save();
    console.log("Saved Component");
    res.json(savedComponent);
});
exports.createComponent = createComponent;
//! PUT
const updateComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const componentUpdated = yield cpuSchema_1.default.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
    });
    if (!componentUpdated)
        return res.status(204).json();
    console.log("Updated component!");
    return res.json(componentUpdated);
});
exports.updateComponent = updateComponent;
// !DELETE
const deleteComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const componentFound = yield cpuSchema_1.default.findByIdAndDelete(req.params.id);
    const pathDelete = path_1.default.join(__dirname, `../../../public/${req.query.component}`);
    if (!componentFound)
        return res.status(204).json();
    // !Delete previous image
    try {
        componentFound.imageM.map((i) => {
            fs_1.default.unlinkSync(`${pathDelete}/${i}`);
            console.log("File M deleted!");
        });
    }
    catch (err) {
        console.error(err);
    }
    try {
        componentFound.imageS.map((i) => {
            fs_1.default.unlinkSync(`${pathDelete}/${i}`);
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const page = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.page, 10) || 1;
    const limit = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit, 10) || 17;
    const search = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.search) || "";
    const manufacturer = ((_d = req.query) === null || _d === void 0 ? void 0 : _d.manufacturer) || "";
    const available = ((_e = req.query) === null || _e === void 0 ? void 0 : _e.available) || "";
    const gte_cores = ((_f = req.query) === null || _f === void 0 ? void 0 : _f.gte_cores) || 0;
    const lte_cores = ((_g = req.query) === null || _g === void 0 ? void 0 : _g.lte_cores) || 666;
    const gte = ((_h = req.query) === null || _h === void 0 ? void 0 : _h.gte) || 0;
    const lte = ((_j = req.query) === null || _j === void 0 ? void 0 : _j.lte) || 9999999;
    const sort = ((_k = req.query) === null || _k === void 0 ? void 0 : _k.sort) || "";
    //!Component
    const socket = ((_l = req.query) === null || _l === void 0 ? void 0 : _l.socket) || "";
    const integrated_graphics = ((_m = req.query) === null || _m === void 0 ? void 0 : _m.integrated_graphics) || "";
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
        const components = yield cpuSchema_1.default.paginate({
            $or: [
                { model: { $regex: diacriticSensitiveRegex(search), $options: "i" } },
                { keywords: { $regex: diacriticSensitiveRegex(search), $options: "i" } },
                { manufacturer: { $regex: diacriticSensitiveRegex(search), $options: "i" } },
            ],
            price: { $gte: gte, $lte: lte },
            total_cores: { $gte: gte_cores, $lte: lte_cores },
            $and: [
                { manufacturer: { $regex: manufacturer, $options: "i" } },
                { socket: { $regex: socket, $options: "i" } },
                { integrated_graphics: { $regex: integrated_graphics, $options: "i" } },
                //!Required
                { available: { $regex: available, $options: "i" } },
            ],
        }, {
            page,
            limit,
            sort: sort === "" ? { createdAt: "desc" } : { price: sort },
        });
        return res.json(components);
        //     }
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
exports.getComponents = getComponents;
// !GET :id
const getComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const component = yield cpuSchema_1.default.findById(id);
        return res.json(component);
    }
    catch (error) {
        return res.status(204).json();
    }
});
exports.getComponent = getComponent;
