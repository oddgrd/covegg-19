import { model, Schema, Model } from 'mongoose';
import IProblem from '../interfaces/problem';

const ProblemSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  problem_name: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  set_by: {
    type: String,
    required: true
  },
  first_ascent: {
    type: String,
    required: true
  },
  attempts: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  board_version: {
    type: String,
    required: true
  },
  rules: {
    type: String,
    required: true
  },
  ascents: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      name: {
        type: String,
        required: true
      },
      attempts: {
        type: String,
        required: true
      },
      grade: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

export const Problem: Model<IProblem> = model('Problem', ProblemSchema);
