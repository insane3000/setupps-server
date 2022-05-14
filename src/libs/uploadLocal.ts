import { Response, Request, NextFunction } from "express";
import sharp from "sharp";
import path from "path";
import { randomBytes } from "crypto";
export const uploadLocal = async (req: any, res: Response, next: NextFunction) => {
//   console.log(req.body);
  function removeNonAplhaNumeric(str: string) {
    return str.replace(/[\W_]/g, "").toLowerCase();
  }
  // !Name
  let model = removeNonAplhaNumeric(`${req.body.model}`);
  let random = randomBytes(6).toString("hex");
  const pathSave = path.join(__dirname, `../../public/${req.body.type}/`);

  if (req.files) {
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
    req.body.imageXL = "";
    req.body.imageL = "";
    req.body.imageM = "";
    req.body.imageS = "";
    next();
  }
};
