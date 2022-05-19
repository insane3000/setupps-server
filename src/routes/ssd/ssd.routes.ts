import { Router } from "express";
import * as ssdCtrl from "./ssd.controller";
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
router.post("/ssd", tokenValidation, upload.array("files"), uploadLocal, ssdCtrl.createComponent);
router.put(
  "/ssd/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  ssdCtrl.updateComponent
);
router.delete("/ssd/:id", tokenValidation, ssdCtrl.deleteComponent);
router.get("/ssd", ssdCtrl.getComponents);
router.get("/ssd/:id", ssdCtrl.getComponent);

export default router;
