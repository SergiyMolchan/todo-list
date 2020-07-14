import React from 'react';
import './InputField.sass';

export interface InputFieldProps {
  type: string,
  srcIcon?: string | undefined,
  title: string,
  inputId: string,
  placeholder: string,
  onChangeHandler: Function,
}

// input with icon or none icon
function InputField({inputId, title, placeholder, srcIcon, onChangeHandler}: InputFieldProps) {
  if (srcIcon) {
    return (
      // icon in input
      <div className='formField_withIcon'>
        <img src={require(`../../${srcIcon}`)} className='formField_withIcon-icon' alt=''/>
        <InputFieldNoneIcon
          type={inputId}
          title={title}
          inputId={inputId}
          placeholder={placeholder}
          onChangeHandler={onChangeHandler}
        />
      </div>
    );
  } else {
    return (
      <InputFieldNoneIcon
        type={inputId}
        title={title}
        inputId={inputId}
        placeholder={placeholder}
        onChangeHandler={onChangeHandler}
      />
    )
  }
}

export default InputField;

// default input of not icon
function InputFieldNoneIcon({inputId, title, placeholder, onChangeHandler}: InputFieldProps) {
  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    onChangeHandler(e.currentTarget.value);
  };
  return (
    <div className='formField'>
      <input className='formField_input' type='type' id={inputId} placeholder={placeholder} onChange={inputHandler}/>
      <label htmlFor={inputId}>{title}</label>
    </div>
  )
}
