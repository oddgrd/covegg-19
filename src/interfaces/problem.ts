import { Document, Schema } from 'mongoose';

export default interface IProblem extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  grade: string;
  setBy: string;
  firstAscent: string;
  attempts: string;
  rating: number;
  boardVersion: string;
  rules: string;
  ascents: object[];
  dataUrl: string;
  date: Date;
}
