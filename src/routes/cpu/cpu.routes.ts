import { Router } from "express";
import * as cpuCtrl from "./cpu.controller";
import { uploadLocal } from "../../libs/uploadLocal";
import { updateLocal } from "../../libs/updateLocal";
import multer from "multer";
import { tokenValidation } from "../../libs/validateToken";

const upload = multer({ storage: multer.memoryStorage() });
// const update = multer({ storage: multer.memoryStorage() });
const router = Router();

// !Action Admin
router.post("/cpu", tokenValidation, upload.array("files"), uploadLocal, cpuCtrl.createComponent);
router.put(
  "/cpu/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  cpuCtrl.updateComponent
);
router.delete("/cpu/:id", tokenValidation, cpuCtrl.deleteComponent);
router.get("/cpu", cpuCtrl.getComponents);
router.get("/cpu/:id", cpuCtrl.getComponent);

export default router;
