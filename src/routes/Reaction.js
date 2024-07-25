import { Router } from "express";
import { darLike} from "../controllers/like.js";
import {addComments} from "../controllers/comment.js";

const routerReaction = Router()

routerReaction.post("/like",darLike)
routerReaction.post("/comments",addComments)

export {routerReaction}