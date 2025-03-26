import { ServiceType } from "./service.model";
import { User } from "./user.model";
import { VehicleModel } from "./vehicle.model";

export interface AppointmentModel {
  _id: string;
  clientId: {
      _id: string,
      firstName: string
      lastName: string
  };
  vehicleId: string;
  mechanicId: {
    _id: string,
    firstName: string,
    lastName: string,
  };
  serviceTypeId: {
    _id: string,
    name: string
  };
  date: string;
  formattedDate: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v:number
}

export interface AppointmentListe {
    _id: string;
    clientId: string;
    vehicleId: {
      _id: string;
      model: string;
      brand: string;
    };
    serviceTypeId: ServiceType;
    date: string;
    description: string;
    status: string;
    score: number;
    mechanicId: {
      _id: string;
      firstName: string;
      lastName: string
    };
    createdAt: string;
    updatedAt: string;
    
}

export interface AppointmentFilter {
  vehicle?: string;
  serviceTypeId: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface AppointmentFilterMechanic {
  search?: string | null;
  serviceTypeId?: string | null;
  status?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface AppointmentDetail {
  _id: string;
  clientId: User;
  vehicleId: VehicleModel;
  serviceTypeId: ServiceType;
  date: string;
  description: string;
  status: string;
  score: number | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AppointmentDetailResponse {
  message: string;
  items?: {
    appointmentDetail?: AppointmentDetail;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interventionDetail?: any[]; // Définissez une interface si vous avez la structure
    totalCost?: number;
    progress?: number;
  };
}

