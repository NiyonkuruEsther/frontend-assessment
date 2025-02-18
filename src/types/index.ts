import { PatientInfoProps } from "@/components/PatientInfo";

export type Step = {
  id: number;
  title: string;
  isComplete: boolean;
  isActive: boolean;
  isClickable: boolean;
};

export type RiderType =
  | "all"
  | "yaba_riders"
  | "unassigned_riders"
  | "assigned_riders";

export type Rider = {
  id: string;
  name: string;
  area: string;
  deliveries: number;
  type: RiderType;
};

export interface TableMeta {
  handleViewPatient: (patient: PatientInfoProps) => void;
}

export type Patient = {
  id: number;
  hospitalId: string;
  patientName: string;
  phoneNumber: string;
  nextDeliveryDate: string;
  location: string;
  status: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  deliveryAddress?: string;
  assignedRider?: string | null;
};
