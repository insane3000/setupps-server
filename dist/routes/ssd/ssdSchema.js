"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const ssdSchema = new mongoose_1.Schema({
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },
    capacity: { type: String, trim: true },
    read: { type: String, trim: true },
    write: { type: String, trim: true },
    terabytes_written: { type: String, trim: true },
    imageM: [],
    imageS: [],
    specifications: [],
    price: { type: Number, trim: true },
    power: { type: Number, trim: true },
    quantity: { type: Number, trim: true },
    error: { type: Boolean },
    warning: { type: String, trim: true },
    available: { type: String, trim: true },
}, {
    versionKey: false,
    timestamps: true,
});
ssdSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)("ssd", ssdSchema);
