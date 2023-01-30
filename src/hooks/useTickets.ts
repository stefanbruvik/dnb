import React from "react";
import type { Ticket } from "types";

type TicketContextType = {
  tickets: Ticket[];
  setTickets: any;
};

export const TicketsContext = React.createContext<TicketContextType>({ tickets: [], setTickets: () => {} });
const useTickets = () => React.useContext(TicketsContext);

export default useTickets;
