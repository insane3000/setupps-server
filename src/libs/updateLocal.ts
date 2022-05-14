import { Response, Request, NextFunction } from "express";
import sharp from "sharp";
import config from "../config";
// import S3 from "aws-sdk/clients/s3";
import { randomBytes } from "crypto";
import path from "path";
import fs from "fs";

export const updateLocal = async (req: any, res: Response, next: NextFunction) => {
  //   console.log(req.body.specifications);
  function removeNonAplhaNumeric(str: string) {
    return str.replace(/[\W_]/g, "").toLowerCase();
  }
  // !Name
  let model = removeNonAplhaNumeric(`${req.body.model}`);
  let random = randomBytes(6).toString("hex");
  const pathSave = path.join(__dirname, `../../public/${req.body.type}/`);
  // !Accion si existe file
  if (req.files.length > 0) {
    // !Delete previous image
    try {
      JSON.parse(req.body.imageM).map((i: any) => {
        fs.unlinkSync(`${pathSave}${i}`);
        console.log("File M deleted!");
      });
    } catch (err) {
      console.error(err);
    }
    try {
      JSON.parse(req.body.imageS).map((i: any) => {
        fs.unlinkSync(`${pathSave}${i}`);
        console.log("File S deleted!");
      });
    } catch (err) {
      console.error(err);
    }
    // !Resize whit sharp
    var s: any = [];
    var m: any = [];
    for (let index = 0; index < req.files.length; index++) {
      await sharp(req.files?.[index].buffer)
        .resize(250)
        .webp()
        .toFile(`${pathSave}${model}-${250}px-${index + 1}-${random}.webp`)
        .then(() => {
          s.push(`${model}-${250}px-${index + 1}-${random}.webp`);
          console.log("Img S complete!!");
        });
    }
    for (let index = 0; index < req.files.length; index++) {
      await sharp(req.files?.[index].buffer)
        .resize(1000)
        .webp()
        .toFile(`${pathSave}${model}-${1000}px-${index + 1}-${random}.webp`)
        .then(() => {
          m.push(`${model}-${1000}px-${index + 1}-${random}.webp`);
          console.log("Img M complete!!");
        });
    }
    req.body.imageS = s;
    req.body.imageM = m;
    console.log("Sending to controller!");
    req.body.specifications = JSON.parse(req.body.specifications);
    next();
  } else {
    req.body.imageM = JSON.parse(req.body.imageM);
    req.body.imageS = JSON.parse(req.body.imageS);
    req.body.specifications = JSON.parse(req.body.specifications);
    next();
  }
};
