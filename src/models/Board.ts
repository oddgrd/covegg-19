import { model, Schema, Model } from 'mongoose';
import IBoard from '../interfaces/board';

const BoardSchema: Schema = new Schema({
  image: {
    type: Buffer,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Board: Model<IBoard> = model('Board', BoardSchema);

export default Board;
