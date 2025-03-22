import { ServiceType } from "./service.model";
import { VehicleModel } from "./vehicle.model";

export interface AppointmentModel {
  _id: string;
  clientId: {
      _id: string,
      firstName: string
      lastName: string
  };
  vehicleId: string;
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
    vehicle: VehicleModel;
    service: ServiceType;
    serviceType: string;
    mecanicien: string;
    status: string;
    progress: number;
    appointmentDate: string;
}