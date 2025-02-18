"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback
} from "react";
import { useRouter } from "next/navigation";

interface PatientInfo {
  hospitalId: string;
  patientName: string;
  phoneNumber: string;
  nextDeliveryDate: string;
  location: string;
  status: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  deliveryAddress?: string;
}

interface PatientContextType {
  patientInfo: PatientInfo | null;
  selectedPatient: PatientInfo | null;
  isLoading: boolean;
  error: Error | null;
  updatePatientInfo: (info: PatientInfo) => void;
  handleViewPatient: (patient: PatientInfo) => void;
  clearSelectedPatient: () => void;
}

const defaultContextValue: PatientContextType = {
  patientInfo: null,
  selectedPatient: null,
  isLoading: false,
  error: null,
  updatePatientInfo: () => {},
  handleViewPatient: () => {},
  clearSelectedPatient: () => {}
};

const PatientContext = createContext<PatientContextType>(defaultContextValue);

export function PatientProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [
    selectedPatient,
    setSelectedPatient
  ] = useState<PatientInfo | null>(() => {
    // Only run this on client side
    if (typeof window !== "undefined") {
      const storedPatient = localStorage.getItem("selectedPatient");
      return storedPatient ? JSON.parse(storedPatient) : null;
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleViewPatient = useCallback(
    async (patient: PatientInfo) => {
      console.log("Helloooo");

      try {
        setSelectedPatient(patient);
        router.push("/patients/view-patient");
      } catch (err) {
        console.error("Error in handleViewPatient:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const updatePatientInfo = useCallback((info: PatientInfo) => {
    setPatientInfo(info);
  }, []);

  const clearSelectedPatient = useCallback(() => {
    setSelectedPatient(null);
    localStorage.removeItem("selectedPatient");
  }, []);

  // This effect is redundant since we already initialize from localStorage
  // in the useState initializer
  // useEffect(() => {
  //   try {
  //     const storedPatient = localStorage.getItem("selectedPatient");
  //     if (storedPatient) {
  //       setSelectedPatient(JSON.parse(storedPatient));
  //     }
  //   } catch (err) {
  //     setError(err as Error);
  //   }
  // }, []);

  const value = {
    patientInfo,
    selectedPatient,
    isLoading,
    error,
    updatePatientInfo,
    handleViewPatient,
    clearSelectedPatient
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
}