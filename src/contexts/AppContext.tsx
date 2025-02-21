"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { Patient, Rider } from '@/types';
import { defaultPatients } from "@/data/patients";
import { riders as defaultRiders } from '@/data/riders';



interface AppContextType {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  createPatient: (patient: Omit<Patient, 'id'>) => void;
  updatePatient: (patient: Patient) => void;
  clearSelectedPatient: () => void;

  riders: Rider[];
  selectedRider: Rider | null;
  setSelectedRider: (rider: Rider | null) => void;
  createRider: (rider: Omit<Rider, 'id'>) => void;
  updateRider: (rider: Rider) => void;
  clearSelectedRider: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [riders, setRiders] = useState<Rider[]>([]);
    const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  
      const initializePatients = () => {
        const storedPatients = localStorage.getItem('patients');
        if (!storedPatients) {
          const initialPatients = [{ ...defaultPatients, id: '1' }];
          localStorage.setItem('patients', JSON.stringify(initialPatients));
          setPatients(initialPatients);
        } else {
          setPatients(JSON.parse(storedPatients));
        }
    }
    const createPatient = (newPatient: Omit<Patient, 'id'>) => {
      const updatedPatients = [...patients, { ...newPatient, id: Date.now().toString() }];
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
    };
  
    const updatePatient = (updatedPatient: Patient) => {
      const updatedPatients = patients.map(patient => 
        patient.id === updatedPatient.id ? updatedPatient : patient
      );
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      
      if (selectedPatient?.id === updatedPatient.id) {
        setSelectedPatient(updatedPatient);
        localStorage.setItem('selectedPatient', JSON.stringify(updatedPatient));
      }
    };
  
    const handleSetSelectedPatient = (patient: Patient | null) => {
      setSelectedPatient(patient);
      localStorage.setItem('selectedPatient', JSON.stringify(patient));
    };
  
    const clearSelectedPatient = () => {
      setSelectedPatient(null);
      localStorage.setItem('selectedPatient', JSON.stringify(null));
    };
  
    const initializeRiders = () => {
        const storedRiders = localStorage.getItem('riders');
      if (!storedRiders) {
        localStorage.setItem('riders', JSON.stringify(defaultRiders));
        setRiders(defaultRiders);
      } else {
        setRiders(JSON.parse(storedRiders));
      }

     }
    
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

    const initializeSelectedData = () => {
        const storedSelectedPatient = localStorage.getItem('selectedPatient');
      if (storedSelectedPatient) {
        setSelectedPatient(JSON.parse(storedSelectedPatient));
      }

      const storedSelectedRider = localStorage.getItem('selectedRider');
      if (storedSelectedRider) {
        setSelectedRider(JSON.parse(storedSelectedRider));
      }

    }
   useEffect(() => {
    if (!isInitialized) {
      initializePatients()

        initializeRiders()
        
        initializeSelectedData()
        
      setIsInitialized(true);
    }
   }, [isInitialized]);
    
    const value = {
      patients,
      selectedPatient,
      setSelectedPatient: handleSetSelectedPatient,
      createPatient,
      updatePatient,
      clearSelectedPatient,
  
      riders,
      selectedRider,
      setSelectedRider: handleSetSelectedRider,
      createRider,
      updateRider,
      clearSelectedRider,
    };
  
    if (!isInitialized) {
      return null;
    }
  
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  }
  
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

