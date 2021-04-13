import React, { FC, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Rating from 'react-rating';
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '../../app/hooks';
import { saveFormData } from './editorSlice';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

const initialState = {
  title: '',
  grade: '',
  setby: '',
  firstascent: '',
  attempts: 'Flash',
  rules: 'Feet follow hands',
  rating: 3,
  board: 0.1,
  date: new Date().toISOString()
};

interface Props extends RouteComponentProps {
  handleSave: () => void;
}
const EditorForm: FC<Props> = ({ handleSave, history }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useAppDispatch();
  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeRating = (value: number) => {
    setFormData({ ...formData, rating: value });
  };
  const onChangeAttempts = (value: string) => {
    setFormData({ ...formData, attempts: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSave();
    dispatch(saveFormData(formData));
    history.push('/problem');
  };

  const { title, grade, setby, firstascent, rules, rating } = formData;
  return (
    <div className='editor-form' onSubmit={handleSubmit}>
      <form className='form'>
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
            placeholder='Grade'
            name='grade'
            value={grade}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <RadioGroup
            horizontal
            className='radio'
            onChange={onChangeAttempts}
            value=''
          >
            <RadioButton
              className='radio-button'
              value='Flash'
              rootColor='#f0eff3'
              pointColor='#05ab75'
            >
              FLASH
            </RadioButton>
            <RadioButton
              className='radio-button'
              value='<4'
              rootColor='#f0eff3'
              pointColor='#1184e8'
            >
              {'< 4'}
            </RadioButton>
            <RadioButton
              value='>4'
              rootColor='#f0eff3'
              pointColor='#ca3436'
              className='radio-button'
            >
              {'> 4'}
            </RadioButton>
          </RadioGroup>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Set By'
            name='setby'
            value={setby}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='First Ascent By'
            name='firstascent'
            value={firstascent}
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
        <div className='star-rating'>
          <Rating
            onChange={onChangeRating}
            initialRating={rating}
            emptySymbol={<FontAwesomeIcon icon={faStar} size='3x' />}
            fullSymbol={<FontAwesomeIcon icon={faStarS} size='3x' />}
          />
        </div>
        <div className='form-group'>
          <input type='submit' value='Save Problem'></input>
        </div>
      </form>
    </div>
  );
};

export default withRouter(EditorForm);
