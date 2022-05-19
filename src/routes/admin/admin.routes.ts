import { Router } from "express";
import * as adminCtrl from "./admin.controller";
import { tokenValidation } from "../../libs/validateToken";
// import { uploadLocal } from "../../libs/uploadLocal";
import { updateLocal } from "../../libs/updateLocal";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

// !Rutas
// router.post("/insane", upload.array("files"), uploadLocal, adminCtrl.createAdmin);
router.post("/admin", adminCtrl.checkAdmin);
router.put(
  "/admin/:id",
  tokenValidation,
  upload.array("files"),
  updateLocal,
  adminCtrl.updateComponent
);
router.delete("/admin/:id", tokenValidation, adminCtrl.deleteComponent);
router.get("/admin", tokenValidation, adminCtrl.getComponents);
router.get("/admin/:id", tokenValidation, adminCtrl.getComponent);

export default router;
