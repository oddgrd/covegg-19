import axios from 'axios';
import React, { useState } from 'react';

export const BoardForm = () => {
  const [board, setBoard] = useState({ image: '' });

  const handleImage = (e: any) => {
    setBoard({ ...board, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', board.image);
    try {
      await axios.post('/api/boards/add', formData);
      console.log('Image added');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className='container'>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='.png, .jpg, .jpeg'
          name='image'
          onChange={handleImage}
        />
        <input type='submit' />
      </form>
    </section>
  );
};
