import {
  faCalendar,
  faCity,
  faDollar,
  faEnvelope,
  faImage,
  faLocation,
  faMap,
  faPhoneFlip,
  faSchoolCircleExclamation,
  faSquarePollVertical,
  faTicket,
  faUsersBetweenLines,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ListboxSelect from "./shared/ListboxSelect";

const FormEvent = ({
  save,
  handleChange,
  dataSelectedCategorie,
  selectedCategorie,
  setSelectedCategorie,
  dataSelectedCurrency,
  selectedCurrency,
  setSelectedCurrency,
  mode,
  dataFromBack,
}) => {
  console.log("mode ==>", mode);

  return (
    <div>
      <div className="px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* titre */}
          <div className="col-span-2 lg:col-span-1 ">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Titre :
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faTicket}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("title", e.target.value)}
                type="text"
                name="title"
                id="title"
                className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                // placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Catégorie */}
          <div className="col-span-2 lg:col-span-1 ">
            <label
              htmlFor="categorie"
              className="block text-sm font-medium text-gray-700"
            >
              Catégorie
            </label>
            <ListboxSelect
              data={dataSelectedCategorie}
              selected={selectedCategorie}
              setSelected={setSelectedCategorie}
            />
          </div>

          {/* Email */}
          <div className="col-span-2 lg:col-span-1 ">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("email", e.target.value)}
                type="email"
                name="email"
                id="email"
                className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1 ">
            <label
              htmlFor="tel"
              className="block text-sm font-medium text-gray-700"
            >
              Tél. :
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faPhoneFlip}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("tel", e.target.value)}
                type="tel"
                name="tel"
                id="tel"
                className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="border-b my-4 col-span-2 " />

          {/* Description */}
          <div className="col-span-2 ">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description :
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </div> */}
              <textarea
                onChange={(e) => handleChange("description", e.target.value)}
                name="description"
                id="description"
                rows={4}
                className="block pl-5 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="la description de votre évenement, en quoi cela consiste"
              />
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-1 col-span-2 ">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Lien Image :
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faImage}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("image", e.target.value)}
                type="url"
                name="image"
                id="image"
                className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Video */}
          <div className="lg:col-span-1 col-span-2 ">
            <label
              htmlFor="videoLink"
              className="block text-sm font-medium text-gray-700"
            >
              Lien Vidéo :
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faVideo}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("videoLink", e.target.value)}
                type="url"
                name="videoLink"
                id="videoLink"
                className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Facebook Link */}
          <div className="lg:col-span-1 col-span-2 ">
            <label
              htmlFor="facebookLink"
              className="block text-sm font-medium text-gray-700"
            >
              Lien Facebook de l'évènement :
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faSquarePollVertical}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("facebookLink", e.target.value)}
                type="url"
                name="facebookLink"
                id="facebookLink"
                className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Website Link */}
          <div className="lg:col-span-1 col-span-2 ">
            <label
              htmlFor="webSiteLink"
              className="block text-sm font-medium text-gray-700"
            >
              Lien site internet :
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faSchoolCircleExclamation}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("webSiteLink", e.target.value)}
                type="url"
                name="webSiteLink"
                id="webSiteLink"
                className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="border-b my-4 col-span-2 " />

          {/* Adresse */}
          <div className="col-span-2  ">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Adresse
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faLocation}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("address", e.target.value)}
                type="text"
                name="address"
                id="address"
                className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Code postal city Country  */}
          <div className="col-span-2 ">
            <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
              {/* Code postal */}
              <div className=" lg:col-span-1 ">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Code Postal
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon
                      icon={faLocation}
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* City */}
              <div className="lg:col-span-1 ">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ville
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon
                      icon={faCity}
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    onChange={(e) => handleChange("city", e.target.value)}
                    type="text"
                    name="city"
                    id="city"
                    className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="lg:col-span-1 ">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pays
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon
                      icon={faMap}
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    onChange={(e) => handleChange("country", e.target.value)}
                    type="text"
                    name="country"
                    id="country"
                    className="block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b my-4 col-span-2 " />

          {/* Date start */}
          <div className="col-span-2 lg:col-span-1 ">
            <label
              htmlFor="startedDate"
              className="block text-sm font-medium text-gray-700"
            >
              Date Début
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("startedDate", e.target.value)}
                type="datetime-local"
                name="startedDate"
                id="startedDate"
                className="pr-5 block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Date fin */}
          <div className="col-span-2 lg:col-span-1 ">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              Date de fin
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={(e) => handleChange("endDate", e.target.value)}
                type="datetime-local"
                name="endDate"
                id="endDate"
                className=" pr-5 block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="col-span-2 ">
            <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
              {/* Prix */}
              <div className="lg:col-span-1 ">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prix
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon
                      icon={faDollar}
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    onChange={(e) => handleChange("price", e.target.value)}
                    type="number"
                    name="price"
                    id="price"
                    className=" pr-5 block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Place disponible */}
              <div className="lg:col-span-1 ">
                <label
                  htmlFor="seatAvailable"
                  className="block text-sm font-medium text-gray-700"
                >
                  Place Maximum
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon
                      icon={faUsersBetweenLines}
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    onChange={(e) =>
                      handleChange("seatAvailable", e.target.value)
                    }
                    type="number"
                    name="seatAvailable"
                    id="seatAvailable"
                    className=" pr-5 block h-10 w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Currency */}
              <div className="lg:col-span-1 ">
                <label
                  htmlFor="categorie"
                  className="block text-sm font-medium text-gray-700"
                >
                  Monnaie
                </label>
                <ListboxSelect
                  data={dataSelectedCurrency}
                  selected={selectedCurrency}
                  selectedCurrency={setSelectedCurrency}
                />
              </div>
            </div>
          </div>
        </div>

        {/* button Save */}
        <div className="mt-5">
          <button
            className="bg-teal-500 text-white p-2 rounded-lg shadow-lg shadow-teal-500/50 "
            onClick={save}
          >
            Créer L'Évènement
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormEvent;
