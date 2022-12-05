import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteEvent, getEventInfo } from "../../api/eventsApi";
import QRcode from "qrcode.react";

import moment from "moment";
import "moment/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFileEdit,
  faSave,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@headlessui/react";
import ModalComponent from "../../shared/ModalComponent";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EventDetailPage = () => {
  let history = useHistory();
  let { id } = useParams();
  const [enabled, setEnabled] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [mode, setMode] = useState(null);

  const [data, setData] = useState({
    title: "",
    category: "",
    email: "",
    description: "",
    tel: "",
    price: "",
    image: "",
    address: "",
    postalcode: "",
    city: "",
    country: "",
    startedDate: "",
    endDate: "",
    facebookLink: "",
    videoLink: "",
    webSiteLink: "",
    qrCode: "",
    mapEvent: "",
    seatAvailable: "",
    currency: "",
  });

  const getEvent = async () => {
    await getEventInfo(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("err", err));
  };
  console.log("data", data);

  const onValide = async () => {
    await deleteEvent(id)
      .then(() => {
        history.location.pathname("/admin/events");
      })
      .catch((err) => console.log(err));
    console.log("delete");
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      {!data ? (
        <p> ... Loading, </p>
      ) : (
        <>
          <div className=" grid lg:grid-cols-3 mt-5 lg:ml-52 w-3/5 mx-auto md:grid-rows-3 gap-2 ">
            <Link
              className="flex items-center justify-start w-52 px-5 py-2 bg-blue-500 shadow-lg shadow-blue-400/50 text-white rounded-lg "
              to={"/admin/events"}
              onClick={() => {
                setOpenDelete(true);
              }}
            >
              <FontAwesomeIcon icon={faEye} className="h-4 p-1 mr-5" />
              <span className=""> Listes Events</span>
            </Link>
            <button
              className="flex items-center justify-start w-52 px-5 py-2 bg-orange-500 shadow-lg shadow-orange-400/50 text-white rounded-lg"
              onClick={() => {
                setOpenDelete(true);
              }}
            >
              <FontAwesomeIcon icon={faFileEdit} className="h-4 p-1 mr-5" />
              Modifier
            </button>
            <button
              className="flex items-center justify-start w-52 px-5 py-2 bg-red-500 shadow-lg shadow-red-400/50 text-white rounded-lg"
              onClick={() => {
                setOpenDelete(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} className="h-4 p-1 mr-5" />
              Supprimer
            </button>
          </div>

          <div
            className="border-2 rounded-lg border-steal-600 shadow-lg relative sm:w-5/6 lg:w-3/4 mx-auto pb-8"
            key={data._id}
          >
            <div className="bg-teal-500 text-white text-center flex items-center justify-center rounded-t-lg w-full mb-3 py-2">
              Catégorie : {data.category}
            </div>
            <div className=" grid lg:grid-cols-2  gap-2">
              <div className="col-span-2 lg:col-span-1">
                <img
                  src={data.image}
                  alt=""
                  className="h-48 mx-auto mb-2 rounded-xl shadow-lg"
                />
              </div>
              <div className="col-span-2 lg:col-span-1 mx-auto">
                {data.videoLink ? (
                  <>
                    {/* <iframe
                      width="360"
                      height="200"
                      src={data.videoLink}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe> */}
                    <video
                      src={data.videoLink}
                      width="320"
                      height="300"
                      controls
                    ></video>
                  </>
                ) : null}
              </div>
            </div>
            <div className="p-5 text-justify text-sm grid gap-1 ">
              <div className="text-center">
                <div className="text-center text-2xl mb-2 "> {data.title} </div>
                <div>
                  <p className="italic">
                    Du :{moment(data.startedDate).format("DD-MM-YYYY hh:mm:ss")}
                  </p>
                  <p className="italic">
                    Fin: {moment(data.endDate).format("DD-MM-YYYY hh:mm:ss")}
                  </p>
                </div>
              </div>
              <div> {data.description} </div>

              <div>
                Lieux : {data.address}, {data?.postalCode} {data.city}
              </div>
              <div>Tél.: {data.tel}</div>
              <div>Mail: {data.email}</div>
              <div>
                Prix : {data.price} {data.currency}
              </div>
              <div>
                Nombre de Place en Vente :
                <span className=" "> {data.seatAvailable}</span>
              </div>

              <div>
                Nombre de Place restant :
                <span
                  className={`${
                    data.seatAvailable - data.qrCode.length === 0
                      ? "text-red-500 text-lg"
                      : "text-gray-900 text-lg"
                  }`}
                >
                  {data.seatAvailable - data.qrCode.length}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Affichage du QrCode */}
      <div className="grid grid-cols-2 ">
        <div className="flex items-center justify-center  mt-5">
          <p className="mr-4"> Voir les {data.qrCode.length} QrCodes</p>
          {data.qrCode.length === 0 || undefined ? (
            <p> Aucun Qr Code de Générer </p>
          ) : (
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={classNames(
                enabled ? "bg-blue-600" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classNames(
                  enabled ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          )}
        </div>

        {/* Affichage Formulaire update */}
        {mode === null ? (
          <button
            className="flex items-center justify-start w-52 px-5 py-2 mt-5 bg-orange-500 shadow-lg shadow-orange-400/50 text-white rounded-lg"
            onClick={() => {
              setMode("update");
            }}
          >
            <FontAwesomeIcon icon={faFileEdit} className="h-4 p-1 mr-5" />
            Enregistrer
          </button>
        ) : (
          <button
            className="flex items-center justify-start w-52 px-5 py-2 mt-5 bg-green-500 shadow-lg shadow-green-400/50 text-white rounded-lg"
            onClick={() => {
              setMode(null);
            }}
          >
            <FontAwesomeIcon icon={faSave} className="h-4 p-1 mr-5" />
            Modifier
          </button>
        )}
      </div>

      <div id="qrCode">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center place-items-center mt-5 ">
          {data.qrCode.length > 0 &&
            enabled &&
            data.qrCode.map((qr) => (
              <div
                className="bg-slate-200 border-4 border-gray-200 rounded-xl   "
                key={qr.code}
              >
                <div className="">
                  <QRcode
                    id="myqr"
                    value={qr.code}
                    size={180}
                    includeMargin={true}
                  />
                </div>
                {qr.status === true ? (
                  <div className=" bg-green-500 rounded-lg text-white text-sm p-1">
                    <p> {qr.code}</p> <p> Passed </p>
                  </div>
                ) : (
                  <div className=" bg-red-500 rounded-lg text-white text-sm p-1">
                    <p> {qr.code}</p> <p> Non Passed</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <div id="modal-Delete">
        <ModalComponent
          title={"Suppression de l'Evenement"}
          message={"Es-tu sûre de vouloir supprimer cet évenement ? "}
          open={openDelete}
          setOpen={setOpenDelete}
          onValide={onValide}
        />
      </div>
    </div>
  );
};

export default EventDetailPage;
