import { Document, ObjectId } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  email: string;
  googleId: string;
  _id: ObjectId;
  date: Date;
}
