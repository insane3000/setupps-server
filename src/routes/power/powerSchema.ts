import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const powerSchema = new Schema(
  {
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },

    efficiency_rating: { type: String, trim: true },
    wattage: { type: Number, trim: true },
    form_factor: { type: String, trim: true },
    modular: { type: String, trim: true },

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
powerSchema.plugin(mongoosePaginate);

export default model("power", powerSchema);
