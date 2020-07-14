import React from 'react';
import './card.sass';

export interface CardProps {
  children: React.ReactNode,
  title?: string | undefined,
  subTitle?: string | undefined
}

function Card({children, title, subTitle} : CardProps) {
  return (
    <div className='card'>
      {title ?
        <h1 className='card_title'>{title}</h1>
        :
        undefined
      }
      {
        subTitle ?
          <p className='card_subtitle'>{subTitle}</p>
          :
          undefined
      }
      {children}
    </div>
  );
}

export default Card;
