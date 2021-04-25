import { Document } from 'mongoose';

export default interface IBoard extends Document {
  imageUrl: String;
  boardVersion: String;
  date: Date;
}
