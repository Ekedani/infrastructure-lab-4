import axios from "axios";

const API_URL = "http://localhost:3000/viewers";

export const createViewer = (data: any) => axios.post(`${API_URL}`, data);
export const getAllViewers = () => axios.get(`${API_URL}`);
export const getViewer = (id: any) => axios.get(`${API_URL}/${id}`);
export const updateViewer = (id: any, data: any) =>
  axios.patch(`${API_URL}/${id}`, data);
export const deleteViewer = (id: any) => axios.delete(`${API_URL}/${id}`);
