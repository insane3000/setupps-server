import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { isNumberObject } from "util/types";

const moboSchema = new Schema(
  {
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },

    platform: { type: String, trim: true },
    socket: { type: String, trim: true },
    chipset: { type: String, trim: true },
    ram_type: { type: String, trim: true },
    max_memory: { type: String, trim: true },
    form_factor: { type: String, trim: true },
    memory_speed_max: { type: Number, trim: true },
    lan_speed_max: { type: String, trim: true },
    PCIe: { type: String, trim: true },

    imageM: [],
    imageS: [],
    specifications: [],
    price: { type: Number, trim: true },
    power: { type: Number, trim: true },
    quantity: { type: Number, trim: true },
    error: { type: Boolean },
    warning: { type: String, trim: true },
    available: { type: String, trim: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
moboSchema.plugin(mongoosePaginate);

export default model("mobo", moboSchema);
