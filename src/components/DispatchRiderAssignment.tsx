"use client";
import { useState } from 'react';
import Stepper from '../components/Stepper';
import { Step, RiderType } from '../types';
import RiderList from './Rider';
import { riders } from '@/data/riders';
import SetDrugCycle from './SetDrugCycleProps';
import { ScanPackage } from './ScanPackage';
import Button from './shared/Button';

const initialSteps: Step[] = [
  { 
    id: 1, 
    title: 'Set Drug Cycle/Length', 
    isComplete: false, 
    isActive: true,
    isClickable: true 
  },
  { 
    id: 2, 
    title: 'Assign Dispatch Rider', 
    isComplete: false, 
    isActive: false,
    isClickable: false 
  },
  { 
    id: 3, 
    title: 'Scan Package', 
    isComplete: false, 
    isActive: false,
    isClickable: false 
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [selectedType, setSelectedType] = useState<RiderType>("all");
  const [selectedRider, setSelectedRider] = useState<string | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<'same' | 'new' | null>(null);


  const getButtonState = () => {
    switch (currentStep) {
      case 1:
        return {
          disabled: !selectedCycle,
          className: selectedCycle 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        };
      case 2:
        return {
          disabled: !selectedRider,
          className: selectedRider 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        };
      default:
        return {
          disabled: false,
          className: 'bg-blue-500 text-white hover:bg-blue-600'
        };
    }
  };

  
  const buttonState = getButtonState();



  const handleStepChange = (step: number) => {
    const targetStep = steps.find(s => s.id === step);
    if (targetStep?.isClickable) {
      setCurrentStep(step);
    }
  };

  const handleRiderSelect = (riderId: string) => {
    setSelectedRider(riderId);
    };

    const handleRiderNext = () => {
      if (currentStep === 2 && selectedRider) {
        setSteps(prevSteps => 
          prevSteps.map(step => {
            if (step.id === 2) {
              return { ...step, isComplete: true, isActive: false };
            }
            if (step.id === 3) {
              return { ...step, isActive: true, isClickable: true };
            }
            return step;
          })
        );
        setCurrentStep(3);
      }
    };

    const handleDrugCycleNext = () => {
      setSteps(prevSteps =>
        prevSteps.map(step => {
          if (step.id === 1) {
            return { ...step, isComplete: true, isActive: false };
          }
          if (step.id === 2) {
            return { ...step, isActive: true, isClickable: true };
          }
          return step;
        })
      );
      setCurrentStep(2);
    };

    const handleNext = () => {
      if (currentStep === 1) {
        handleDrugCycleNext();
      } else if (currentStep === 2 && selectedRider) {
        handleRiderNext();
      }
    };

  const riderCounts = {
    all: riders.length,
    yaba: riders.filter(r => r.type === 'yaba_riders').length,
    unassigned: riders.filter(r => r.type === 'unassigned_riders').length,
    assigned: riders.filter(r => r.type === 'assigned_riders').length,
  };

  return (
    <div className="p-6 bg-white max-h-[70vh]">
      <Stepper
        currentStep={currentStep}
        steps={steps}
        onStepChange={handleStepChange}
      />

{currentStep === 1 && (
        <SetDrugCycle
          patientName="Oluwaseun Aregbesola"
          initialDeliveryDate={new Date('2024-02-04')}
          selectedCycle={selectedCycle}
          onCycleSelect={setSelectedCycle}
        />
      )}

{currentStep === 2 && (
        <div className='border-t border-[#CFCFCF] pt-[20px] max-h-[50vh] overflow-hidden'>
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded ${
                selectedType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedType('all')}
            >
              All ({riderCounts.all})
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedType === 'yaba_riders' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedType('yaba_riders')}
            >
              Yaba Riders ({riderCounts.yaba})
            </button>

            <button
              className={`px-4 py-2 rounded ${
                selectedType === 'unassigned_riders' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedType('unassigned_riders')}
            >
              Unassigned Riders ({riderCounts.unassigned})
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedType === 'assigned_riders' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedType('assigned_riders')}
            >
              Assigned Riders ({riderCounts.assigned})
            </button>
          </div>
          <RiderList 
            riders={riders} 
            selectedType={selectedType}
            selectedRider={selectedRider}
            onRiderSelect={handleRiderSelect}
          />
        </div>
      )}

{currentStep === 3 && (
        <ScanPackage patientName="Oluwaseun Aregbesola" />
      )}

      {currentStep === 3 && 
      <div className="flex justify-between bg-white shadow-inner pt-6">
          <Button
          variant='outlined' 
            onClick={() => handleStepChange(currentStep - 1)}
          >
            Back
          </Button>
           
          <Button 
          variant='filled' 
          disabled={true}
          onClick={() => {/* Handle package assignment */}}
          >
            Assign Package
          </Button>
        
        </div>}
    

     {currentStep !== 3 && <div className="flex justify-end bg-white shadow-inner pt-6">
        <button 
          className={`px-6 py-2 rounded transition-colors ${buttonState.className}`}
          disabled={buttonState.disabled}
          onClick={handleNext}
        >
          Next
        </button>
      </div>}
    </div>
  );
}