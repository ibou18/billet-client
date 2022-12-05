import React from "react";
export default function Loader() {
  return (
    <div className="relative bg-gray-100  sm:py-2  mt-20">
      <div className="mx-auto max-w-md px-2 sm:max-w-xl sm:px-3 lg:px-8 lg:max-w-4xl">
        <div
          className="flex flex-wrap  justify-center"
          style={{ maxWidth: 800, justifyContent: "center" }}
        >
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-16 h-16 border-4 border-yellow-600 border-double rounded-full animate-spin"
          ></div>
        </div>
      </div>
    </div>
  );
}
