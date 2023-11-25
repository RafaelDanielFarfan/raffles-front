import { ticketsTypes } from "../types/ticketsTypes";


const initialState = {
  tickets: [],
};

export const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ticketsTypes.GET_TICKETS:
      return {
        ...state,
        tickets: action.payload.tickets,
      };
      case ticketsTypes.UPDATE_TICKET:
        const updatedTickets = state.tickets.map(ticket =>
          ticket.id === action.payload.id ? { ...ticket, ...action.payload } : ticket
        );
        return {
          ...state,
          tickets: updatedTickets,
        };
        case ticketsTypes.CREATE_TICKETS:
            return {
              ...state,
              tickets: [...state.tickets, action.payload.ticket],
            };
    default:
      return state;
  }
};