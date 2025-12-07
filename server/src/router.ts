import { Router } from "express";
import usersRouter from "./routes/users";
import offersRouter from "./routes/offers";
import chatsRouter from "./routes/chats";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/offers", offersRouter);
router.use("/chats", chatsRouter);

export default router;
