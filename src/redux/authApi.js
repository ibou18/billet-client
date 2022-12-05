import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data }) => {
    axios.defaults.withCredentials = true;
    const user = localStorage.getItem("user");
    // if (user) {
    //   axios.defaults.headers["x-access-token"] = JSON.parse(user).token;
    // }
    axios.defaults.headers["Content-type"] = "application/json";
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.REACT_APP_API}/api`,
  }),
  endpoints: () => ({}),
  reducerPath: "api",
});
