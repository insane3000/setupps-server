import { Response, RequestHandler } from "express";
import Mobo from "../routes/mobo/moboSchema";
import Cpu from "../routes/cpu/cpuSchema";
import Ram from "../routes/ram/ramSchema";
import Gpu from "../routes/gpu/gpuSchema";
import Power from "../routes/power/powerSchema";
import Case from "../routes/case/caseSchema";
import Nvme from "../routes/nvme/nvmeSchema";
import Ssd from "../routes/ssd/ssdSchema";
import Hdd from "../routes/hdd/hddSchema";
import Cooler from "../routes/cooler/coolerSchema";
import fs from "fs";
import path from "path";

var queryComponent = (req: any) => {
  //   console.log(req._parsedUrl);
  switch (req._parsedUrl.pathname.split("/")[1]) {
    case "cpu":
      return Cpu;
    case "mobo":
      return Mobo;
    case "ram":
      return Ram;
    case "gpu":
      return Gpu;
    case "power":
      return Power;
    case "case":
      return Case;
    case "nvme":
      return Nvme;
    case "ssd":
      return Ssd;
    case "hdd":
      return Hdd;
    case "cooler":
      return Cooler;
    default:
      return Cpu;
  }
};
// !POST
export const createComponent: RequestHandler = async (req: any, res) => {
  let schema = queryComponent(req);
  let newComponent = new schema(req.body);
  const savedComponent = await newComponent.save();
  console.log("Saved Component");
  res.json(savedComponent);
};
//! PUT
export const updateComponent: RequestHandler = async (req: any, res) => {
  let schema = queryComponent(req);
  const componentUpdated = await schema.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  if (!componentUpdated) return res.status(204).json();
  console.log("Updated component!");
  return res.json(componentUpdated);
};
//! DELETE
export const deleteComponent: RequestHandler = async (req, res) => {
  let schema = queryComponent(req);
  const componentFound: any = await schema.findByIdAndDelete(req.params.id);
  const pathDelete = path.join(__dirname, `../../public/${req.query.component}/`);

  if (!componentFound) return res.status(204).json();
  // !Delete previous image
  try {
    componentFound.imageM.map((i: any) => {
      fs.unlinkSync(`${pathDelete}${i}`);
      console.log("File M deleted!");
    });
  } catch (err) {
    console.error(err);
  }

  try {
    componentFound.imageS.map((i: any) => {
      fs.unlinkSync(`${pathDelete}${i}`);
      console.log("File S deleted!");
    });
  } catch (err) {
    console.error(err);
  }

  return res.status(204).json();
};

// !GET
export const getComponents: RequestHandler = async (req: any, res) => {
  let schema = queryComponent(req);
  const page = parseInt(req.query?.page, 10) || 1;
  const limit = parseInt(req.query?.limit, 10) || 10;
  const search = req.query?.search || "";
  console.log(req.query);
  // !Delete accents
  function diacriticSensitiveRegex(string = "") {
    return string
      .replace(/a/g, "[a,á,à,ä]")
      .replace(/e/g, "[e,é,ë]")
      .replace(/i/g, "[i,í,ï]")
      .replace(/o/g, "[o,ó,ö,ò]")
      .replace(/u/g, "[u,ü,ú,ù]");
  }

  try {
    //! Si parametro NO EXISTE
    if (search === "") {
      const components = await schema.paginate(
        {
          //   $or: [{ socket: { $regex: `${req.query.socket}*`, $options: "i" } }],
        },
        {
          page,
          limit,
          sort: { createdAt: "desc" },
        }
      );
      return res.json(components);
    }
    //! Si parametro  EXISTE
    if (search !== "") {
      const components = await schema.paginate(
        {
          $or: [
            { model: { $regex: diacriticSensitiveRegex(`${search}*`), $options: "i" } },
            { manufacturer: { $regex: diacriticSensitiveRegex(`${search}*`), $options: "i" } },
          ],
        },
        {
          page,
          limit,
          sort: { createdAt: "desc" },
        }
      );
      return res.json(components);
    }
  } catch (error) {
    res.json(error);
  }
};
// //! GET :id
export const getComponent: RequestHandler = async (req, res) => {
  let schema = queryComponent(req);
  const id = req.params.id;
  try {
    const component = await schema.findById(id);
    return res.json(component);
  } catch (error) {
    return res.status(204).json();
  }
};
