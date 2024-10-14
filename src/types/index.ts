export interface Message {
  id?: string;
  senderId?: string;
  receiverId: string;
  content: string;
  createdAt?: string;
}

export interface Student {
  id: string;
  email: string;
  role: string;
  profile: Profile;
}

export interface Profile {
  firstName: string;
  lastName: string;
}
