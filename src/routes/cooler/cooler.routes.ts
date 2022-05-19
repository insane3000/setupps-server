import { Router } from "express";
import * as coolerCtrl from "./cooler.controller";
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
  "/cooler",
  tokenValidation,
  upload.array("files"),
  uploadLocal,
  coolerCtrl.createComponent
);
router.put(
  "/cooler/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  coolerCtrl.updateComponent
);
router.delete("/cooler/:id", tokenValidation, coolerCtrl.deleteComponent);
router.get("/cooler", coolerCtrl.getComponents);
router.get("/cooler/:id", coolerCtrl.getComponent);

export default router;
