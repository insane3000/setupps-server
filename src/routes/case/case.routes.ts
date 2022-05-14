import { Router } from "express";
import * as caseCtrl from "./case.controller";
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
router.post("/case", upload.array("files"), uploadLocal, caseCtrl.createComponent);
router.put("/case/:id", upload.array("files"), updateLocal, caseCtrl.updateComponent);
router.delete("/case/:id", caseCtrl.deleteComponent);
router.get("/case", caseCtrl.getComponents);
router.get("/case/:id", caseCtrl.getComponent);

export default router;
