import React from 'react';
import './App.sass';
import InputField from './components/InputField/InputField';
import Card from './components/card/card';
import AppBar from './components/appbar/appbar'
import {Button, ButtonOutlined} from './components/buttons/buttons'

function App() {

  return (
    <div className='App'>
      <AppBar
        title='Todo list'
      />

      <Button title='button'/>
      <ButtonOutlined title='outlined title'/>
    </div>
  );
}

export default App;
