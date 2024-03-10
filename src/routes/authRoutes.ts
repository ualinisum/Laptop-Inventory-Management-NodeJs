import  express  from "express";
import { signUp, signIn } from "../controllers/authController";
import { requestValidator } from "../middlewares/validateRequest";
import { signInValidator, signUpValidator } from "../validators/authValidator";

const router = express.Router();

router.post("/signUp", requestValidator(signUpValidator) , signUp);
router.post("/signIn", requestValidator(signInValidator), signIn);

export default router;