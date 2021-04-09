import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  givenName: string;
  email: string;
  googleId: string;
  avatarUrl?: string;
  date: Date;
}
