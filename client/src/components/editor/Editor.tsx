import React, { useEffect, useState } from 'react';
import { Canvas } from './Canvas';
import { useCanvas } from '../../hooks/useCanvas';
import { Toolbar } from './Toolbar';
import EditorForm from './EditorForm';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../app/hooks';
import { Board } from '../board/boardSlice';
import { BoardSelector } from '../board/BoardSelector';
import Spinner from '../layout/Spinner';

const Editor = () => {
  const [{ canvas, coords }, { init, handleColor, undo }] = useCanvas();
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  const boards = useAppSelector((state) => state.board.boards);
  const status = useAppSelector((state) => state.board.status);

  useEffect(() => {
    if (!init) return;
    init();
  }, [init]);

  return (
    <section className='container'>
      {status === 'pending' ? (
        <Spinner />
      ) : status === 'resolved' ? (
        <>
          <BoardSelector boards={boards} setCurrentBoard={setCurrentBoard} />
          <div className='editor'>
            <Toolbar handleColor={handleColor} />
            <div
              className='board'
              style={{
                backgroundImage: `url(${
                  currentBoard ? currentBoard.imageUrl : boards[0].imageUrl
                })`
              }}
            >
              <Canvas canvasRef={canvas} />
            </div>
          </div>
          <div className='options'>
            <button className={'btn-save btn-undo'} onClick={undo}>
              <FontAwesomeIcon icon={faUndo} />
            </button>
          </div>

          <EditorForm
            coords={coords?.current}
            currentBoard={currentBoard ? currentBoard._id : boards[0]._id}
          />
        </>
      ) : (
        'Error retrieving content, please return to homepage and try again'
      )}
    </section>
  );
};

export default Editor;
