import { Document, Schema } from 'mongoose';

interface Coords {
  x: number;
  y: number;
  color: string;
}

interface Ascent {
  user: Schema.Types.ObjectId;
  _id: Schema.Types.ObjectId;
  name: string;
  attempts: string;
  grade: number;
  rating: number;
  avatar: string;
  comment?: string;
}

export default interface IProblem extends Document {
  user: Schema.Types.ObjectId;
  _id: Schema.Types.ObjectId;
  title: string;
  grade: number;
  setBy: string;
  firstAscent: string;
  attempts: string;
  board: Schema.Types.ObjectId;
  rules: string;
  ascents: Array<Ascent>;
  coords: Array<Coords>;
  date: Date;
}
