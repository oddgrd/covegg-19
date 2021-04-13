import React, { useCallback, useEffect } from 'react';

import { useCanvas } from '../../hooks/useCanvas';
import { Canvas } from '../editor/Canvas';
import Background from '../../images/covegg19-0,1.jpg';

export const Problem = () => {
  // const [{ canvas }, { loadFromDataUrl, initViewer }] = useCanvas();
  // const problem = persistedState.editor.problem;
  // const formData = persistedState.editor.formData;
  // const handleLoad = useCallback(() => {
  //   if (!problem || !loadFromDataUrl || !initViewer) return;
  //   loadFromDataUrl(problem);
  // }, [initViewer, loadFromDataUrl, problem]);
  // useEffect(() => {
  //   if (!initViewer) return;
  //   initViewer();
  //   handleLoad();
  // }, [handleLoad, initViewer]);
  // const {
  //   name,
  //   grade,
  //   setter,
  //   firstAscent,
  //   attempts,
  //   rules,
  //   rating,
  //   board,
  //   date
  // } = formData;
  // return (
  //   <section className='container'>
  //     <div className='problem-view'>
  //       <div className='view-header'>
  //         <h3 className='view-title'>{name}</h3>
  //         <h3 className='grade'>{grade}</h3>
  //       </div>
  //       <div
  //         className='wall'
  //         style={{
  //           width: `${360}px`,
  //           height: `${478}px`,
  //           backgroundImage: `url(${Background})`
  //         }}
  //       >
  //         <Canvas canvasRef={canvas} />
  //       </div>
  //       <table className='problem-table'>
  //         <tr>
  //           <th>Set by:</th>
  //           <td>{setter}</td>
  //         </tr>
  //         <tr>
  //           <th>First Ascent:</th>
  //           <td>{firstAscent}</td>
  //         </tr>
  //         <tr>
  //           <th>Attempts:</th>
  //           <td>{attempts}</td>
  //         </tr>
  //         <tr>
  //           <th>Rating:</th>
  //           <td>{rating}/5</td>
  //         </tr>
  //         <tr>
  //           <th>Board version:</th>
  //           <td>{board}</td>
  //         </tr>
  //         <tr>
  //           <th>Rules:</th>
  //           <td>{rules}</td>
  //         </tr>
  //         <tr>
  //           <th>Date:</th>
  //           <td>{date}</td>
  //         </tr>
  //       </table>
  //     </div>
  //   </section>
  // );
};
