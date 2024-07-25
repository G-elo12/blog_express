// Reaction.js
import { databases } from "../config/databases.js";

const like = async (id_user, id_post) => {
    try {
        const query = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
        await databases.query(query, [id_post, id_user]);
    } catch (e) {
        throw new Error("Error al dar like: " + e.message);
    }
};

export { like };
;