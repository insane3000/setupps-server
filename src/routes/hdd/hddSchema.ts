import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const hddSchema = new Schema(
  {
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },

    capacity: { type: String, trim: true },
    rpm: { type: Number, trim: true },
    cache: { type: String, trim: true },
    interface: { type: String, trim: true },
    form_factor: { type: String, trim: true },

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
hddSchema.plugin(mongoosePaginate);

export default model("hdd", hddSchema);
