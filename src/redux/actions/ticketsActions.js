import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseConfig";
import { ticketsTypes } from "../types/ticketsTypes";

const collectionName = "tickets";

export const actionGetTicketsAsync = () => {
  return async (dispatch) => {
    const ticketsCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(ticketsCollection);
    const tickets = [];
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tickets.push({
          id: doc.id,
          ...doc.data(),
        });
        //   console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(actionGetTicketsSync(tickets));
    }
  };
};

const actionGetTicketsSync = (tickets) => {
  return {
    type: ticketsTypes.GET_TICKETS,
    payload: {
      tickets: tickets,
    },
  };
};



//************************FUNCION PARA ACTUALIZAR UN TICKET***************************



export const actionUpdateTicketAsync = (ticketId, updatedData) => {
  return async (dispatch) => {
    try {
      const ticketDocRef = doc(dataBase, collectionName, ticketId);
      await updateDoc(ticketDocRef, updatedData);

      // Fetch updated tickets and dispatch synchronous action
      const updatedTickets = await fetchUpdatedTickets();
      dispatch(actionGetTicketsSync(updatedTickets));
    } catch (error) {
      console.error(error);
      // Handle error here if needed
    }
  };
};

// Synchronous function to get tickets from Firebase
const fetchUpdatedTickets = async () => {
  const ticketsCollection = collection(dataBase, collectionName);
  const querySnapshot = await getDocs(ticketsCollection);
  const tickets = [];
  querySnapshot.forEach((doc) => {
    tickets.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return tickets;
};



//************************FUNCION PARA CREAR UN TICKET***************************

export const actionCreateTicketAsync = (newTicketData) => {
  return async (dispatch) => {
    try {
      const ticketsCollection = collection(dataBase, collectionName);
      const ticketId = newTicketData.ticketNumber; // Use your desired ticket number here
      const ticketDocRef = doc(ticketsCollection, ticketId);

      // Remove 'id' from newTicketData, if it was there
      const { id, ...ticketData } = newTicketData;

      // Set the data of the ticket using setDoc
      await setDoc(ticketDocRef, ticketData);

      // Dispatch synchronous action
      dispatch(actionCreateTicketSync(newTicketData));
      
      console.log('Ticket created:', newTicketData);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };
};


export const actionCreateTicketSync = (newTicket) => {
  return {
    type: ticketsTypes.CREATE_TICKETS,
    payload: {
      tickets: newTicket,
    },
  };
};





//************************FUNCION PARA AGREGAR UNA ORDEN***************************

// export const actionAddOrderAsync = (orders) => {
//   return async (dispatch) => {
//     try {
//       const ordersCollection = collection(dataBase, collectionName);
//       const docs = await addDoc(ordersCollection, orders);
//       const docId = docs.id; 
//       dispatch(actionAddOrderSync({ id: docs.id, ...orders }));
//       localStorage.setItem('orderId', JSON.stringify(docId)); 
//     } catch (error) {
//       console.log(error);
//       dispatch(actionAddOrderSync({}));
//     }
//   };
// };

// const actionAddOrderSync = (orders) => {
//   return {
//     type: ordersTypes.ADD_ORDER,
//     payload: orders,
//   };
// };

//************************FUNCION PARA FILTRAR LAS ORDENES***************************

// export const actionFilterOrdersAsync = (searchParam, searchValue) => {
//   return async (dispatch) => {
//     const ordersCollection = collection(dataBase, collectionName);
//     const q = query(ordersCollection, where(searchParam, "==", searchValue));
//     const orders = [];
//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         orders.push({
//           id: doc.id,
//           ...doc.data(),
//         });
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       dispatch(actionFilterOrdersSync(orders));
//     }
//   };
// };



// const actionFilterOrdersSync = (orders) => {
//   return {
//     type: ordersTypes.ORDERS_FILTERED,
//     payload: {
//       orders: orders,
//     },
//   };
// };


// export const actionFilterAsync = (searchParam) => {
//   return async (dispatch) => {
//     const ordersCollection = collection(dataBase, collectionName);
//     const querySnapshot = await getDocs(ordersCollection);
//     const orders = [];
//     try {
//       querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         orders.push({
//           id: doc.id,
//           ...doc.data(),
//         });
//         //   console.log(doc.id, " => ", doc.data());
//       });
  
//       const filterdOrders = orders.filter((item) =>
//         item.name.toLowerCase().includes(searchParam.toLowerCase())
//       );
//       dispatch(actionFilterOrdersSync(filterdOrders));
//     } catch (error) {
//       console.error(error);
//       dispatch(actionFilterOrdersSync([]));
//     }
//   };
// };