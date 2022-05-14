import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  REGION: process.env.REGION,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST,
  SECRET: process.env.SECRET,
};
