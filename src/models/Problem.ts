import { model, Schema, Model } from 'mongoose';
import IProblem from '../interfaces/problem';

const ProblemSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  setby: {
    type: String,
    required: true
  },
  firstascent: {
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
  boardversion: {
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
        type: String
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
  dataurl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Problem: Model<IProblem> = model('Problem', ProblemSchema);

export default Problem;
