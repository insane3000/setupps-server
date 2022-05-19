"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ramCtrl = __importStar(require("./ram.controller"));
// import * as componentCtrl from "../../libs/crudComponent";
const validateToken_1 = require("../../libs/validateToken");
// import { expireValidation } from "../../libs/validateExpireCode";
const uploadLocal_1 = require("../../libs/uploadLocal");
const updateLocal_1 = require("../../libs/updateLocal");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// const update = multer({ storage: multer.memoryStorage() });
const router = (0, express_1.Router)();
// !Action Admin
router.post("/ram", validateToken_1.tokenValidation, upload.array("files"), uploadLocal_1.uploadLocal, ramCtrl.createComponent);
router.put("/ram/:id", validateToken_1.tokenValidation, upload.array("files"), updateLocal_1.updateLocal, ramCtrl.updateComponent);
router.delete("/ram/:id", validateToken_1.tokenValidation, ramCtrl.deleteComponent);
router.get("/ram", ramCtrl.getComponents);
router.get("/ram/:id", ramCtrl.getComponent);
exports.default = router;
