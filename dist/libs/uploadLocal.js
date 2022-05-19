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
exports.uploadLocal = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const uploadLocal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //   console.log(req.body);
    function removeNonAplhaNumeric(str) {
        return str.replace(/[\W_]/g, "").toLowerCase();
    }
    // !Name
    let model = removeNonAplhaNumeric(`${req.body.model}`);
    let random = (0, crypto_1.randomBytes)(6).toString("hex");
    const pathSave = path_1.default.join(__dirname, `../../public/${req.body.type}/`);
    if (req.files) {
        var s = [];
        var m = [];
        for (let index = 0; index < req.files.length; index++) {
            yield (0, sharp_1.default)((_a = req.files) === null || _a === void 0 ? void 0 : _a[index].buffer)
                .resize(250)
                .webp()
                .toFile(`${pathSave}${model}-${250}px-${index + 1}-${random}.webp`)
                .then(() => {
                s.push(`${model}-${250}px-${index + 1}-${random}.webp`);
                console.log("Img S complete!!");
            });
        }
        for (let index = 0; index < req.files.length; index++) {
            yield (0, sharp_1.default)((_b = req.files) === null || _b === void 0 ? void 0 : _b[index].buffer)
                .resize(1000)
                .webp()
                .toFile(`${pathSave}${model}-${1000}px-${index + 1}-${random}.webp`)
                .then(() => {
                m.push(`${model}-${1000}px-${index + 1}-${random}.webp`);
                console.log("Img M complete!!");
            });
        }
        req.body.imageS = s;
        req.body.imageM = m;
        console.log("Sending to controller!");
        req.body.specifications = JSON.parse(req.body.specifications);
        next();
    }
    else {
        req.body.imageM = "";
        req.body.imageS = "";
        next();
    }
});
exports.uploadLocal = uploadLocal;
