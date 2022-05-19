import { Router } from "express";
import * as powerCtrl from "./power.controller";
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
router.post(
  "/power",
  tokenValidation,
  upload.array("files"),
  uploadLocal,
  powerCtrl.createComponent
);
router.put(
  "/power/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  powerCtrl.updateComponent
);
router.delete("/power/:id", tokenValidation, powerCtrl.deleteComponent);
router.get("/power", powerCtrl.getComponents);
router.get("/power/:id", powerCtrl.getComponent);

export default router;
