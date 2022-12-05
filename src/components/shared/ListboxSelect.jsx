import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronCircleDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

// const data = [
//   { id: 1, name: "Wade Cooper", active: true },
//   { id: 2, name: "Arlene Mccoy", active: false },
//   { id: 3, name: "Devon Webb", active: false },
//   { id: 4, name: "Tom Cook", active: true },
//   { id: 5, name: "Tanya Fox", active: false },
//   { id: 6, name: "Hellen Schmidt", active: true },
//   { id: 7, name: "Caroline Schultz", active: true },
//   { id: 8, name: "Mason Heaney", active: false },
//   { id: 9, name: "Claudie Smitham", active: true },
//   { id: 10, name: "Emil Schaefer", active: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListboxSelect({ data, selected, setSelected }) {
  //   console.log("selected", selected);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label> */}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span
                  aria-label={selected.active ? "active" : "Offline"}
                  className={classNames(
                    selected.active ? "bg-green-400" : "bg-gray-200",
                    "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                  )}
                />

                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <FontAwesomeIcon icon={faChevronDown} />

                {/* <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((list) => (
                  <Listbox.Option
                    key={list.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={list}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              list.active ? "bg-green-400" : "bg-gray-200",
                              "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {list.name}
                            <span className="sr-only">
                              {" "}
                              is {list.active ? "active" : "offline"}
                            </span>
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
