import { Document, ObjectId } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  googleId: string;
  _id: ObjectId;
  date: Date;
}
