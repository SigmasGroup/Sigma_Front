import axios from "axios";
import { API_KEY, API_URL } from "../config";

const api = axios.create({
  baseURL: `https://sigma-l1x8.onrender.com`,
  headers: {
    "X-API-Key": `e1ec7a1e07dde524eaf045738767a03571313b6f1fd28e4e9d885f3a288131bd677b8260bca0422d2b0992aa2aac1f888de03b0174ba97ea295334abf03600c50d19044fbb581c35056815154953b4ad073819f3f7d0cd37622284e3004909117795b1e3d7e804095ebfc73918932fb50ee030f9e8fe711aa29e2ea3e336b468`,
  },
});

// Post

const postUser = (username, email, password) =>
  api.post("/api/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const postUserLogin = (email, password) =>
  api.post("/api/auth/local", {
    identifier: email,
    password: password,
  });

const postConjunto = (name, descripcion, id, userId) =>
  api.post("/api/conjuntos", {
    data: {
      nombre: name,
      descripcion: descripcion,
      puntaje: 0,
      ropas: id,
      tipoConjunto: "comunidad",
      user: userId,
    },
  });

//Get
const getRopas = () => api.get("/api/ropas?populate[img][fields]=url");
const getRopasUser = (id) =>
  api.get(
    `/api/ropas?populate[img][fields]=url&populate[users][fields]=id&[filters][users][id][$eq]=${id}`
  );
const getDetalleComunidad = () =>
  api.get(
    "api/conjuntos?populate[ropas][populate][img][fields]=url&[filters][tipoConjunto][$eq]=comunidad"
  );
const getDetalle = () =>
  api.get("/api/conjuntos?populate[ropas][populate][img][fields]=url");
const getDetalleAdmin = () =>
  api.get(
    "/api/conjuntos?populate[ropas][populate][img][fields]=url&[filters][tipoConjunto][$eq]=admin&populate[favorite][fields]=id"
  );
const getDetalleUnico = (id) =>
  api.get(`/api/conjuntos/${id}?populate[ropas][populate][img][fields]=url`);

const getDetalleFavorite = (id) =>
  api.get(
    `/api/conjuntos?populate[ropas][populate][img][fields]=url&populate[favorite][fields]=id&[filters][favorite][id][$eq]=${id}`
  );

const getImg = ({ attributes }) => {
  const url = attributes.img.data.attributes.url;
  return `https://sigma-l1x8.onrender.com${url}`;
};
const getUser = (id) => api.get(`/api/users/${id}`);

// Put
const putArmarioUser = async (idUser, idRopas) => {
  try {
    const response = await api.put(`/api/users/${idUser}`, {
      armario: idRopas,
    });
    if (response.status === 200) {
      console.log(`Armario actualizada con éxito`);
    } else {
      console.error(`Error al actualizar la puntuación`);
    }
  } catch (error) {
    console.error("Error al enviar la solicitud de actualización:", error);
  }
};

const putPuntuacion = async (conjuntoId, nuevaPuntuacion) => {
  try {
    const response = await api.put(`/api/conjuntos/${conjuntoId}`, {
      data: {
        puntaje: nuevaPuntuacion,
      },
    });
    if (response.status === 200) {
      console.log(`Puntuación actualizada con éxito`);
    } else {
      console.error(`Error al actualizar la puntuación`);
    }
  } catch (error) {
    console.error("Error al enviar la solicitud de actualización:", error);
  }
};
const putFavorite = async (conjuntoId, userId) => {
  try {
    const response = await api.put(`/api/conjuntos/${conjuntoId}`, {
      data: {
        favorite: userId,
      },
    });
    if (response.status === 200) {
      console.log(`favorite actualizada con éxito`);
    } else {
      console.error(`Error al actualizar la puntuación`);
    }
  } catch (error) {
    console.error("Error al enviar la solicitud de actualización:", error);
  }
};
const putTipoConjunto = async (conjuntoId) => {
  try {
    const response = await api.put(`/api/conjuntos/${conjuntoId}`, {
      data: {
        tipoConjunto: "admin",
      },
    });
    if (response.status === 200) {
      console.log(`conjunto actualizada con éxito`);
    } else {
      console.error(`Error al actualizar el tipo de conjunto`);
    }
  } catch (error) {
    console.error("Error al enviar la solicitud de actualización:", error);
  }
};

export default {
  getRopas,
  getImg,
  getDetalle,
  postUser,
  postUserLogin,
  putPuntuacion,
  postConjunto,
  getDetalleUnico,
  getDetalleComunidad,
  getUser,
  getDetalleAdmin,
  putFavorite,
  getDetalleFavorite,
  putTipoConjunto,
  putArmarioUser,
  getRopasUser,
};
