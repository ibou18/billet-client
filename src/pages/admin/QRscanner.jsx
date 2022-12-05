import React, { useState } from "react";
import QrScan from "react-qr-reader";
import { qrCodeDatas } from "./mockDatas";
import QRcode from "qrcode.react";
import { useEffect } from "react";
import { getAllEvents } from "../../api/eventsApi";

import moment from "moment";
import "moment/locale/fr";

function QRscanner() {
  const [qrscan, setQrscan] = useState("No result");
  const [startQr, setStartQr] = useState();
  const [message, setMessage] = useState({
    mess: "",
    status: "",
  });

  const [datas, setDatas] = useState();

  const [arrayEventsTitle, setarrayEventsTitle] = useState();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetail, setEventDetail] = useState([]);

  const getDatas = async () => {
    await getAllEvents()
      .then((response) => {
        setDatas(response.data);
        console.log("datas", datas);

        if (response) {
          let temp = [];

          response.data.forEach((element) => {
            temp.push({
              id: element._id,
              name: element.title,
              active: true,
            });
          });
          setarrayEventsTitle(temp);
          setStartQr(response.data[0].qrCode);
        }
      })
      .catch((err) => console.log("err", err));
  };

  const handleScan = (data) => {
    if (data) {
      let dataExist = startQr.some((value) => {
        return value.code == data;
      });

      if (dataExist) {
        console.log("startQr****", startQr);

        const newArr = startQr.map((object) => {
          if (object.code === data && object.status === true) {
            setMessage({
              mess: `⛔️ Désolé le code ${data} a djà été scanné`,
              status: "failed",
            });
          } else if (object.code === data && object.status === false) {
            setMessage({
              mess: ` ✅ ${data} - is Ok`,
              status: "success",
            });
            return {
              ...object,
              status: true,
              scanDate: moment(Date.now()).format("DD MM YYYY hh:mm:ss"),
            };
          }
          return object;
        });
        setStartQr(newArr);
        console.log("newArr", newArr);
        console.log("startQr", startQr);
      }

      setQrscan(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
    console.log("e", e.target.value);

    let index = datas.find((el) => el.title === e.target.value);
    console.log("index", index);
    setEventDetail(index);
    setStartQr(index.qrCode);
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div className="m-5  ">
      <span>QR Scanner</span>
      <div>
        {" "}
        {qrscan !== "No result" ? qrscan : <p> En attente du scan</p>}{" "}
      </div>

      <div className="mt-2 w-3/6">
        <select
          id="location"
          name="location"
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={handleChange}
        >
          {arrayEventsTitle?.map((opt) => (
            <option> {opt.name}</option>
          ))}
        </select>
      </div>

      <center>
        <div style={{ marginTop: 30 }}>
          <QrScan
            delay={500}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 240, width: 320 }}
            facingMode="environment"
          />
        </div>
      </center>
      <div className="container mx-auto">
        <p
          className={`bg-${
            message.status === "success" ? "green" : "red"
          }-500 text-white px-5 text-center text-lg mt-36 rounded-lg w-3/5 mb-5 shadow-md shadow-${
            message.status === "success" ? "green" : "red"
          }-500/40 `}
        >
          {message.mess}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center place-items-center ">
        {startQr &&
          startQr.map((qr) => (
            <div
              className="bg-slate-200 border-4 border-gray-200 rounded-xl  "
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
  );
}

export default QRscanner;
