import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import api from '../../utils/api';
import { uploadBoard } from './boardSlice';

export const BoardForm = () => {
  const [boardData, setBoardData] = useState({
    imageUrl: '',
    boardVersion: ''
  });
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

  const { boardVersion } = boardData;
  return (
    <section className='container'>
      <form
        encType='multipart/form-data'
        onSubmit={handleSubmit}
        className='form'
        autoComplete='off'
      >
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
        <input type='submit' className='submit-button' value='Upload Image' />
      </form>
    </section>
  );
};
