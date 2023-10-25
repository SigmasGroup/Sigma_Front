import { create } from "apisauce";
import { API_KEY, API_URL } from "../config";

const api = create({
  baseURL: `http://10.40.3.31:1337/api`,
  headers: {
    "X-API-Key": `7c85af58da64fc6c26666845a95087a4101205479b02db5ea3b8c8fdd4060aafc88d6d003f9ca9b28bd139d893d806b64ed6f4354d69b28ed51a1d7ce34d1e76876a98849958098354daa34b08c4bef69f467705a1e02f4ef28ca5238287b8580a911810eb3aa1398973695c55ddc6122de23a55e092104682dd9c2ffa0a9db3`,
  },
});

const getRopas = () => api.get("/ropas");

export default { getRopas };
