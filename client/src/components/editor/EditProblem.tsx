import React, { useEffect } from 'react';
import { Canvas } from './Canvas';
import { useCanvas } from '../../hooks/useCanvas';
import { Toolbar } from './Toolbar';
import EditorForm from './EditorForm';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../layout/Spinner';
import { RouteComponentProps } from 'react-router-dom';
import { getProblemById } from '../browser/browserSlice';

interface MatchParams {
  id: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}

const EditProblem = ({ match }: MatchProps) => {
  const [
    { canvas, coords },
    { init, handleColor, undo, setCoords, loadFromCoords }
  ] = useCanvas();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.browser.status);
  const problem = useAppSelector((state) => state.browser.currentProblem);
  const { title, rules, grade, _id, ascents } = problem;
  const editProps = {
    title,
    rules,
    grade,
    problemId: _id,
    ascentsLength: ascents.length
  };

  useEffect(() => {
    dispatch(getProblemById(match.params.id));
  }, [dispatch, match.params.id]);
  useEffect(() => {
    if (!init) return;
    if (status === 'resolved') init();
  }, [init, status]);
  useEffect(() => {
    if (!setCoords) return;
    setCoords([...problem.coords]);
  }, [problem.coords, setCoords]);
  useEffect(() => {
    if (!loadFromCoords) return;
    loadFromCoords(problem.coords);
  }, [problem.coords, loadFromCoords]);

  return (
    <section className='container'>
      {status === 'pending' ? (
        <Spinner />
      ) : status === 'resolved' ? (
        <>
          <div className='editor'>
            <Toolbar handleColor={handleColor} />
            <div
              className='board'
              style={{
                backgroundImage: `url(${problem.board.imageUrl})`
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
            coords={coords}
            currentBoard={problem.board._id}
            edit={editProps}
          />
        </>
      ) : (
        'Error retrieving content, please return to homepage and try again'
      )}
    </section>
  );
};

export default EditProblem;
