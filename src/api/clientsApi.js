import axios from "axios";
import "../axios";

export const addClient = async (form) => {
  let data = await axios.post("/clients/register", form);
  return data;
};

export const getAllClients = async () => {
  let data = await axios.get("/clients");
  return data;
};

export const updateClient = async (id, form) => {
  let data = await axios.patch(`/clients/${id}`, form);
  return data;
};

export const getClientInfo = async (id) => {
  let data = await axios.get(`/clients/${id}`);
  return data;
};
export const deleteClient = async (id) => {
  let data = await axios.delete(`/clients/${id}`);
  return data;
};

export const sendContactMail = async (form) => {
  let data = await axios.post("clients/send-mail", form);
  return data;
};

export const forgotPassword = async (form) => {
  let data = await axios.post("clients/forgotpassword", form);
  return data;
};

export const resetPassword = async (token, form) => {
  let data = await axios.post(`clients/resetpassword/${token}`, form);
  return data;
};
