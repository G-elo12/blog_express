import express from "express";
import bodyParser from "body-parser";
import { routesPost } from "./routes/post.js";
import { routesauth } from "./routes/user.js";
import {routerReaction} from "./routes/Reaction.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors({
  origin: "*",
}))
app.use(morgan("dev"))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", routesauth);
app.use("/post", routesPost);
app.use("/reaction", routerReaction);

app.listen(3000, () => {
  console.log("Servidor en el puerto 3000");
});
