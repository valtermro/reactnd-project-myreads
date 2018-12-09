import React from 'react';
import LoadingIcon from './elements/LoadingIcon';
import './LoadingOverlay.css';

export default function LoadingOverlay(props) {
  return (
    <div className='LoadingOverlay'>
      <LoadingIcon className='LoadingOverlay__LoadingIcon' />
    </div>
  );
}
