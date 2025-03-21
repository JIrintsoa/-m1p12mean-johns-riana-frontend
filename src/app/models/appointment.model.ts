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