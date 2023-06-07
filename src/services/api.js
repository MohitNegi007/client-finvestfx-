import axios from "axios";

const serverURl = "https://server-finvest.onrender.com/";

export const getDishes = async () => {
  return await axios.get(`${serverURl}`);
};
