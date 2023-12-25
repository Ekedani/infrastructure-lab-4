import React, { useState, useEffect } from "react";
import * as TicketService from "./TicketService";

type Ticket = {
  id: string;
  title: string;
};

const TicketsComponent = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    TicketService.getAllTickets()
      .then((response: any) => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
        setError(error.message || "Failed to load tickets.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsComponent;
