import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import Rating from 'react-rating';
import { useAppDispatch } from '../../app/hooks';
import grades from '../editor/grades';
import { addAscent } from './browserSlice';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
const initialState = {
  grade: 0,
  attempts: '',
  rating: 3,
  comment: '',
  problemId: ''
};

export interface AscentData {
  problemId: string;
  attempts: string;
  grade: number;
  rating: number;
  comment?: string;
}

export const AscentForm = () => {
  const [formData, setFormData] = useState<AscentData>(initialState);
  const dispatch = useAppDispatch();

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeGrade = (e: any) => {
    setFormData({ ...formData, grade: e.target.value });
  };
  const onChangeRating = (value: number) => {
    setFormData({ ...formData, rating: value });
  };
  const onChangeAttempts = (value: any) => {
    setFormData({ ...formData, attempts: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addAscent(formData));
  };

  const { grade, rating, comment } = formData;
  return (
    <form className='form' autoComplete='off' onSubmit={handleSubmit}>
      <h3 style={{ textAlign: 'center', color: '#05ab75' }}>Attempts:</h3>
      <section className='toolbar'>
        <RadioGroup
          horizontal
          className='radio'
          onChange={onChangeAttempts}
          value=''
        >
          <RadioButton
            className='radio-button'
            value='FLASH'
            rootColor='#f0eff3'
            pointColor='green'
          >
            FLASH
          </RadioButton>
          <RadioButton
            className='radio-button'
            value='Four or less'
            rootColor='#f0eff3'
            pointColor='orange'
          >
            {'<='} 4
          </RadioButton>
          <RadioButton
            value='Many'
            rootColor='#f0eff3'
            pointColor='red'
            className='radio-button'
          >
            MANY
          </RadioButton>
        </RadioGroup>
      </section>
      <div className='form-group'>
        <h3
          style={{ textAlign: 'center', padding: '0.4rem', color: '#05ab75' }}
        >
          Suggested Grade:
        </h3>
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
      <h3 style={{ textAlign: 'center', color: '#05ab75' }}>Rate Problem:</h3>
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
          type='text'
          placeholder='Comment (Optional)'
          name='comment'
          value={comment}
          onChange={(e) => onChange(e)}
          style={{ marginTop: '1.3rem' }}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='submit'
          className='submit-button'
          value='Tick Ascent'
        ></input>
      </div>
    </form>
  );
};
