import { Router } from "express";
import * as nvmeCtrl from "./nvme.controller";
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
router.post("/nvme", tokenValidation, upload.array("files"), uploadLocal, nvmeCtrl.createComponent);
router.put(
  "/nvme/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  nvmeCtrl.updateComponent
);
router.delete("/nvme/:id", tokenValidation, nvmeCtrl.deleteComponent);
router.get("/nvme", nvmeCtrl.getComponents);
router.get("/nvme/:id", nvmeCtrl.getComponent);

export default router;
