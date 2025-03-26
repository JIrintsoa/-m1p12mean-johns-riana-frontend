export interface InterventionModel {
    _id: string;
    name: string;
    appointmentId: {
      _id: string;
      clientId: string;
      vehicleId: string;
      serviceTypeId: string;
      date: string; // ISO 8601 date string
      description: string;
      status: string;
      score: null; // Peut être null selon l'exemple
      createdAt: string; // ISO 8601 date string
      updatedAt: string; // ISO 8601 date string
      __v: number;
    };
    cost: number;
    status: string;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    __v: number;
  }