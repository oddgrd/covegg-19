import { Document, Schema } from 'mongoose';

interface Ascent {
  user: Schema.Types.ObjectId;
  name: string;
  attempts: string;
  grade: string;
  rating: number;
  comment?: string;
  date: Date;
}

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
  ascents: Ascent[];
  dataUrl: string;
  date: Date;
}
