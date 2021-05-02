import React, { useCallback, useEffect } from 'react';
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

interface MatchParams {
  id: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}
export const Problem = ({ match }: MatchProps) => {
  const [{ canvas }, { loadFromDataUrl, initViewer }] = useCanvas();
  const dispatch = useAppDispatch();
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

  const handleLoad = useCallback(() => {
    if (!problem || !loadFromDataUrl || !initViewer) return;
    loadFromDataUrl(dataUrl);
  }, [dataUrl, initViewer, loadFromDataUrl, problem]);

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
      <AscentForm problemId={_id} />
      {ascents.length > 0 && (
        <div className='ascents'>
          {ascents.map((ascent, idx) => (
            <AscentItem ascent={ascent} key={idx} problemId={_id} />
          ))}
        </div>
      )}
    </section>
  );
};
