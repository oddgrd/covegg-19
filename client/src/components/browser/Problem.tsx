import React, { useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useCanvas } from '../../hooks/useCanvas';
import { Canvas } from '../editor/Canvas';
import Background from '../../images/covegg19-0,1.jpg';
import { getProblemById } from './browserSlice';
import { RouteComponentProps } from 'react-router-dom';
import grades from '../editor/grades';
import Spinner from '../layout/Spinner';

interface MatchParams {
  id: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}
export const Problem = ({ match }: MatchProps) => {
  const [{ canvas }, { loadFromDataUrl, initViewer }] = useCanvas();
  const dispatch = useAppDispatch();
  const problem = useAppSelector((state) => state.browser.currentProblem);
  const status = useAppSelector((state) => state.browser.status);
  const error = useAppSelector((state) => state.browser.error);
  const { title, setBy, grade, rules, board, date, dataUrl } = problem;

  const handleLoad = useCallback(() => {
    if (!problem || !loadFromDataUrl || !initViewer) return;
    loadFromDataUrl(dataUrl);
  }, [dataUrl, initViewer, loadFromDataUrl, problem]);

  useEffect(() => {
    const id = match.params.id;
    dispatch(getProblemById(id));
  }, [dispatch, match.params.id]);
  useEffect(() => {
    if (!initViewer) return;
    initViewer();
    handleLoad();
  }, [handleLoad, initViewer]);

  return (
    <section className='container'>
      {status === 'pending' ? (
        <Spinner />
      ) : status === 'resolved' ? (
        <div className='problem-view'>
          <div className='view-header'>
            <h3 className='view-title'>{title}</h3>
            <h3 className='grade' style={{ color: `${grades[grade].color}` }}>
              {grades[grade].grade}
            </h3>
          </div>
          <div
            className='wall'
            style={{
              width: `${360}px`,
              height: `${478}px`,
              backgroundImage: `url(${Background})`
            }}
          >
            <Canvas canvasRef={canvas} />
          </div>
          <table className='problem-table'>
            <tr>
              <th>Set by:</th>
              <td>{setBy}</td>
            </tr>
            {}
            <tr>
              <th>First Ascent:</th>
              <td></td>
            </tr>
            <tr>
              <th>Attempts:</th>
              <td></td>
            </tr>
            <tr>
              <th>Rating:</th>
              <td></td>
            </tr>
            <tr>
              <th>Board version:</th>
              <td>{board}</td>
            </tr>
            <tr>
              <th>Rules:</th>
              <td>{rules}</td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>{date}</td>
            </tr>
          </table>
        </div>
      ) : (
        <p>Problem not found: {error}</p>
      )}
    </section>
  );
};
