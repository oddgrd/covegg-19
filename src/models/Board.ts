import { model, Schema, Model } from 'mongoose';
import IBoard from '../interfaces/board';

const BoardSchema: Schema = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  boardVersion: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Board: Model<IBoard> = model('Board', BoardSchema);

export default Board;
