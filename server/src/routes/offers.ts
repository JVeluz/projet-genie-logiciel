import { Router } from "express";
import OfferController from "../controllers/OfferController";
import OfferRepository from "../repositories/OfferRepository";
import OfferService from "../services/OfferService";
import authenticate from "../middlewares/authenticate";

const router = Router();

const offerRepository = new OfferRepository();
const offerService = new OfferService(offerRepository);
const offerController = new OfferController(offerService);

router.get("/", offerController.getAll);
router.get("/search/:terms", offerController.search);
router.get("/:id", offerController.getById);
router.post("/", offerController.create);
router.put("/:id", offerController.update);
router.delete("/:id", offerController.delete);

router.post("/:id/reserve", [authenticate], offerController.reserve);
router.post("/:id/confirm", [authenticate], offerController.confirm);
router.post("/:id/cancel", [authenticate], offerController.cancel);

export default router;