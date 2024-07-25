// controllers/Reaction.js
import { like } from "../services/like.js";

const darLike = async (req, res) => {
    const { id_post, id_user } = req.body; // Cambiado a req.body para enviar datos desde el cuerpo

    try {
        await like(id_user, id_post);
        res.status(200).send({ message: "Like agregado correctamente" });
    } catch (err) {
        res.status(500).send({ message: "Error al dar like: " + err.message });
    }
};

export { darLike };
