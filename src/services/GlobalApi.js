import { create } from "apisauce";
import { API_KEY, API_URL } from "../config";

const api = create({
  baseURL: `http://sigma-l1x8.onrender.com/api`,
  headers: {
    "X-API-Key": `e1ec7a1e07dde524eaf045738767a03571313b6f1fd28e4e9d885f3a288131bd677b8260bca0422d2b0992aa2aac1f888de03b0174ba97ea295334abf03600c50d19044fbb581c35056815154953b4ad073819f3f7d0cd37622284e3004909117795b1e3d7e804095ebfc73918932fb50ee030f9e8fe711aa29e2ea3e336b468`,
  },
});

const getRopas = () => api.get("/ropas");

export default { getRopas };
