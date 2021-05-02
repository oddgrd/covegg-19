import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllBoards, uploadBoard } from './boardSlice';

export const BoardForm = () => {
  const [boardData, setBoardData] = useState({
    imageUrl: '',
    boardVersion: ''
  });
  const boards = useAppSelector((state) => state.board.boards);
  const status = useAppSelector((state) => state.board.status);

  const dispatch = useAppDispatch();
  const handleImage = (e: any) => {
    setBoardData({ ...boardData, [e.target.name]: e.target.files[0] });
  };

  const onChange = (e: any) =>
    setBoardData({ ...boardData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', boardData.imageUrl);
    formData.append('boardVersion', boardData.boardVersion);
    dispatch(uploadBoard(formData));
  };

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

  const { boardVersion } = boardData;
  return (
    <section className='container'>
      <h3 style={{ textAlign: 'center', color: '#05ab75' }}>Add New Board:</h3>
      <ul style={{ padding: '0.5rem', textAlign: 'center' }}>
        <li>
          Name your board using <i>MAJOR.MINOR.PATCH:</i>
        </li>
        <ul style={{ marginLeft: '0.7rem' }}>
          <li>
            <strong>MAJOR:</strong> Complete reset or large changes that break
            old problems
          </li>
          <li>
            <strong>MINOR:</strong> Changes to exisiting holds and/or new holds
            thay may affect a few older problems
          </li>
          <li>
            <strong>PATCH:</strong> New holds and/or minor changes but not
            affecting older problems
          </li>
        </ul>

        <li>
          <strong>SIZE LIMIT:</strong> 5MB (Phone camera jpeg is about 3.2MB)
        </li>
      </ul>
      <form
        encType='multipart/form-data'
        onSubmit={handleSubmit}
        className='form'
        autoComplete='off'
      >
        <p>
          Current Board Version:{' '}
          {status === 'resolved' && boards[0].boardVersion}
        </p>
        <input
          type='text'
          placeholder='Board version (0.0.0)'
          name='boardVersion'
          value={boardVersion}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type='file'
          accept='.png, .jpg, .jpeg'
          name='imageUrl'
          onChange={handleImage}
          required
        />
        <input type='submit' className='submit-button' value='Add Board' />
      </form>
    </section>
  );
};
