import axios from "axios";

const URL = process.env.REACT_APP_URL

const endpointTickets = "tickets";

// export const getTickets = async () => {
//   try {
//     const response = await fetch(`https://ec2-3-89-2-101.compute-1.amazonaws.com:443/tickets`);
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       return data;
//     } else {
//       console.log("Error response:", response);
//       return [];
//     }
//   } catch (error) {
//     console.log("Fetch error:", error);
//     return [];
//   }
// };


// const endpointTickets = "tickets";

// export const getTickets = async () => {
//     try {
//         const { data } = await axios.get(`https://ec2-3-89-2-101.compute-1.amazonaws.com:443/tickets`);
//         console.log(data)
//        // console.log(`${URL}`/`${endpointTickets}`)
//         return data;

//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// }
// console.log(URL);
export const getTickets = async () => {
  try {
      const config = {
          headers: {
              'Access-Control-Allow-Origin': '*', // Puede que no sea necesario
          }
      };

      const { data } = await axios.get(`https://ec2-3-89-2-101.compute-1.amazonaws.com/tickets`, config);
      console.log(data);
      return data;
  } catch (error) {
      console.log(error);
      return [];
  }
};
