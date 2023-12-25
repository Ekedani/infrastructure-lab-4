import axios from "axios";

const API_URL = "http://localhost:80/tickets";

export const createTicket = (data: any) => axios.post(`${API_URL}`, data);
export const getAllTickets = () => axios.get(`${API_URL}`);
export const getTicket = (id: any) => axios.get(`${API_URL}/${id}`);
export const updateTicket = (id: any, data: any) =>
  axios.patch(`${API_URL}/${id}`, data);
export const deleteTicket = (id: any) => axios.delete(`${API_URL}/${id}`);
