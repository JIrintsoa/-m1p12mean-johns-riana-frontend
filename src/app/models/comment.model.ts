export interface CommentModel {
  _id: string,
  userId: {
      _id: string,
      firstName: string,
      lastName: string,
      email: string,
      role: string,
      status: string
  },
  appointmentId: string,
  comment: string,
  createdAt: string,
  updatedAt: string,
}