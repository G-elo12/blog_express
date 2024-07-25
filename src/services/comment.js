// comment.js
import { databases } from "../config/databases.js";

const addcomment = async (post_id, user_id, content) => {
    console.log(content + user_id + post_id);
    try {
        const query = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
        const [result] = await databases.query(query, [post_id, user_id, content]);
        return result;
    } catch (err) {
        throw new Error("Error al agregar comentario: " + err.message);
    }
};

export { addcomment };
