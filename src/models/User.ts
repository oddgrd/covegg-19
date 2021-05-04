import { model, Schema, Model } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    url: String
  },
  googleId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User: Model<IUser> = model('User', UserSchema);

export default User;
