import React, { useState } from 'react';
import api from '../../utils/api';

export const BoardForm = () => {
  const [data, setData] = useState({ imageUrl: '', boardVersion: '' });

  const handleImage = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.files[0] });
  };

  const onChange = (e: any) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', data.imageUrl);
    formData.append('boardVersion', data.boardVersion);
    try {
      const upload = await api.post('/boards/upload', formData);
      if (!upload) {
        throw Error('Failed to upload image');
      }
      const { boardVersion, imageUrl } = upload.data;
      const boardFields = { imageUrl, boardVersion };
      console.log(boardFields);
      await api.post('/boards', boardFields);
      console.log('Image saved to cloud and reference in mongoDB');
    } catch (error) {
      console.log(error.message);
    }
  };

  const { boardVersion } = data;
  return (
    <section className='container'>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
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
        />
        <input type='submit' />
      </form>
    </section>
  );
};
