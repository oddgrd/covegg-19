import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useCanvas } from '../../hooks/useCanvas';
import { Canvas } from '../editor/Canvas';
import { Ascent, getProblemById } from './browserSlice';
import { RouteComponentProps } from 'react-router-dom';
import grades from '../editor/grades';
import { AscentItem } from './AscentItem';
import { ProblemTable } from './ProblemTable';
import { clearState, getBoard } from '../board/boardSlice';
import { AscentForm } from './AscentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';

interface MatchParams {
  id: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}

export const Problem = ({ match }: MatchProps) => {
  const [{ canvas }, { loadFromDataUrl, initViewer }] = useCanvas();
  const [ascentForm, toggleAscentForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const problem = useAppSelector((state) => state.browser.currentProblem);
  const boardObj = useAppSelector((state) => state.board.currentBoard);

  const consensusGrade = () => {
    if (ascents.length === 0) return grade;
    const suggestedGrades = ascents.map((ascent: Ascent) => ascent.grade);
    const averageGrade = suggestedGrades.reduce(
      (val: number, acc: number) => acc + val
    );
    return Math.round(averageGrade / suggestedGrades.length);
  };

  const {
    title,
    setBy,
    grade,
    rules,
    board,
    date,
    dataUrl,
    rating,
    ascents,
    _id
  } = problem;

  const tableProps = {
    setBy,
    rules,
    board: boardObj.boardVersion,
    date,
    rating,
    ascents,
    grade
  };

  const alreadyTicked =
    ascents.filter((ascent) => ascent.user === currentUser).length > 0;

  const handleLoad = useCallback(() => {
    if (!problem || !loadFromDataUrl || !initViewer) return;
    loadFromDataUrl(dataUrl);
  }, [dataUrl, initViewer, loadFromDataUrl, problem]);

  const toggleForm = () => {
    toggleAscentForm(!ascentForm);
  };
  useEffect(() => {
    if (ascentForm) scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ascentForm]);

  useEffect(() => {
    const id = match.params.id;
    dispatch(getProblemById(id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (board === '') return;
    dispatch(getBoard(board));
    return () => {
      dispatch(clearState());
    };
  }, [board, dispatch]);

  useEffect(() => {
    if (!initViewer) return;
    initViewer();
    handleLoad();
  }, [handleLoad, initViewer]);

  return (
    <section className='container'>
      <div className='problem-view'>
        <div className='view-header'>
          <h3 className='view-title'>{title}</h3>
          <h3
            className='grade'
            style={{ color: `${grades[consensusGrade()].color}` }}
          >
            {grades[consensusGrade()].grade}
          </h3>
        </div>
        <div
          className='board'
          style={{
            backgroundImage: `url(${boardObj.imageUrl})`
          }}
        >
          <Canvas canvasRef={canvas} />
        </div>
        <ProblemTable {...tableProps} />
      </div>
      {!alreadyTicked && (
        <button
          onClick={() => toggleForm()}
          className={'btn-save'}
          style={{
            width: '350px',
            margin: 'auto',
            marginTop: '0.3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '0.8rem',
            paddingRight: '0.8rem'
          }}
        >
          Tick <FontAwesomeIcon icon={ascentForm ? faCheckSquare : faSquare} />
        </button>
      )}

      {ascentForm && (
        <AscentForm problemId={_id} toggleForm={toggleAscentForm} />
      )}
      <div ref={scrollRef}></div>
      {ascents.length > 0 && (
        <div className='ascents'>
          <h3 style={{ textAlign: 'center', padding: '0.4rem' }}>Ascents:</h3>
          {ascents.map((ascent, idx) => (
            <AscentItem ascent={ascent} key={idx} problemId={_id} />
          ))}
        </div>
      )}
    </section>
  );
};
