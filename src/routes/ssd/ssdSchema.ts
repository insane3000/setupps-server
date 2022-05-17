import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ssdSchema = new Schema(
  {
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },

    capacity: { type: String, trim: true },
    read: { type: Number, trim: true },
    write: { type: Number, trim: true },
    TBW: { type: String, trim: true },
    MTBF: { type: Number, trim: true },
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
ssdSchema.plugin(mongoosePaginate);

export default model("ssd", ssdSchema);
