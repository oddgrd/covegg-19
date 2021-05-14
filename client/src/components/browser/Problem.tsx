import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useCanvas } from '../../hooks/useCanvas';
import { Canvas } from '../editor/Canvas';
import {
  Ascent,
  getProblemById,
  clearState,
  deleteProblem
} from './browserSlice';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import grades from '../editor/grades';
import { AscentItem } from './AscentItem';
import { ProblemTable } from './ProblemTable';
import { AscentForm } from './AscentForm';
import Spinner from '../layout/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface MatchParams {
  id: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}

export const Problem = ({ match }: MatchProps) => {
  const [{ canvas }, { initViewer, loadFromCoords }] = useCanvas();
  const [ascentForm, toggleAscentForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const problem = useAppSelector((state) => state.browser.currentProblem);
  const status = useAppSelector((state) => state.browser.status);

  const {
    title,
    setBy,
    grade,
    rules,
    date,
    board,
    ascents,
    _id,
    user,
    coords
  } = problem;
  const tableProps = {
    setBy,
    rules,
    board: board.boardVersion,
    date,
    ascents,
    grade,
    user
  };

  const isOwner = currentUser === user;
  const alreadyTicked =
    ascents.filter((ascent) => ascent.user === currentUser).length > 0;

  const consensusGrade = () => {
    if (ascents.length === 0) return grade;
    const suggestedGrades = ascents.map((ascent: Ascent) => ascent.grade);
    const averageGrade = suggestedGrades.reduce(
      (val: number, acc: number) => acc + val
    );
    return Math.round(averageGrade / suggestedGrades.length);
  };
  const handleLoadCoords = useCallback(() => {
    if (!problem || !loadFromCoords || !initViewer) return;
    loadFromCoords(coords);
  }, [coords, initViewer, loadFromCoords, problem]);
  const toggleForm = () => {
    toggleAscentForm(!ascentForm);
  };
  const handleDelete = () => {
    if (window.confirm('Are you sure? Deletion is permanent.'))
      dispatch(deleteProblem(_id));
    history.push('/browse');
  };

  useEffect(() => {
    if (!initViewer) return;
    initViewer();
    handleLoadCoords();
  }, [handleLoadCoords, initViewer]);

  useEffect(() => {
    const id = match.params.id;
    dispatch(getProblemById(id));
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (ascentForm) scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ascentForm]);

  return (
    <section className='container'>
      {status === 'pending' ? (
        <Spinner />
      ) : status === 'resolved' ? (
        <>
          <div className='problem-view'>
            <div className='view-header'>
              <h3 className='view-title'>{title}</h3>
              <h3
                className='grade'
                style={{ color: `${grades[consensusGrade()].color}` }}
              >
                {ascents.length === 0
                  ? grades[consensusGrade()].grade + '?'
                  : grades[consensusGrade()].grade}
              </h3>
            </div>
            <div
              className='board'
              style={{
                backgroundImage: `url(${board.imageUrl})`
              }}
            >
              <Canvas canvasRef={canvas} />
            </div>
            {isOwner && (
              <div className='options'>
                <button onClick={handleDelete} className='btn-save btn-undo'>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                  className='btn-save'
                  style={{ opacity: '0.4' }}
                  disabled
                >
                  <FontAwesomeIcon icon={faTools} />
                </button>
              </div>
            )}
            <ProblemTable {...tableProps} />
          </div>
          {!alreadyTicked && isAuthenticated && (
            <button
              onClick={() => toggleForm()}
              className={'btn-save'}
              style={{
                width: '350px',
                margin: 'auto',
                marginTop: '0.8rem',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '1.4rem'
              }}
            >
              Register Ascent
            </button>
          )}

          {ascentForm && (
            <>
              <div ref={scrollRef}></div>
              <AscentForm problemId={_id} toggleForm={toggleAscentForm} />
            </>
          )}
          {ascents.length > 0 && (
            <div className='ascents'>
              <h3 style={{ textAlign: 'center', padding: '0.4rem' }}>
                Ascents:
              </h3>
              {ascents.map((ascent, idx) => (
                <AscentItem ascent={ascent} key={idx} problemId={_id} />
              ))}
            </div>
          )}
        </>
      ) : (
        '404 not found'
      )}
    </section>
  );
};
