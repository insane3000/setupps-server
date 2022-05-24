import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ramSchema = new Schema(
  {
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },

    memory_size: { type: String, trim: true },
    speed: { type: String, trim: true },
    ram_type: { type: String, trim: true },
    CAS_latency: { type: Number, trim: true },
    timing: { type: String, trim: true },

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
ramSchema.plugin(mongoosePaginate);

export default model("ram", ramSchema);
