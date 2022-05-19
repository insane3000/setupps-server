import { Router } from "express";
import * as moboCtrl from "./mobo.controller";
// import * as componentCtrl from "../../libs/crudComponent";
import { tokenValidation } from "../../libs/validateToken";
// import { expireValidation } from "../../libs/validateExpireCode";
import { uploadLocal } from "../../libs/uploadLocal";
import { updateLocal } from "../../libs/updateLocal";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
// const update = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/mobo", tokenValidation, upload.array("files"), uploadLocal, moboCtrl.createComponent);
router.put(
  "/mobo/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  moboCtrl.updateComponent
);
router.delete("/mobo/:id", tokenValidation, moboCtrl.deleteComponent);
router.get("/mobo", moboCtrl.getComponents);
router.get("/mobo/:id", moboCtrl.getComponent);

export default router;
