
import { Router } from "express";
import { signup, upsertUser, getUserByEmail, getUserById} from "./user.service.js";
const userRouter = Router();


///users/by-email (for example /user/by-email?email=user1@gmail.com)
userRouter.post('/signup', signup);
userRouter.put('/:id', upsertUser);
userRouter.get('/by-email', getUserByEmail);
userRouter.get('/:id', getUserById);

export default userRouter;