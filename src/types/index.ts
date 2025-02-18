import { PatientInfoProps } from "@/components/PatientInfo";

// types/index.ts
export type Step = {
  id: number;
  title: string;
  isComplete: boolean;
  isActive: boolean;
  isClickable: boolean;
};

// types/index.ts
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
