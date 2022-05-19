import { Router } from "express";
import * as hddCtrl from "./hdd.controller";
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
router.post("/hdd", tokenValidation, upload.array("files"), uploadLocal, hddCtrl.createComponent);
router.put(
  "/hdd/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  hddCtrl.updateComponent
);
router.delete("/hdd/:id", tokenValidation, hddCtrl.deleteComponent);
router.get("/hdd", hddCtrl.getComponents);
router.get("/hdd/:id", hddCtrl.getComponent);

export default router;
