export interface UserSignUp {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  signupId: string;
  signupStage: "INQUIRY" | "PRE_ACTIVATION" | "PAYMENT" | "POST_ACTIVATION";
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
  dateOfBirth: string;
  parentName?: string;
  parentEmail?: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  chessComId?: string;
  lichessId?: string;
  uscfId?: string;
  signupStatus: string;
  userRole: string;
}
