import { Document, Schema } from 'mongoose';

export default interface IProblem extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  title: string;
  grade: string;
  set_by: string;
  first_ascent: string;
  attempts: string;
  rating: number;
  board_version: string;
  rules: string;
  ascents: object[];
  dataUrl: string;
  date: Date;
}
