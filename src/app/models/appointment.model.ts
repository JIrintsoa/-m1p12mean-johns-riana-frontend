import { ServiceType } from "./service.model";

export interface AppointmentModel {
  _id: string;
  clientId: {
      _id: string,
      name: string
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