import React from 'react';

const Navigation = props => {
  return (
    <div className='main-wrapper-app'>
      <h2>Navigation</h2>
      <button
        onClick={e => {
          props.move(e, 'n');
          props.loadUser();
        }}>
        Move North
      </button>
      <button
        onClick={e => {
          props.move(e, 's');
          props.loadUser();
        }}>
        Move South
      </button>
      <button
        onClick={e => {
          props.move(e, 'e');
          props.loadUser();
        }}>
        Move East
      </button>
      <button
        onClick={e => {
          props.move(e, 'w');
          props.loadUser();
        }}>
        Move West
      </button>
    </div>
  );
};

export default Navigation;
