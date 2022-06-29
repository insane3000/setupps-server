import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const fanSchema = new Schema(
  {
    type: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },

//     compatibility: { type: String, trim: true },
//     cooler_type: { type: String, trim: true },
    noise_level: { type: String, trim: true },
//     fans: { type: Number, trim: true },
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
fanSchema.plugin(mongoosePaginate);

export default model("fan", fanSchema);
