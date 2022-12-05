import axios from "axios";
import "../axios";

export const addUser = async (form) => {
  let data = await axios.post("/users/register", form);
  return data;
};

export const getAllUsers = async () => {
  let data = await axios.get("/users");
  return data;
};

export const updateUser = async (id, form) => {
  let data = await axios.patch(`/users/${id}`, form);
  return data;
};

export const getUserInfo = async (id) => {
  let data = await axios.get(`/users/${id}`);
  return data;
};
export const deleteUser = async (id) => {
  let data = await axios.delete(`/users/${id}`);
  return data;
};

export const sendContactMail = async (form) => {
  let data = await axios.post("users/send-mail", form);
  return data;
};

export const forgotPassword = async (form) => {
  let data = await axios.post("users/forgotpassword", form);
  return data;
};

export const resetPassword = async (token, form) => {
  let data = await axios.post(`users/resetpassword/${token}`, form);
  return data;
};
