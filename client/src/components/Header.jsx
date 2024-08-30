import React from "react";

export default function Header({ heading, subheading }) {
  return (
    <div className="pt-20 w-full flex justify-between gap-2 items-start">
      <div className="flex-1 border flex flex-col gap-4">
        <h1 className="text-5xl font-extrabold">{heading}</h1>
        <div className="text-sm text-purple-600 font-medium">breadcrumbs</div>
        <p className="text-md text-gray-500 max-w-xl">{subheading}</p>
      </div>

      <div></div>
    </div>
  );
}
