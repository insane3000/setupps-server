"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const cpuSchema = new mongoose_1.Schema({
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },
    total_cores: { type: Number, trim: true },
    number_of_performance_cores: { type: Number, trim: true },
    number_of_efficient_cores: { type: Number, trim: true },
    total_threads: { type: Number, trim: true },
    boost_clock: { type: Number, trim: true },
    cache: { type: Number, trim: true },
    integrated_graphics: { type: String, trim: true },
    socket: { type: String, trim: true },
    architecture: { type: String, trim: true },
    launch_date: { type: String, trim: true },
    stock_cooler: { type: String, trim: true },
    imageM: [],
    imageS: [],
    specifications: [],
    price: { type: Number, trim: true },
    power: { type: Number, trim: true },
    quantity: { type: Number, trim: true },
    error: { type: Boolean },
    warning: { type: String, trim: true },
    available: { type: String, trim: true },
    keywords: { type: String, trim: true },
}, {
    versionKey: false,
    timestamps: true,
});
cpuSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = (0, mongoose_1.model)("cpu", cpuSchema);
