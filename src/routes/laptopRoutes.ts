import  express  from "express";
import { getAllLaptops, addNewLaptop, updateLaptop, deleteLaptop } from "../controllers/laptopContoller";
import { authentication } from "../middlewares/authentication";
import { requestValidator } from "../middlewares/validateRequest";
import { laptopValidator } from "../validators/laptopValidator";

const router = express.Router()

router.get("/", getAllLaptops)
router.post("/", [authentication, requestValidator(laptopValidator)] , addNewLaptop)
router.put("/:id", [authentication, requestValidator(laptopValidator)], updateLaptop)
router.delete("/:id", authentication, deleteLaptop)

export default router;