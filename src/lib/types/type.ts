export type user_created_type = {
  name: string;
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  profile_completed: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface ProfileType {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  bio: string;
  image: string;
  dateOfBirth: Date;
  interestsTags: string[];

  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Interest {
  id: number;
  name: string;
}
