import { Router } from "express";
import * as fanCtrl from "./fan.controller";
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
  "/fan",
  tokenValidation,
  upload.array("files"),
  uploadLocal,
  fanCtrl.createComponent
);
router.put(
  "/fan/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  fanCtrl.updateComponent
);
router.delete("/fan/:id", tokenValidation, fanCtrl.deleteComponent);
router.get("/fan", fanCtrl.getComponents);
router.get("/fan/:id", fanCtrl.getComponent);

export default router;
