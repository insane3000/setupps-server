import { Router } from "express";
import * as gpuCtrl from "./gpu.controller";
// import * as componentCtrl from "../../libs/crudComponent";

import { tokenValidation } from "../../libs/validateToken";
// import { expireValidation } from "../../libs/validateExpireCode";
import { uploadLocal } from "../../libs/uploadLocal";
import { updateLocal } from "../../libs/updateLocal";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
// const update = multer({ storage: multer.memoryStorage() });
const router = Router();

// !Action Admin
router.post("/gpu", tokenValidation, upload.array("files"), uploadLocal, gpuCtrl.createComponent);
router.put(
  "/gpu/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  gpuCtrl.updateComponent
);
router.delete("/gpu/:id", tokenValidation, gpuCtrl.deleteComponent);
router.get("/gpu", gpuCtrl.getComponents);
router.get("/gpu/:id", gpuCtrl.getComponent);

export default router;
