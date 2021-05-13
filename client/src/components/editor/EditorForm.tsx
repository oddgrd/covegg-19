import React, { FC, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { saveProblem } from './editorSlice';
import grades from './grades';
import { Coords } from '../../hooks/useCanvas';

const initialState = {
  title: '',
  grade: 0,
  setBy: '',
  rules: 'Feet follow hands',
  board: '',
  date: new Date().toISOString()
};

interface Props {
  currentBoard: string;
  coords: Array<Coords> | undefined;
}

const EditorForm: FC<Props> = ({ currentBoard, coords }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.auth.user.name);

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeGrade = (e: any) => {
    setFormData({ ...formData, grade: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      saveProblem({
        ...formData,
        setBy: user,
        coords,
        board: currentBoard
      })
    );
    history.push('/browse');
  };
  const { title, grade, rules } = formData;
  return (
    <form
      className='form menu-animation-down'
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <div className='form-group'>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={title}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Feet follow hands?'
          name='rules'
          value={rules}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div className='form-group'>
        <p
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            padding: '0.4rem',
            color: `${grades[grade].color}`
          }}
        >
          <strong>{grades[grade].grade}</strong>
        </p>
        <div className='div-center'>
          <input
            type='range'
            name='grade'
            min={0}
            max={grades.length - 1}
            value={grade}
            onChange={(e) => onChangeGrade(e)}
            required
          />
        </div>
      </div>
      <div className='form-group'>
        <input
          type='submit'
          className='submit-button'
          value='Save Problem'
        ></input>
      </div>
    </form>
  );
};

export default EditorForm;
