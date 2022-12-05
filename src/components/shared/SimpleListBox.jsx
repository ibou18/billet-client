import { useState } from "react";

export default function SimpleListBox({ title, data, setSelectedEvent }) {
  console.log("DDD", data);

  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="mt-2">
      <label
        htmlFor="location"
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <select
        id="location"
        name="location"
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        onChange={handleChange}
      >
        {data?.map((opt) => (
          <option> {opt.name} </option>
        ))}
      </select>
    </div>
  );
}
