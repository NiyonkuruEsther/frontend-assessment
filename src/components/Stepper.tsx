import { FaCircleCheck } from "react-icons/fa6";
import { Step } from "../types";

interface StepperProps {
  currentStep: number;
  steps: Step[];
  onStepChange: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, onStepChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      {steps.map(step =>
        <div
          key={step.id}
          className={`flex items-center ${step.isClickable
            ? "cursor-pointer"
            : "cursor-not-allowed"}`}
          onClick={() => step.isClickable && onStepChange(step.id)}
        >
          {step.isComplete
            ? <FaCircleCheck className="w-5 h-5 text-green-500" />
            : <div
                className={`w-5 h-5 rounded-full border-2 ${step.isActive
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"}`}
              >
                {step.isActive &&
                  <div className="w-2 h-2 bg-white rounded-full m-auto mt-1" />}
              </div>}
          <span
            className={`ml-2 ${step.isActive
              ? "text-blue-500"
              : step.isComplete ? "text-green-500" : "text-gray-500"}`}
          >
            {step.title}
          </span>
        </div>
      )}
    </div>
  );
};

export default Stepper;
