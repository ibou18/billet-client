import React, { useEffect, useState } from "react";
import TitleComponent from "../../shared/TitleComponent";
import {
  faEdit,
  faEye,
  faFileEdit,
  faPassport,
  faQrcode,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ModalComponent from "../../shared/ModalComponent";

import { deleteEvent, getAllEvents } from "../../api/eventsApi";
import { Link } from "react-router-dom";

import moment from "moment";
import "moment/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventPage = () => {
  const [datas, setDatas] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [idSelected, setIdSelected] = useState();
  const [loading, setLoading] = useState(false);

  const getDatas = async () => {
    await getAllEvents()
      .then((response) => {
        setDatas(response.data);
        console.log("response", response.data);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    getDatas();
  }, []);

  const onValide = async () => {
    await deleteEvent(idSelected)
      .then((res) => {
        getDatas();
        console.log(res);
      })
      .catch((err) => console.log(err));
    console.log("delete");
  };

  return (
    <div>
      <TitleComponent
        title="Events"
        icon={faPassport}
        color={"text-orange-600"}
      />

      <div className="px-10">
        <div>
          <Link
            className="px-2 bg-orange-600 text-white py-2 rounded-lg shadow-md shadow-gray-400 text-base"
            to={"/admin/add-event"}
          >
            Créer un Evénement
          </Link>
        </div>
        <div className="my-5 ">Liste des Evènements</div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-2">
          {!datas
            ? null
            : datas.map((data) => (
                <div
                  className="p-2 border-2 rounded-lg border-steal-600 shadow-lg relative"
                  key={data._id}
                >
                  <div className=" absolute right-1 grid grid-rows-3 gap-1">
                    <Link
                      className=" px-2 py-1 bg-teal-500 shadow-lg shadow-teal-400/50 text-white rounded-lg "
                      to={`/admin/event-detail/${data._id}`}
                    >
                      <FontAwesomeIcon icon={faEye} className="h-4 p-1" />
                    </Link>
                    <button
                      className=" px-2 py-1 bg-orange-500 shadow-lg shadow-orange-400/50 text-white rounded-lg"
                      onClick={() => {
                        setIdSelected(data._id);
                        setOpenDelete(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faFileEdit} className="h-4 p-1" />
                    </button>
                    <button
                      className=" px-2 py-1 bg-red-500 shadow-lg shadow-red-400/50 text-white rounded-lg"
                      onClick={() => {
                        setIdSelected(data._id);
                        setOpenDelete(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="h-4 p-1" />
                    </button>
                  </div>
                  <img
                    src={data.image}
                    alt=""
                    className="h-48 mx-auto mb-2 rounded-xl shadow-lg"
                  />
                  <div className="p-5 text-justify text-sm grid gap-1 ">
                    <div className="text-center text-lg"> {data.title} </div>
                    <div> {data.description} </div>
                    <div>
                      Début :{" "}
                      {moment(data.startedDate).format("DD MM YYYY hh:mm:ss")}{" "}
                      <p>
                        Fin:{" "}
                        {moment(data.endDate).format("DD MM YYYY hh:mm:ss")}
                      </p>
                    </div>

                    <div>
                      Lieux : {data.address}, {data?.postalCode} {data.city}
                    </div>
                    <div>Tél.: {data.tel}</div>
                    <div>Mail: {data.email}</div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <ModalComponent
        title={"Suppression de l'Evenement"}
        message={"Es-tu sûre de vouloir supprimer cet évenement ? "}
        open={openDelete}
        setOpen={setOpenDelete}
        onValide={onValide}
      />
    </div>
  );
};

export default EventPage;
