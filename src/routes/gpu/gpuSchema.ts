import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const gpuSchema = new Schema(
  {
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },

    memory: { type: String, trim: true },
    memory_type: { type: String, trim: true },
    gpu_boost_clock: { type: Number, trim: true },
    length: { type: Number, trim: true },
    benchmark: { type: Number, trim: true },
    launch_date: { type: String, trim: true },

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
gpuSchema.plugin(mongoosePaginate);

export default model("gpu", gpuSchema);
