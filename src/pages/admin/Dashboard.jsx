import React from "react";

import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import TitleComponent from "../../shared/TitleComponent";

const datas = [
  {
    id: 0,
    title: " A venir",
    qty: 5,
    description: " Donnée en cours de tous les évènements",
  },
  {
    id: 1,
    title: " Terminé",
    qty: 197,
    description: " Donnée Terminé de tous les évènements",
  },
  {
    id: 2,
    title: " Annuler",
    qty: 12,
    description: " Donnée Annuler de tous les évènements",
  },
];

export default function Dashboard() {
  return (
    <div>
      <TitleComponent
        title="Dashboard"
        icon={faChartBar}
        color={"text-blue-700"}
      />
      <div className=" px-8">
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Card  */}
          {datas.map((data) => (
            <div
              key={data.id}
              className="w-full shadow-lg py-3 px-3 rounded-lg border-b-4 border-blue-400 pb-8 "
            >
              <div className="text-2xl flex justify-evenly relative items-end">
                <div className="text-5xl font-black "> {data.qty} </div>
                <div className="mt-0">
                  <div className="  text-blue-700">Évènements</div>
                  <div className="  text-teal-600 text-right font-bold">
                    {data.title}
                  </div>
                </div>
              </div>
              {/* <div className="mt-4 font-light text-center bg-orange-500 rounded-full text-white">
              {" "}
              Voir détail, ...
            </div> */}
            </div>
          ))}
        </div>

        <div className="lg:w-3/5 w-full shadow-lg py-3 px-3 rounded-lg border-b-4 border-orange-400 pb-8 mt-5">
          <div className="text-2xl flex justify-evenly relative items-end">
            <div className="mt-0">
              <div className="  text-orange-700 mt-4">Évènements à venir</div>

              <div className="  text-gray-700 text-left font-light cursor-pointer">
                <span className="font-light text-gray-700">
                  12.12.2022 18:00{" "}
                </span>
                : Tournoi de Foot nocturne
              </div>
              <div className="  text-gray-700 text-left font-light cursor-pointer">
                <span className="font-light text-gray-700">
                  12.01.2023 18:00{" "}
                </span>
                : Tournoi de pêche
              </div>
              <div className="  text-gray-700 text-left font-light cursor-pointer">
                <span className="font-light text-gray-700">
                  22.01.2023 12:00{" "}
                </span>
                : Projection film
              </div>
              <div className="  text-gray-700 text-left font-light cursor-pointer">
                <span className="font-light text-gray-700">
                  03.02.2022 20:00{" "}
                </span>
                : Excursion VTT 2 heures
              </div>
            </div>
          </div>
          {/* <div className="mt-4 font-light text-center bg-orange-500 rounded-full text-white">
              {" "}
              Voir détail, ...
            </div> */}
        </div>
      </div>
    </div>
  );
}
