import MainLayout from "@/components/layouts/MainLayout";
import React from "react";

const patientData = {
  hospital_ID: "H12345",
  name: "John Doe",
  phone_number: 1234567890,
  next_Delivery_Date: new Date("2023-12-01"),
  location: "123 Main St, Cityville"
};

const page = () => {
  return (
    <MainLayout patientData={patientData}>
      <div className="max-w-7xl mx-auto" />
    </MainLayout>
  );
};

export default page;
