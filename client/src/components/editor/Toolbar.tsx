import React from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

interface Props {
  handleColor: ((color: string) => void) | undefined;
}

export const Toolbar = ({ handleColor }: Props) => {
  const handleChange = (value: any) => {
    if (!handleColor) return;
    handleColor(value);
  };
  return (
    <section className='toolbar'>
      <RadioGroup horizontal className='radio' onChange={handleChange} value=''>
        <RadioButton
          className='radio-button'
          value='#00FF00'
          rootColor='#f0eff3'
          pointColor='#05ab75'
        >
          START
        </RadioButton>
        <RadioButton
          className='radio-button'
          value='#0000FF'
          rootColor='#f0eff3'
          pointColor='#1184e8'
        >
          CENTRE
        </RadioButton>
        <RadioButton
          value='#FF0000'
          rootColor='#f0eff3'
          pointColor='#ca3436'
          className='radio-button'
        >
          TOP
        </RadioButton>
      </RadioGroup>
    </section>
  );
};
