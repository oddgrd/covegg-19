import { model, Schema, Model } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  googleId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;
