import axios from "axios";
import "../axios";

export const addEvent = async (form) => {
  let data = await axios.post("/events", form);
  return data;
};

export const getAllEvents = async () => {
  let data = await axios.get("/events");
  return data;
};

export const updateEvent = async (id, form) => {
  let data = await axios.patch(`/events/${id}`, form);
  return data;
};

export const getEventInfo = async (id) => {
  let data = await axios.get(`/events/${id}`);
  return data;
};
export const deleteEvent = async (id) => {
  let data = await axios.delete(`/events/${id}`);
  return data;
};

export const sendContactMail = async (form) => {
  let data = await axios.post("events/send-mail", form);
  return data;
};
