import React from "react";
import './appbar.sass';

export interface AppBarProps {
  title: string,
}

function AppBar({title} : AppBarProps) {
  return (
    <header className='navBar'>
      <h1 className='title title-app'>{title}</h1>
      <nav className='navList'>
        <ul>
          <li className='navList_item'><a className='navList_item-active'>Registration</a></li>
          <li className='navList_item'><a>Login</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default AppBar;
