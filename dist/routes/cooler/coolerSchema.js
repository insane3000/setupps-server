"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const coolerSchema = new mongoose_1.Schema({
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },
    compatibility: { type: String, trim: true },
    cooler_type: { type: String, trim: true },
    noise_level: { type: String, trim: true },
    fans: { type: Number, trim: true },
    fans_size: { type: Number, trim: true },
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
coolerSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)("cooler", coolerSchema);
