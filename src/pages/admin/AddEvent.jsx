import {
  faCalendar,
  faCity,
  faDollar,
  faEnvelope,
  faImage,
  faLocation,
  faMap,
  faPhone,
  faPhoneFlip,
  faQrcode,
  faSchoolCircleExclamation,
  faSquarePollVertical,
  faTicket,
  faUserAltSlash,
  faUsersBetweenLines,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ListboxSelect from "../../components/shared/ListboxSelect";
import { categoryList, currencyList } from "../../shared/dataUtils";
import TitleComponent from "../../shared/TitleComponent";

import { addEvent } from "../../api/eventsApi";
import { useHistory } from "react-router-dom";
import FormEvent from "../../components/FormEvent";

const AddEvent = () => {
  let history = useHistory();
  const [selectedCategorie, setSelectedCategorie] = useState(categoryList[2]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[1]);

  const [formEvent, setFormEvent] = useState({
    title: "",
    category: "",
    email: "",
    description: "",
    tel: "",
    price: "",
    image: "",
    address: "",
    city: "",
    country: "",
    startedDate: "",
    endDate: "",
    facebookLink: "",
    videoLink: "",
    webSiteLink: "",
    seatAvailable: "",
    qrCode: [],
    currency: "",
  });

  const handleChange = (items, values) => {
    setFormEvent({
      ...formEvent,
      [items]: values,
    });
  };

  console.log("selectedCurrency", selectedCurrency);

  const save = async (e) => {
    // e.preventDefault();
    console.log(formEvent);
    let formData = new FormData();
    formData.append("title", formEvent.title);
    formData.append("description", formEvent.description);
    formData.append("category", selectedCategorie.name);
    formData.append("email", formEvent.email);
    formData.append("tel", formEvent.tel);
    formData.append("image", formEvent.image);
    formData.append("address", formEvent.address);
    formData.append("city", formEvent.city);
    formData.append("country", formEvent.country);
    formData.append("startedDate", formEvent.startedDate);
    formData.append("endDate", formEvent.endDate);
    formData.append("videoLink", formEvent.videoLink);
    formData.append("facebookLink", formEvent.facebookLink);
    formData.append("websiteLink", formEvent.websiteLink);
    formData.append("seatAvailable", formEvent.seatAvailable);
    formData.append("currency", selectedCurrency.symbole);
    formData.append("price", formEvent.price);

    // if (test === 1) {
    //   formData.append("fileImage", file.name);
    //   formData.append("files", file);
    // }
    // if (test1 === 1) {
    //   formData.append("setupImage", setupImage.name);
    //   formData.append("files", setupImage);
    // }
    // const config = {
    //   headers: { "content-type": "multipart/form-data" },
    //   withCredentials: true,
    // };

    addEvent(formData)
      .then((res) => {
        console.log(res);
        history.push("/admin/events");
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className="pb-36">
      <TitleComponent
        title="Nouvel Evènement"
        icon={faQrcode}
        color={"text-blue-700"}
      />

      {/* New Forms */}
      <FormEvent
        handleChange={handleChange}
        save={save}
        dataSelectedCategorie={categoryList}
        selectedCategorie={selectedCategorie}
        setSelectedCategorie={setSelectedCategorie}
        dataSelectedCurrency={currencyList}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        mode={"addEvent"}
      />
    </div>
  );
};

export default AddEvent;
