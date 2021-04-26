import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Rating from 'react-rating';
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { saveProblem } from './editorSlice';
import grades from './grades';
import { getProblems } from '../browser/browserSlice';

const initialState = {
  title: '',
  grade: 0,
  setBy: '',
  rules: 'Feet follow hands',
  rating: 3,
  board: '6085c77888add6813b499b2a',
  date: new Date().toISOString()
};

interface Props {
  handleSave: () => string;
}
const EditorForm: FC<Props> = ({ handleSave }) => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const dataUrl = handleSave();
    dispatch(
      saveProblem({
        ...formData,
        setBy: user,
        dataUrl: dataUrl
      })
    );
    history.push('/browse');
    history.go(0);
  };
  const { title, grade, rules, rating } = formData;
  return (
    <div className='editor-form' onSubmit={handleSubmit}>
      <form className='form' autoComplete='off'>
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
          <input
            type='range'
            name='grade'
            min={0}
            max={grades.length - 1}
            value={grade}
            onChange={(e) => onChangeGrade(e)}
            required
          />
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
            value='Save Problem'
            className='submit-button'
          ></input>
        </div>
      </form>
    </div>
  );
};

export default EditorForm;
