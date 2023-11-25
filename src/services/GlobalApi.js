import { create } from "apisauce";
import { API_KEY, API_URL } from "../config";

const api = create({
  baseURL: `http://sigma-l1x8.onrender.com`,
  headers: {
    "X-API-Key": `e1ec7a1e07dde524eaf045738767a03571313b6f1fd28e4e9d885f3a288131bd677b8260bca0422d2b0992aa2aac1f888de03b0174ba97ea295334abf03600c50d19044fbb581c35056815154953b4ad073819f3f7d0cd37622284e3004909117795b1e3d7e804095ebfc73918932fb50ee030f9e8fe711aa29e2ea3e336b468`,
  },
});

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

const getRopas = () => api.get("/api/ropas?populate");
const getDetalle = () =>
  api.get("api/conjuntos?populate[ropas][populate][img][fields]=url");
const getImg = ({ attributes }) => {
  const { url } = attributes.img.data.attributes;
  return `http://sigma-l1x8.onrender.com${url}`;
};
const putPuntuacion = async (conjuntoId, nuevaPuntuacion) => {
  try {
    const response = await api.put(`/api/conjuntos/${conjuntoId}`, {
      data: {
        puntuacion: nuevaPuntuacion,
      },
    });
    if (response.ok) {
      console.log(`Puntuación actualizada con éxito`);
    } else {
      console.error(`Error al actualizar la puntuación`);
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
};
