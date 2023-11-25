import axios from "axios";

const URL = process.env.REACT_APP_URL

export const updateStatusReserved = async (ticketId, ticketNumberToUpdate) => {
  try {
    const response = await axios.put(`https://${URL}/tickets/${ticketId}`, ticketNumberToUpdate);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
