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
const ramSchema_1 = __importDefault(require("./ramSchema"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// !POST
const createComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newComponent = new ramSchema_1.default(req.body);
    const savedComponent = yield newComponent.save();
    console.log("Saved Component");
    res.json(savedComponent);
});
exports.createComponent = createComponent;
//! PUT
const updateComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const componentUpdated = yield ramSchema_1.default.findByIdAndUpdate(req.body._id, req.body, {
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
    const componentFound = yield ramSchema_1.default.findByIdAndDelete(req.params.id);
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const page = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.page, 10) || 1;
    const limit = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit, 10) || 17;
    const search = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.search) || "";
    const ram_type = ((_d = req.query) === null || _d === void 0 ? void 0 : _d.ram_type) || "";
    const manufacturer = ((_e = req.query) === null || _e === void 0 ? void 0 : _e.manufacturer) || "";
    const platform = ((_f = req.query) === null || _f === void 0 ? void 0 : _f.platform) || "";
    const chipset = ((_g = req.query) === null || _g === void 0 ? void 0 : _g.chipset) || "";
    const available = ((_h = req.query) === null || _h === void 0 ? void 0 : _h.available) || "";
    const lan_speed_max = ((_j = req.query) === null || _j === void 0 ? void 0 : _j.lan_speed_max) || "";
    const gte = ((_k = req.query) === null || _k === void 0 ? void 0 : _k.gte) || 0;
    const lte = ((_l = req.query) === null || _l === void 0 ? void 0 : _l.lte) || 9999999;
    const sort = ((_m = req.query) === null || _m === void 0 ? void 0 : _m.sort) || "";
    const memory_size = ((_o = req.query) === null || _o === void 0 ? void 0 : _o.memory_size) || "";
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
        const components = yield ramSchema_1.default.paginate({
            $or: [
                { model: { $regex: diacriticSensitiveRegex(search), $options: "i" } },
                //   { keywords: { $regex: diacriticSensitiveRegex(search), $options: "i" } },
                { manufacturer: { $regex: diacriticSensitiveRegex(search), $options: "i" } },
            ],
            price: { $gte: gte, $lte: lte },
            $and: [
                { manufacturer: { $regex: manufacturer, $options: "i" } },
                { ram_type: { $regex: ram_type, $options: "i" } },
                //   { memory_size: memory_size },
                { memory_size: memory_size === "" ? { $gte: 0, $lte: 1024 } : memory_size },
                //   { chipset: { $regex: chipset, $options: "i" } },
                { available: { $regex: available, $options: "i" } },
                //   { lan_speed_max: { $regex: lan_speed_max, $options: "i" } },
            ],
        }, {
            page,
            limit,
            sort: sort === "" ? { createdAt: "desc" } : { price: sort },
            // sort: { createdAt: "desc" },
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
// //! GET :id
const getComponent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const component = yield ramSchema_1.default.findById(id);
        return res.json(component);
    }
    catch (error) {
        return res.status(204).json();
    }
});
exports.getComponent = getComponent;
