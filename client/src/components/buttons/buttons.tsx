import React from 'react';
import './buttons.sass';

export interface ButtonsProps {
  title: string,
  typeOfButton?: 'button' | 'submit' | 'reset' | undefined,
  isDisabled?: boolean
}

export function Button({title, typeOfButton, isDisabled} : ButtonsProps) {
  return (
    <button className='button' type={typeOfButton || 'button'} disabled={isDisabled || false}>{title}</button>
  );
}

export function ButtonOutlined({title, typeOfButton, isDisabled} : ButtonsProps) {
  return (
    <button className='button button-outlined' type={typeOfButton || 'button'} disabled={isDisabled || false}>{title}</button>
  );
}
