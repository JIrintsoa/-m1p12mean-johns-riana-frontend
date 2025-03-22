import { ServiceType } from "./service.model";
import { VehicleModel } from "./vehicle.model";

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