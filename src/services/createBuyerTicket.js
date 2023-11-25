import axios from "axios";
const URL = process.env.REACT_APP_URL

const endpointTickets = "buyers";

export const editTicket = async (newData) => {
  try {
    const response = await axios.post(`https://ec2-3-89-2-101.compute-1.amazonaws.com:443/buyers`, newData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
