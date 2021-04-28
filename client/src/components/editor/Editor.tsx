import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from './Canvas';
import { useCanvas } from '../../hooks/useCanvas';
import { Toolbar } from './Toolbar';
import EditorForm from './EditorForm';
import {
  faUndo,
  faAngleDown,
  faAngleUp,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../app/hooks';
import { Board, BoardSelector } from '../board/BoardSelector';
import Spinner from '../layout/Spinner';

const Editor = () => {
  const [{ canvas }, { init, handleColor, undo }] = useCanvas();
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  const boards = useAppSelector((state) => state.board.boards);
  const status = useAppSelector((state) => state.board.status);
  const [editorForm, toggleEditorForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSave = useCallback(() => {
    if (!canvas || !canvas.current) return '';
    const dataUrl = canvas.current.toDataURL('image/png');
    return dataUrl;
  }, [canvas]);
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
        <button
          onClick={() => toggleForm()}
          className={'btn-save'}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '0.8rem',
            paddingRight: '0.8rem'
          }}
        >
          <FontAwesomeIcon icon={editorForm ? faAngleUp : faAngleDown} />
          <FontAwesomeIcon icon={faInfoCircle} />
          <FontAwesomeIcon icon={editorForm ? faAngleUp : faAngleDown} />
        </button>
      </div>
      {editorForm && (
        <EditorForm
          handleSave={handleSave}
          currentBoard={currentBoard ? currentBoard._id : boards[0]._id}
        />
      )}
      <div ref={scrollRef}></div>
    </section>
  );
};

export default Editor;
