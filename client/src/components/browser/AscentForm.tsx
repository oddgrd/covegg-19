import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import Rating from 'react-rating';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import grades from '../editor/grades';
import { addAscent } from './browserSlice';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

const initialState = {
  grade: 0,
  attempts: 'FLASH',
  rating: 3,
  avatar: '',
  comment: '',
  problemId: ''
};

export interface AscentData {
  problemId: string;
  attempts: string;
  grade: number;
  rating: number;
  avatar: string;
  comment?: string;
}

interface Props {
  problemId: string;
  toggleForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AscentForm = ({ problemId, toggleForm }: Props) => {
  const [formData, setFormData] = useState<AscentData>(initialState);
  const dispatch = useAppDispatch();
  const avatar = useAppSelector((state) => state.auth.user.avatar);
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
    dispatch(addAscent({ ...formData, problemId, avatar }));
    toggleForm(false);
  };

  const { grade, rating, comment } = formData;
  return (
    <form
      className='form menu-animation-down'
      autoComplete='off'
      onSubmit={handleSubmit}
    >
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
            value='FOUR OR LESS'
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
        <textarea
          maxLength={90}
          rows={3}
          cols={1}
          placeholder='Comment (Optional)'
          name='comment'
          value={comment}
          onChange={(e) => onChange(e)}
          style={{ marginTop: '1.3rem' }}
        />
      </div>
      <div className='form-group'>
        <input
          type='submit'
          className='submit-button'
          value='Submit Ascent'
        ></input>
      </div>
    </form>
  );
};
