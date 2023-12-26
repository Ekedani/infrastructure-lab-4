import React, { useState, useEffect } from "react";
import * as TicketService from "./TicketService";
import "./TicketsStyle.css";

interface Ticket {
  id?: string;
  startsAt: string;
  seat: number;
  movieTitle: string;
}

const TicketsComponent = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTicket, setNewTicket] = useState<Ticket>({
    startsAt: "",
    seat: 0,
    movieTitle: "",
  });

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

  const handleDelete = (id: string | undefined) => {
    TicketService.deleteTicket(id)
      .then(() => {
        setTickets(tickets.filter((ticket) => ticket.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (id: string | undefined) => {
    const updatedTitle = prompt("Enter new title for the ticket");
    if (updatedTitle) {
      TicketService.updateTicket(id, { title: updatedTitle })
        .then(() => {
          setTickets(
            tickets.map((ticket) =>
              ticket.id === id
                ? { ...ticket, movieTitle: updatedTitle }
                : ticket
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "seat") {
      setNewTicket({ ...newTicket, [name]: parseInt(value, 10) || 0 });
    } else {
      setNewTicket({ ...newTicket, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ tickets: [newTicket] });
    TicketService.createTicket({ tickets: [newTicket] })
      .then((response) => {
        console.log(response);
        setTickets([...tickets, response.data]);
        setNewTicket({
          startsAt: "2023-12-26T19:49:12.945Z",
          seat: 0,
          movieTitle: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="tickets-container">
      <h2 className="tickets-title">Tickets</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movieTitle"
          value={newTicket.movieTitle}
          onChange={handleInputChange}
          placeholder="Movie Title"
          required
        />
        <input
          type="datetime-local"
          name="startsAt"
          value={newTicket.startsAt}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="seat"
          value={newTicket.seat}
          onChange={handleInputChange}
          placeholder="Seat Number"
          required
        />
        <button type="submit">Add Ticket</button>
      </form>
      <ul className="tickets-list">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <span className="ticket-title">{ticket.movieTitle}</span>
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
