import { Router } from "express";
import * as cpuCtrl from "./cpu.controller";
// import * as componentCtrl from "../../libs/crudComponent";

// import { tokenValidation } from "../../libs/validateToken";
// import { expireValidation } from "../../libs/validateExpireCode";
import { uploadLocal } from "../../libs/uploadLocal";
import { updateLocal } from "../../libs/updateLocal";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
// const update = multer({ storage: multer.memoryStorage() });
const router = Router();

// !Action Admin
router.post("/cpu", upload.array("files"), uploadLocal, cpuCtrl.createComponent);
router.put("/cpu/:id", upload.array("files"), updateLocal, cpuCtrl.updateComponent);
router.delete("/cpu/:id", cpuCtrl.deleteComponent);
router.get("/cpu", cpuCtrl.getComponents);
router.get("/cpu/:id", cpuCtrl.getComponent);

export default router;
