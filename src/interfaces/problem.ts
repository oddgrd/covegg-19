import { Document, Schema, ObjectId } from 'mongoose';

export default interface IProblem extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  problem_name: string;
  grade: string;
  set_by: string;
  first_ascent: string;
  attempts: string;
  rating: number;
  board_version: string;
  rules: string;
  ascents: object[];
  _id: ObjectId;
  date: Date;
}
