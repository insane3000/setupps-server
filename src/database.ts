import mongoose, { ConnectOptions } from "mongoose";
// * Variables de entorno
import config from "./config";

const startServerDb = async () => {
  try {
    const mongooseOptions: ConnectOptions = {
      //   user: config.MONGO_USER,
      //   pass: config.MONGO_PASSWORD,
    };
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
      mongooseOptions
    );
    console.log("database is connected", db.connection.name);
  } catch (error) {
    console.log(error);
  }
};
startServerDb();
