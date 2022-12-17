import React from "react";
import { useLocation, useParams } from "react-router-dom";
import LayoutContent from "./shared/LayoutContent";

const About = () => {
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

export default About;
