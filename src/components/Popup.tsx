"use client";
import React from "react";
import Button from "./Button";

interface PopupProps {
  title: string;
  package_number: number;
  owner_name: string;
}

const Popup: React.FC<PopupProps> = ({ title, package_number, owner_name }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center w-screen bg-black bg-opacity-50">
      <div className="bg-white px-[53px] py-8 min-w-[456px] w-fit divide-y divide-gray-200 border border-red-200">
        <h1 className="font-bold text-[20px] text-center pb-8">
          Assign Package {package_number}
        </h1>
        <p className="text-[16px] py-10">
          Are you sure want to assign package <b>{package_number}</b> to {" "}
          <b>{owner_name}</b>
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <Button
            variant="outlined"
            onClick={() => alert("Outlined Button Clicked!")}
          >
            No, Go Back
          </Button>
          <Button variant="blue" onClick={() => alert("Blue Button Clicked!")}>
            Yes, assign package
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
