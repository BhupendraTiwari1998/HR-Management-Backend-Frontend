import express from "express";
import { addAdmin, deleteAdmin, getAdmin, getAdmins, signIn, signUp, updateAdmin } from "../controllers/admin.controller";
import auth from "../middleware/auth.middleware";

const router = express.Router();

router.get("/get-admins",auth,getAdmins);
router.post("/add-admin",addAdmin);
router.get("/get-admin/:admin_id",getAdmin);
router.put("/update-admin/:admin_id",updateAdmin);
router.delete("/delete-admin/:admin_id",deleteAdmin);
router.post("/sign-up",signUp)
router.post("/sign-in",signIn)


export default router