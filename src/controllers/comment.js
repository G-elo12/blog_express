// comment.js
import { addcomment } from "../services/comment.js";

const addComments = async (req, res) => {
    const { content, user_id, post_id } = req.body;
    console.log("coj" + user_id + post_id + content);
    try {
        const result = await addcomment(post_id, user_id, content);  // Orden corregido
        res.status(201).send({ result });
    } catch (err) {
        res.status(500).send({ message: "Error al crear el comment", err });
    }
};

export { addComments };
