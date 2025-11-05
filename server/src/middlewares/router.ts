import { Router } from "express";
import UserController from "../controllers/UserController";
import OfferController from "../controllers/OfferController";

const router: Router = Router();

const userController = new UserController();
const offerController = new OfferController();

router.get("/users/:id", userController.getById);
router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/offers", offerController.getAll);
router.get("/offers/search/:terms", offerController.search);
router.get("/offers/:id", offerController.getById);
router.post("/offers", offerController.create);
router.put("/offers/:id", offerController.update);
router.delete("/offers/:id", offerController.delete);

export default router;
