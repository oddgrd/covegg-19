import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from './Canvas';
import { useCanvas } from '../../hooks/useCanvas';
import { Toolbar } from './Toolbar';
import EditorForm from './EditorForm';
import { faUndo, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../app/hooks';
import { Board, BoardSelector } from '../board/BoardSelector';
import Spinner from '../layout/Spinner';

const Editor = () => {
  const [{ canvas, coords }, { init, handleColor, undo }] = useCanvas();
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [editorForm, toggleEditorForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const boards = useAppSelector((state) => state.board.boards);
  const status = useAppSelector((state) => state.board.status);

  const toggleForm = () => {
    toggleEditorForm(!editorForm);
  };

  useEffect(() => {
    if (editorForm) scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [editorForm]);

  useEffect(() => {
    if (!init) return;
    init();
  }, [init]);

  return (
    <section className='container'>
      <BoardSelector boards={boards} setCurrentBoard={setCurrentBoard} />
      <div className='editor'>
        <Toolbar handleColor={handleColor} />
        <div
          className='board'
          style={{
            backgroundImage: `url(${
              status === 'pending' ? (
                <Spinner />
              ) : status === 'resolved' ? (
                currentBoard ? (
                  currentBoard.imageUrl
                ) : (
                  boards[0].imageUrl
                )
              ) : (
                'none'
              )
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
        <button onClick={() => toggleForm()} className={'btn-save'}>
          <FontAwesomeIcon icon={faSave} />
        </button>
      </div>
      {editorForm && (
        <EditorForm
          coords={coords}
          currentBoard={currentBoard ? currentBoard._id : boards[0]._id}
        />
      )}
      <div ref={scrollRef}></div>
    </section>
  );
};

export default Editor;
