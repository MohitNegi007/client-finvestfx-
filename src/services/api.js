import axios from "axios";

const serverURl = "https://server-finvest.onrender.com/";
// const serverURl = "http://localhost:8080/";

export const getDishes = async () => {
  return await axios.get(`${serverURl}`);
};
