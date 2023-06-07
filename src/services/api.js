import axios from "axios";

const serverURl = "http://localhost:8080";

export const getDishes = async () => {
  return await axios.get(`${serverURl}`);
};
