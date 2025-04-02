export interface VehicleModel {
    _id: string;
    model: string;
    brand: string;
    licensePlate: string;
    year: number;
    fuelType: string;
    userId: string;
    createdAt: string;
    updatedAt: Date;
    __v: number;
}

export interface VehicleFromAppointmentClient {
    _id: string,
    model: string,
    brand: string
}

