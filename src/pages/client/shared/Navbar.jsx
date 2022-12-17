import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { ClientNavigation } from "../../../utils/constants/navigations";
import logo_couleur from "../../../assets/logo/logo_white.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = () => {
  return (
    <header>
      <Popover className="relative bg-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Your Company</span>
              <img
                className="h-12 w-auto sm:h-16"
                src={logo_couleur}
                alt="QTickets"
              />
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open menu</span>
              {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            {/* <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      )}
                    >
                      <span>Solutions</span>
                    </Popover.Button>
                  </>
                )}
              </Popover> */}

            {ClientNavigation.map((client) => (
              <Link
                to={client.href}
                className="flex text-base font-medium text-white hover:text-yellow-400 hover:underline-offset-2 hover:underline"
              >
                <span className="items-center rounded-md bg-white bg-opacity-0 mr-2">
                  <client.icon
                    className="h-6 w-6 text-blue"
                    aria-hidden="true"
                  />
                </span>
                {client.name}
              </Link>
            ))}
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <Link
              to="#"
              className="ml-5 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-red-700 hover:to-yellow-700"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="ml-3 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-blue-700"
            >
              Créer un compte
            </Link>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-12 w-auto sm:h-10"
                      src={logo_couleur}
                      alt="QTickets"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Close menu</span>
                      {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-10 px-5">
                <div className="grid grid-cols-1 text-center gap-5">
                  {ClientNavigation.map((client) => (
                    <Link
                      to={client.href}
                      className="flex text-base font-medium text-white hover:text-yellow-300"
                    >
                      <span className="items-center rounded-md bg-white bg-opacity-0 mr-3">
                        <client.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      {client.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    to="/login"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-blue-700 border-white"
                  >
                    Connexion
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-white">
                    Pas de compte ?
                    <Link
                      to="/register"
                      className="text-yellow-400 ml-2 underline underline-offset-4  decoration-yellow-300 decoration-slice  decoration-2 "
                    >
                      Créer un compte
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
};

export default Navbar;
