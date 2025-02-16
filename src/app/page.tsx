// ExampleComponent.tsx or App.tsx
import DispatchRiderAssignment from "@/components/DispatchRiderAssignment";
import PatientInfo from "@/components/PatientInfo";
import React from "react";
import Login from "./auth/Login";

const App: React.FC = () => {
  // Define the patient data
  const patientData = {
    hospital_ID: "H12345",
    name: "John Doe",
    phone_number: 1234567890,
    next_Delivery_Date: new Date("2023-12-01"),
    location: "123 Main St, Cityville"
  };

  return (
    <div>
      {/* <PatientInfo patientData={patientData} /> */}
      {/* <DispatchRiderAssignment /> */}
      <Login />
    </div>
  );
};

export default App;
