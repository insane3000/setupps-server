import { Response, RequestHandler } from "express";
import Cooler from "./coolerSchema";
import fs from "fs";
import path from "path";
// !POST
export const createComponent: RequestHandler = async (req: any, res) => {
  let newComponent = new Cooler(req.body);
  const savedComponent = await newComponent.save();
  console.log("Saved Component");
  res.json(savedComponent);
};
//! PUT
export const updateComponent: RequestHandler = async (req: any, res) => {
  const componentUpdated = await Cooler.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  if (!componentUpdated) return res.status(204).json();
  console.log("Updated component!");
  return res.json(componentUpdated);
};
// !DELETE
export const deleteComponent: RequestHandler = async (req, res) => {
  const componentFound: any = await Cooler.findByIdAndDelete(req.params.id);
  const pathDelete = path.join(__dirname, `../../../public/${req.query.component}`);

  if (!componentFound) return res.status(204).json();
  // !Delete previous image
  try {
    componentFound.imageM.map((i: any) => {
      fs.unlinkSync(`${pathDelete}/${i}`);
      console.log("File M deleted!");
    });
  } catch (err) {
    console.error(err);
  }

  try {
    componentFound.imageS.map((i: any) => {
      fs.unlinkSync(`${pathDelete}/${i}`);
      console.log("File S deleted!");
    });
  } catch (err) {
    console.error(err);
  }

  return res.status(204).json();
};
// !GET
export const getComponents: RequestHandler = async (req: any, res) => {
  const page = parseInt(req.query?.page, 10) || 1;
  const limit = parseInt(req.query?.limit, 10) || 17;
  const search = req.query?.search || "";
  const manufacturer = req.query?.manufacturer || "";
  const available = req.query?.available || "";
  const gte = req.query?.gte || 0;
  const lte = req.query?.lte || 9999999;
  const sort = req.query?.sort || "";
  //!Component
  const cooler_type = req.query?.cooler_type || "";
  const socket = req.query?.socket || "";
  const fans = req.query?.fans || "";
  const fans_size = req.query?.fans_size || "";

  console.log(req.query);
  // !Delete accents
  function diacriticSensitiveRegex(string = "") {
    return string
      .replace(/a/g, "[a,??,??,??]")
      .replace(/e/g, "[e,??,??]")
      .replace(/i/g, "[i,??,??]")
      .replace(/o/g, "[o,??,??,??]")
      .replace(/u/g, "[u,??,??,??]");
  }
  try {
    const components = await Cooler.paginate(
      {
        $or: [
          { model: { $regex: diacriticSensitiveRegex(search), $options: "i" } },
          { manufacturer: { $regex: diacriticSensitiveRegex(search), $options: "i" } },
        ],
        price: { $gte: gte, $lte: lte },
        $and: [
          { manufacturer: { $regex: manufacturer, $options: "i" } },
          { cooler_type: { $regex: cooler_type, $options: "i" } },
          { compatibility: { $regex: socket, $options: "i" } },
          { fans: fans === "" ? { $gte: 0, $lte: 10 } : fans },
          { fans_size: fans_size === "" ? { $gte: 0, $lte: 140 } : fans_size },
          //!Required
          { available: { $regex: available, $options: "i" } },
        ],
      },
      {
        page,
        limit,
        sort: sort === "" ? { createdAt: "desc" } : { price: sort },
      }
    );
    return res.json(components);
    //     }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
// !GET :id
export const getComponent: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const component = await Cooler.findById(id);
    return res.json(component);
  } catch (error) {
    return res.status(204).json();
  }
};
