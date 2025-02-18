import { PatientInfoProps } from "@/components/PatientInfo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function usePatientStorage() {
  const [storedPatient, setStoredPatient] = useState<PatientInfoProps | null>(
    null
  );
  const router = useRouter();

  const savePatient = (patient: PatientInfoProps) => {
    localStorage.setItem("selectedPatient", JSON.stringify(patient));
  };

  const handleViewPatient = (patient: PatientInfoProps) => {
    savePatient(patient);
    router.push(`/patients/view-patient`);
  };

  const getPatient = () => {
    const stored = localStorage.getItem("selectedPatient");
    if (stored) {
      return JSON.parse(stored) as PatientInfoProps;
    }
    return null;
  };

  const clearPatient = () => {
    localStorage.removeItem("selectedPatient");
    setStoredPatient(null);
  };

  useEffect(() => {
    const patient = getPatient();
    setStoredPatient(patient);
  }, []);

  return {
    patient: storedPatient,
    savePatient,
    clearPatient,
    getPatient,
    handleViewPatient
  };
}
