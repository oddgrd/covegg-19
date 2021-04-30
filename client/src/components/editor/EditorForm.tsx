import React, { FC, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Rating from 'react-rating';
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { saveProblem } from './editorSlice';
import grades from './grades';

const initialState = {
  title: '',
  grade: 0,
  setBy: '',
  rules: 'Feet follow hands',
  rating: 3,
  board: '',
  date: new Date().toISOString()
};

interface Props {
  handleSave: () => string;
  currentBoard: string;
}
const EditorForm: FC<Props> = ({ handleSave, currentBoard }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.auth.user.name);

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeGrade = (e: any) => {
    setFormData({ ...formData, grade: e.target.value });
  };
  const onChangeRating = (value: number) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dataUrl = handleSave();
    dispatch(
      saveProblem({
        ...formData,
        setBy: user,
        dataUrl: dataUrl,
        board: currentBoard
      })
    );
    history.push('/browse');
  };
  const { title, grade, rules, rating } = formData;
  return (
    <form className='form' autoComplete='off' onSubmit={handleSubmit}>
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
      <div className='star-rating'>
        <Rating
          onChange={onChangeRating}
          initialRating={rating}
          emptySymbol={<FontAwesomeIcon icon={faStar} size='3x' />}
          fullSymbol={<FontAwesomeIcon icon={faStarS} size='3x' />}
        />
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
