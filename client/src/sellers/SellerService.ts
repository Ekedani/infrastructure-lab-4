import axios from "axios";

const API_URL = "http://localhost:8000/sellers";

export const createSeller = (data: any) => axios.post(`${API_URL}`, data);
export const getAllSellers = () => axios.get(`${API_URL}`);
export const getSeller = (id: any) => axios.get(`${API_URL}/${id}`);
export const updateSeller = (id: any, data: any) =>
  axios.patch(`${API_URL}/${id}`, data);
export const deleteSeller = (id: any) => axios.delete(`${API_URL}/${id}`);
