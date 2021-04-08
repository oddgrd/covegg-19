import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface board {
  type: Schema.Types.ObjectId;
}
export interface IUser extends Document {
  name: string;
  given_name: string;
  email: string;
  avatar_url?: string;
  boards: Array<board>;
  _id: ObjectId;
  date: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  given_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Board'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

export const User: Model<IUser> = model('User', UserSchema);
