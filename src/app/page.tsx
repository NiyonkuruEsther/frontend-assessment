// ExampleComponent.tsx or App.tsx
import DispatchRiderAssignment from "@/components/DispatchRiderAssignment";
import PatientInfo from "@/components/PatientInfo";
import React from "react";
import Login from "./auth/Login";

const App: React.FC = () => {  

  return (
    <div>
      {/* <PatientInfo patientData={patientData} /> */}
      {/* <DispatchRiderAssignment /> */}
      <Login />
    </div>
  );
};

export default App;
