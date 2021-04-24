import { Document } from 'mongoose';

export default interface IBoard extends Document {
  image: Buffer;
  date: Date;
}
