import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  EyeIcon,
  TrashIcon,
  PencilAltIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import Loader from "../../components/shared/Loader";
import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../api/usersApi";
import {
  isAuthenticated,
  selectCurrentUser,
} from "../../redux/store/authStore";
import { useSelector } from "react-redux";

import photo from "../../assets/user1.png";
import photo1 from "../../assets/entre2.png";

export default function ClientPage() {
  const currentUser = useSelector(selectCurrentUser);
  // console.log("user", currentUser);
  const [clients, setClients] = useState([]);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    tel: "",
    id: false,
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await getAllUsers();
    setClients(data.data.users);
    console.log(data.data.users);
    setLoading(false);
  };

  function updateField(item, value) {
    setForm({
      ...form,
      [item]: value,
    });
  }

  const onSubmit = async () => {
    setOpen(false);
    setLoading(true);
    if (form.id) {
      await updateUser(form.id, form);
    } else {
      console.log("TES 1");
      await addUser(form);
    }
    getData();
    setMessage(" Client crée avec succès");
    setOpen1(true);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      postalCode: "",
      city: "",
      tel: "",
      isProfessional: false,
      isEntreprise: false,
    });
  };

  const onDelete = async () => {
    setOpen2(false);
    setLoading(true);
    await deleteUser(id);
    setMessage("Client supprimer avec succès");
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="mb-3 text-2xl font-semibold text-gray-900">
          Liste des admins
        </h1>
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="mt3 mb-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ajouter un utilisateur
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {clients.length === 0 ? (
            <h2 className="text-center mt-10 mb-8 text-lg leading-6 font-medium text-gray-900">
              Pas d'admin en cours
            </h2>
          ) : (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nom et Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Addresse
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Tél.
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {clients.map((client) => (
                          <tr key={client._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-15 w-15 rounded-full"
                                    src={client.isEntreprise ? photo1 : photo}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {client.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {client.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {client.address}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {client.tel}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {client.postalCode}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {currentUser._id === client._id ? null : (
                                <button
                                  type="button"
                                  className="inline-flex items-center p-1.5 border border-red rounded-full shadow-sm text-white bg-red-600 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  onClick={() => {
                                    setId(client._id);
                                    setOpen2(true);
                                  }}
                                >
                                  <TrashIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </button>
                              )}
                              <button
                                type="button"
                                className="inline-flex items-center p-1.5 border border-red rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => {
                                  setForm({
                                    id: client._id,
                                    firstName: client.firstName,
                                    lastName: client.lastName,
                                    email: client.email,
                                    address: client.address,
                                    tel: client.tel,
                                    city: client.city,
                                    postalCode: client.postalCode,
                                  });
                                  setOpen(true);
                                }}
                              >
                                <PencilAltIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                              {/* <button
                                type="button"
                                className="inline-flex items-center p-1.5 border border-red rounded-full shadow-sm text-white bg-violet-600 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                onClick={() => {
                                  setOpen3(true);
                                }}
                              >
                                <EyeIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center leading-6 font-medium text-gray-900"
                    >
                      Ajouter un utilisateur
                    </Dialog.Title>

                    <div className="mt-3 w-full border-t border-gray-400"></div>
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      {/* FirstName */}
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Prénom
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="firstName"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.firstName}
                            onChange={(e) => {
                              updateField("firstName", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {/* LastName */}

                      <div className="">
                        <label
                          htmlFor="lastName"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Nom
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="lastName"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.lastName}
                            onChange={(e) => {
                              updateField("lastName", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="last-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="email"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.email}
                            onChange={(e) => {
                              updateField("email", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Tél.
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="tel"
                            type="number"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.tel}
                            onChange={(e) => {
                              updateField("tel", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Adresse */}
                    <div className=" w-full mt-3">
                      <label
                        htmlFor=""
                        className="text-left block text-sm font-medium text-gray-700"
                      >
                        Adresse
                      </label>
                      <div className="mt-1">
                        <input
                          id="nom"
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                          value={form.address}
                          onChange={(e) => {
                            updateField("address", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex gap-4">
                      {/* code Postal */}
                      <div className=" w-1/4 mt-1">
                        <label
                          htmlFor=""
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Code Postal
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.postalCode}
                            onChange={(e) => {
                              updateField("postalCode", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {/* Ville */}
                      <div className=" w-3/4 mt-1">
                        <label
                          htmlFor=""
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Ville
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.city}
                            onChange={(e) => {
                              updateField("city", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-hovers focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={() => onSubmit()}
                  >
                    Valider
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={open1} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen1}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Succès
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      setOpen1(false);
                      window.location.reload();
                    }}
                  >
                    ok
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={open2} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen2}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {message.title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message.message}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpen2(false);
                      onDelete();
                    }}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen2(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={open3} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen3}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center leading-6 font-medium text-gray-900"
                    >
                      Inform
                    </Dialog.Title>
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Nom complet
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="name"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.name}
                            onChange={(e) => {
                              updateField("name", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="email"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="email"
                            id="first-name"
                            value={form.email}
                            className="shadow-sm focus:ring-current focus:border-current block w-full sm:text-sm border-gray-700 rounded-md"
                            onChange={(e) => {
                              updateField("email", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Ville
                        </label>
                        <div className="mt-1">
                          <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            value={form.city}
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            onChange={(e) => {
                              updateField("city", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Adresse
                        </label>
                        <div className="mt-1">
                          <input
                            id="address"
                            name="address"
                            type="text"
                            required
                            value={form.address}
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            onChange={(e) => {
                              updateField("address", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Telephone
                        </label>
                        <div className="mt-1">
                          <input
                            id="tel"
                            name="tel"
                            type="text"
                            required
                            value={form.tel}
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            onChange={(e) => {
                              updateField("tel", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="postalCode"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Code postal
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            value={form.postalCode}
                            className="shadow-sm focus:ring-current focus:border-current block w-full sm:text-sm border-gray-700 rounded-md"
                            onChange={(e) => {
                              updateField("postalCode", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center h-5">
                          <input
                            onChange={(e) => {
                              updateField("isEntreprise", e.target.checked);
                            }}
                            id="comments"
                            name="comments"
                            type="checkbox"
                            value={form.isEntreprise}
                            className="mt-9 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-8 text-sm">
                          <label
                            htmlFor="comments"
                            className=" ext-left  font-medium text-gray-700"
                          >
                            Une entreprise ?
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 w-full border-t border-gray-400"></div>
                    <p className="block text-indigo-700">Chef de projet </p>
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Nom chef de projet
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="nomChef"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.nomChef}
                            onChange={(e) => {
                              updateField("nomChef", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="emailChef"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.emailChef}
                            onChange={(e) => {
                              updateField("emailChef", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Tel
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="tel"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.tel}
                            onChange={(e) => {
                              updateField("tel", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Poste
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="posteChef"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.posteChef}
                            onChange={(e) => {
                              updateField("posteChef", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 w-full border-t border-gray-400"></div>
                    <p className="block text-indigo-700">Comptable</p>
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Nom complet
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="nomCompta"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.nomCompta}
                            onChange={(e) => {
                              updateField("nomCompta", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="emailCompta"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.emailCompta}
                            onChange={(e) => {
                              updateField("emailCompta", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Tel
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="tel"
                            type="tel"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.tel}
                            onChange={(e) => {
                              updateField("telCompta", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="first-name"
                          className="text-left block text-sm font-medium text-gray-700"
                        >
                          Poste
                        </label>
                        <div className="mt-1">
                          <input
                            id="nom"
                            name="posteCompta"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-current focus:border-current sm:text-sm"
                            value={form.posteCompta}
                            onChange={(e) => {
                              updateField("posteCompta", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-hovers focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                    // onClick={() => onSubmit()}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen3(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
