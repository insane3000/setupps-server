import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const caseSchema = new Schema(
  {
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },

    form_factor: { type: String, trim: true },
    PSU: { type: String, trim: true },
    height: { type: Number, trim: true },
    length: { type: Number, trim: true },
    width: { type: Number, trim: true },

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
caseSchema.plugin(mongoosePaginate);

export default model("case", caseSchema);
