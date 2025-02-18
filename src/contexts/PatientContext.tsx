"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect
} from "react";
import { useRouter } from "next/navigation";
import { Patient, Rider } from "@/types";
import { riders as defaultRiders } from '@/data/riders';

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
  riders: Rider[];
  selectedRider: Rider | null;
  setSelectedRider: (rider: Rider | null) => void;
  createRider: (rider: Omit<Rider, 'id'>) => void;
  updateRider: (rider: Rider) => void;
  clearSelectedRider: () => void;
  patients: Patient[];

}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [
    selectedPatient,
    setSelectedPatient
  ] = useState<PatientInfo | null>(() => {
    if (typeof window !== "undefined") {
      const storedPatient = localStorage.getItem("selectedPatient");
      return storedPatient ? JSON.parse(storedPatient) : null;
    }
    return null;
  });

  const createPatient = (newPatient: Omit<Patient, "id">) => {
    const updatedPatients = [
      ...patients,
      { ...newPatient, id: Date.now().toString() }
    ];
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
  };

  const updatePatient = (updatedPatient: Patient) => {
    const updatedPatients = patients.map(
      patient => (patient.id === updatedPatient.id ? updatedPatient : patient)
    );
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));

    // if (selectedPatient?.id === updatedPatient.id) {
    //   setSelectedPatient(updatedPatient);
    //   localStorage.setItem('selectedPatient', JSON.stringify(updatedPatient));
    // }
  };

  const initializeRiders = () => {
    const storedRiders = localStorage.getItem("riders");
    if (!storedRiders) {
      localStorage.setItem("riders", JSON.stringify(defaultRiders));
      setRiders(defaultRiders);
    } else {
      setRiders(JSON.parse(storedRiders));
    }
  };


  const createRider = (newRider: Omit<Rider, 'id'>) => {
    const updatedRiders = [...riders, { ...newRider, id: Date.now().toString() }];
    setRiders(updatedRiders);
    localStorage.setItem('riders', JSON.stringify(updatedRiders));
  };

  const updateRider = (updatedRider: Rider) => {
    const updatedRiders = riders.map(rider => 
      rider.id === updatedRider.id ? updatedRider : rider
    );
    setRiders(updatedRiders);
    localStorage.setItem('riders', JSON.stringify(updatedRiders));
    
    if (selectedRider?.id === updatedRider.id) {
      setSelectedRider(updatedRider);
      localStorage.setItem('selectedRider', JSON.stringify(updatedRider));
    }
  };

  const handleSetSelectedRider = (rider: Rider | null) => {
    setSelectedRider(rider);
    localStorage.setItem('selectedRider', JSON.stringify(rider));
  };

  const clearSelectedRider = () => {
    setSelectedRider(null);
    localStorage.setItem('selectedRider', JSON.stringify(null));
  };


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

  useEffect(() => {

    try {
      const storedPatient = localStorage.getItem("selectedPatient");
      if (storedPatient) {
        setSelectedPatient(JSON.parse(storedPatient));
      }
    } catch (err) {
      setError(err as Error);
    }
  }, []);


   const value = {
    patientInfo,
    selectedPatient,
    isLoading,
    error,
    updatePatientInfo,
    handleViewPatient,
    clearSelectedPatient,
    riders,
    selectedRider,
    createPatient,
    updatePatient,
    patients,
    setSelectedRider: handleSetSelectedRider,
    createRider,
    updateRider,
    clearSelectedRider,
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
