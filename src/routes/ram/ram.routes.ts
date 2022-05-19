import { Router } from "express";
import * as ramCtrl from "./ram.controller";
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
router.post("/ram", tokenValidation, upload.array("files"), uploadLocal, ramCtrl.createComponent);
router.put(
  "/ram/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  ramCtrl.updateComponent
);
router.delete("/ram/:id", tokenValidation, ramCtrl.deleteComponent);
router.get("/ram", ramCtrl.getComponents);
router.get("/ram/:id", ramCtrl.getComponent);

export default router;
