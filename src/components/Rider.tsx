import { Rider } from '../types';

interface RiderListProps {
  riders: Rider[];
  selectedType: 'all' | 'yaba_riders' | 'unassigned_riders' | 'assigned_riders';
  selectedRider: string | null;
  onRiderSelect: (riderId: string) => void;
}

const RiderList: React.FC<RiderListProps> = ({ 
  riders, 
  selectedType, 
  selectedRider,
  onRiderSelect 
}) => {
  const filteredRiders = riders.filter((rider) => 
    selectedType === 'all' ? true : rider.type === selectedType
  );

  return (
    <div className="space-y-4 max-h-[50vh] overflow-y-auto">
      {filteredRiders.map((rider) => (
        <div
          key={rider.id}
          className="flex items-center p-4 border rounded-lg hover:border-blue-500 transition-colors"
        >
          <input
            type="radio"
            name="rider"
            className="w-4 h-4 mr-4"
            checked={selectedRider === rider.id}
            onChange={() => onRiderSelect(rider.id)}
          />
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Dispatch Rider's Name</p>
                <p className="font-medium">{rider.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Area</p>
                <p className="font-medium">{rider.area}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Number of Deliveries</p>
                <p className="font-medium">{rider.deliveries} Deliveries</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiderList;