import {
  crear,
  obtenerPost,
  obtenerPostPorId,
  actualizarPost,
  eliminarPost,
  buscarPost,
  PostByUserID
} from "../services/post.js";

const post = async (req, res) => {
  const { title, content } = req.body;
  const id_user = req.user.id

  try {
    const result = await crear(id_user, title, content);
    res.status(201).send({
      result
    });
  } catch (err) {
    res.status(500).send({ message: "Error al crear el post", err });
  }
};

const get = async (req, res) => {
  try {
    const result = await obtenerPost();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener los posts", err });
  }
};

const getById = async (req, res) => {
  const id_post = req.params.idpost;
  try {
    const result = await obtenerPostPorId(id_post);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener el post", err });
  }
};

const deletes = async (req, res) => {
  const id_post = req.params.id;

  try {
    const post = await obtenerPost(id_post);
    if(post.user_id!== req.user.id) {
      return res.status(403).send({ message: "No autorizado para eliminar este post" });
    }

    await eliminarPost(id_post);
    res.status(200).send({ message: "Post eliminado correctamente" });
  } catch (err) {
    res.status(500).send({ message: "Error al eliminar el post", err });
  }
};

const update = async (req, res) => {
  const id_post = req.params.id;
  const { title, content } = req.body;
  try {
    const post = await obtenerPost(id_post);
    if(post.user_id!== req.user.id) {
      return res.status(403).send({ message: "No autorizado para eliminar este post" });
    }
    await actualizarPost(id_post, title, content);
    res.status(200).send({ message: "Post actualizado correctamente" });
  } catch (err) {
    res.status(500).send({ message: "Error al actualizar el post", err });
  }
};

const busqueda = async (req, res) => {
  const dato = req.query.data;
  if (!dato) {
    return res.status(400).send({ message: "Parámetro de búsqueda 'data' es requerido" });
  }

  try {
    const result = await buscarPost(dato);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const GetByUserID = async (req, res) => {
  const id = req.params.idUser;

  try{

    const result = await PostByUserID(id)
    result.status(200).send(result)

  }catch (err){
    res.status(500).send({ message: "Error al obtener el post", err });
  }

}

export { post, get, getById, deletes, update, busqueda,GetByUserID };
