import React, { useState, useEffect } from "react";
import * as TicketService from "./TicketService";
import "./TicketsStyle.css";

interface Ticket {
  id: string;
  title: string;
}

const TicketsComponent = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    TicketService.getAllTickets()
      .then((response) => {
        setTickets(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An error occurred while fetching tickets");
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    TicketService.deleteTicket(id)
      .then(() => {
        setTickets(tickets.filter((ticket) => ticket.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (id: string) => {
    const updatedTitle = prompt("Enter new title for the ticket");
    if (updatedTitle) {
      TicketService.updateTicket(id, { title: updatedTitle })
        .then(() => {
          setTickets(
            tickets.map((ticket) =>
              ticket.id === id ? { ...ticket, title: updatedTitle } : ticket
            )
          );
        })
        .catch((error) => console.error(error));
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="tickets-container">
      <h2 className="tickets-title">Tickets</h2>
      <ul className="tickets-list">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <span className="ticket-title">{ticket.title}</span>
            <div className="ticket-actions">
              <button
                className="update-button"
                onClick={() => handleUpdate(ticket.id)}
              >
                Update
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(ticket.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsComponent;
