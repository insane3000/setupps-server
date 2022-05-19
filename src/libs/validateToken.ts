import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
// * Variables de entorno
import config from "../config";
export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json("Access denied");

  jwt.verify(token, `${config.SECRET}`, (err) => {
    if (err) return res.sendStatus(403);
//     req.body.id_header = req.headers["id"];
    next();
  });
};
