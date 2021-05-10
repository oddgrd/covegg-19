import React from 'react';

export interface Board {
  imageUrl: string;
  boardVersion: string;
  _id: string;
  date: string;
}
interface Props {
  boards: Array<Board>;
  setCurrentBoard: React.Dispatch<React.SetStateAction<Board | null>>;
}

export const BoardSelector = ({ boards, setCurrentBoard }: Props) => {
  const handlechange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const board = boards.filter((board) => board._id === e.target.value);
    setCurrentBoard(board[0]);
  };
  return (
    <select
      name='boards'
      className='board-selector'
      onChange={(e) => handlechange(e)}
    >
      {boards.map((board, idx) => (
        <option value={board._id} key={idx}>
          Board: {board.boardVersion} - {board.date.slice(0, 10)}
        </option>
      ))}
    </select>
  );
};
