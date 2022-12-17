import React from "react";
import LayoutContent from "./shared/LayoutContent";
import { useParams, useLocation } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  const params = useParams();

  return (
    <LayoutContent>
      <div className="">
        <div className="text-orange-500 text-6xl text-center font-thin ">
          <span className="font-extralight italic text-9xl text-blue-500 ">
            B
          </span>
          ientôt ...
          <p>{location.pathname}</p>
        </div>
      </div>
    </LayoutContent>
  );
};

export default Contact;
