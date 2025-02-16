// components/SetDrugCycle.tsx
interface SetDrugCycleProps {
  patientName: string;
  initialDeliveryDate: Date;
  selectedCycle: 'same' | 'new' | null;
  onCycleSelect: (cycle: 'same' | 'new') => void;
}

const SetDrugCycle: React.FC<SetDrugCycleProps> = ({
  patientName,
  initialDeliveryDate,
  selectedCycle,
  onCycleSelect
}) => {
  // Calculate next delivery date (1 month from initial date)
  const nextDeliveryDate = new Date(initialDeliveryDate);
  nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + 1);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <p className="text-gray-700 text-lg">
          {patientName} has a drug cycle of two(2) months
        </p>
      </div>

      <div className="space-y-4">
        <div className={`border rounded-lg p-4 transition-colors ${
          selectedCycle === 'same' ? 'border-blue-500' : 'hover:border-blue-500'
        }`}>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="cycleType"
              checked={selectedCycle === 'same'}
              onChange={() => onCycleSelect('same')}
              className="w-4 h-4 text-blue-500"
            />
            <div className="flex-1">
              <p className="font-medium mb-2">Same as initial drug cycle</p>
              <p className="text-gray-600">
                Deliver drug on{' '}
                <span className="font-medium">
                  {initialDeliveryDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>{' '}
                & set next delivery date to{' '}
                <span className="font-medium">
                  {nextDeliveryDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </p>
            </div>
          </label>
        </div>

        <div className={`border rounded-lg p-4 transition-colors ${
          selectedCycle === 'new' ? 'border-blue-500' : 'hover:border-blue-500'
        }`}>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="cycleType"
              checked={selectedCycle === 'new'}
              onChange={() => onCycleSelect('new')}
              className="w-4 h-4 text-blue-500"
            />
            <span className="font-medium">Set new drug cycle</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SetDrugCycle;