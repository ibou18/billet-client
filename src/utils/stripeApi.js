import axios from "axios";

export const postStripe = async (form) => {
  let data = await axios.post(
    `${process.env.REACT_APP_API}/api/stripes/create-checkout-session`,
    form
  );
  return data;
};
