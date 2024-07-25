// queries.js
import { databases } from "../config/databases.js";

const crear = async (user_id, title, content) => {
  console.log(user_id, title, content);
  try {
    const query = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
    const [result] = await databases.query(query, [user_id, title, content]);
    return result.insertId;
  } catch (err) {
    throw new Error("Error al crear post: " + err.message);
  }
};

const obtenerPost = async () => {
  try {
    const query = `
      SELECT p.*, COUNT(l.post_id) AS likes 
      FROM posts p 
      LEFT JOIN likes l ON p.id = l.post_id 
      GROUP BY p.id 
      LIMIT 25`;
    const [result] = await databases.query(query);
    return result;
  } catch (err) {
    throw new Error("Error al obtener posts: " + err.message);
  }
};

const PostByUserID=async (id)=>{
  try {
    const query = `SELECT p.*, COUNT(l.post_id) AS likes
FROM posts p
LEFT JOIN likes l ON p.id = l.post_id
WHERE p.user_id = ?
GROUP BY p.id
LIMIT 25;
`;
    const [result] = await databases.query(query,[id]);
    return result;
  } catch (err) {
    throw new Error("Error al obtener posts: " + err.message);
  }
}

const obtenerPostPorId = async (post_id) => {
  try {
    const query = `
      SELECT 
        p.*, 
        COUNT(l.post_id) AS likes, 
        c.id AS comment_id, 
        c.content AS comment_content, 
        u.username AS comment_username
      FROM posts p 
      LEFT JOIN likes l ON p.id = l.post_id 
      LEFT JOIN comments c ON p.id = c.post_id 
      LEFT JOIN users u ON c.user_id = u.id 
      WHERE p.id = ? 
      GROUP BY p.id, c.id 
      ORDER BY c.id`;
    const [result] = await databases.query(query, [post_id]);

    // Procesa el resultado para estructurarlo correctamente
    const post = {
      id: result[0].id,
      user_id: result[0].user_id,
      title: result[0].title,
      content: result[0].content,
      likes: result[0].likes,
      comments: []
    };

    result.forEach(row => {
      if (row.comment_id) {
        post.comments.push({
          id: row.comment_id,
          content: row.comment_content,
          username: row.comment_username
        });
      }
    });

    return post;
  } catch (err) {
    throw new Error("Error al obtener post por ID: " + err.message);
  }
}

const actualizarPost = async (post_id, title, content) => {
  console.log(title, content, post_id);
  try {
    const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    const [result] = await databases.query(query, [title, content, post_id]);
    return result;
  } catch (err) {
    throw new Error("Error al actualizar post: " + err.message);
  }
};

const eliminarPost = async (post_id) => {
  try {
    const query = 'DELETE FROM posts WHERE id = ?';
    const [result] = await databases.query(query, [post_id]);
    return result;
  } catch (err) {
    throw new Error("Error al eliminar post: " + err.message);
  }
};

const buscarPost = async (dato) => {
  try {
    const query = `
      SELECT p.*, COUNT(l.post_id) AS likes 
      FROM posts p 
      LEFT JOIN likes l ON p.id = l.post_id 
      WHERE p.title LIKE ? OR p.content LIKE ? 
      GROUP BY p.id 
      LIMIT 25`;
    const [result] = await databases.query(query, [`%${dato}%`, `%${dato}%`]);
    return result;
  } catch (err) {
    throw new Error("Error al buscar: " + err.message);
  }
};

export { crear, obtenerPost, obtenerPostPorId, actualizarPost, eliminarPost, buscarPost,PostByUserID};
