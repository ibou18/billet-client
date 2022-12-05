import React, { useState } from "react";

import QRcode from "qrcode.react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { generateString } from "../../utils/randonString";
import { qrCodeDatas } from "./mockDatas";

function QRgenerator() {
  const [qr, setQr] = useState("Xjdie125");
  const [genQr, setGenQr] = useState([]);

  const handleChange = (event) => {
    setQr(event.target.value);
  };

  const startGenerate = () => {
    let length = 10;
    let array = [];
    for (let i = 0; i < length; i++) {
      array.push(generateString(8));
      setGenQr(array);
    }
    console.log("array", array);
    console.log("genQr", genQr);
  };

  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "myqr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="container w-full">
      <div className="text-center mt-2">QR Generator</div>

      <div className="flex justify-center m-3">
        <button
          onClick={startGenerate}
          className="h-10 bg-emerald-500 text-white px-4 rounded-md shadow-xl "
        >
          Generate code
        </button>
      </div>

      <div
        className="mx-auto text-center"
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label className="mb-2"> Entrer un text</label>
        <input
          className="h-10 text-center border-b-2 border-red-600  w-4/5 "
          onChange={handleChange}
          value={qr}
          label="QR content"
          size="large"
        />
      </div>

      <div>
        {qr ? (
          <div className="my-5 flex justify-center">
            <QRcode id="myqr" value={qr} size={320} includeMargin={true} />
          </div>
        ) : (
          <p>No QR code preview</p>
        )}
      </div>
      <div>
        {qr ? (
          <div className="container mx-auto text-center">
            <div>
              <textarea
                className="text-center w-4/5  border-b-2 border-blue-500"
                style={{ fontSize: 18, height: 100 }}
                rows={4}
                defaultValue={qr}
                readOnly
              />
            </div>
            <div>
              <div style={{ marginLeft: 10 }} className="">
                <span className="text-blue-500 "> Download Qrcodes</span>
                <FontAwesomeIcon
                  onClick={downloadQR}
                  icon={faDownload}
                  className={`text-2xl mr-5 mt-4 text-blue-500 ml-2 hover:text-blue-600 cursor-pointer`}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center place-items-center mt-5">
        {genQr.map((qr) => (
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

export default QRgenerator;
