import React from "react";

import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import TitleComponent from "../../shared/TitleComponent";

export default function Dashboard() {
  return (
    <div>
      <TitleComponent
        title="Dashboard"
        icon={faChartBar}
        color={"text-blue-700"}
      />
    </div>
  );
}
