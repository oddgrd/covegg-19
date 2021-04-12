import { model, Schema, Model } from 'mongoose';
import IProblem from '../interfaces/problem';

const ProblemSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  setBy: {
    type: String,
    required: true
  },
  boardVersion: {
    type: String,
    required: true
  },
  rules: {
    type: String,
    required: true
  },
  ascents: [
    {
      type: new Schema(
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
          },
          comment: {
            type: String
          }
        },
        { timestamps: true }
      )
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  dataUrl: {
    type: String,
    required: true
  }
});

const Problem: Model<IProblem> = model('Problem', ProblemSchema);

export default Problem;
