import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const adminSchema = new Schema(
  {
    role: { type: String, trim: true },
    user: { type: String, trim: true },
    password: { type: String, trim: true },
    imageM: [],
    imageS: [],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
adminSchema.plugin(mongoosePaginate);

export default model("admin", adminSchema);
