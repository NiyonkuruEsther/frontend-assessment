import React from "react";

export interface PatientInfoProps {
  patientData: {
    hospital_ID: string;
    name: string;
    phone_number: number;
    next_Delivery_Date: Date;
    location: string;
  };
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patientData }) => {
  // Define the keys you want to display
  const keys: (keyof PatientInfoProps["patientData"])[] = [
    "hospital_ID",
    "name",
    "phone_number",
    "next_Delivery_Date",
    "location"
  ];

  const formatKey = (key: string) => {
    return key
      .replace(/_/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(" ");
  };

  return (
    <div className="font-gilroy py-8 w-fit px-8 bg-white">
      <h1 className="font-medium pb-8 border-b text-[16px] border-gray-200">Patient Information</h1>
      <div className="w-fit text-[14px] pt-8">
        {keys.map(key =>
          <div key={key} className="p-2 grid grid-cols-2 gap-10">
            <p className="font-normal text-[#2A2A2A] text-opacity-70">
              {formatKey(key)}:
            </p>
            <p className="place-self-end font-semibold">
              {key === "next_Delivery_Date"
                ? patientData[key].toLocaleDateString()
                : patientData[key].toString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientInfo;
