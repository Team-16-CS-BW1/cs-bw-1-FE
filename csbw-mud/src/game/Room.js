import React from 'react';
import '../App.css';

const Room = props => {
  //   const players = props.userData.players;
  const { title, description, name, players, error_msg } = props.moveData;
  //   const playersList = players.map(player => {
  //     return player;
  //   });
  //   console.log("players", players);
  return (
    <div className='room-wrapper'>
      <p>{title}</p>
      <p>{description}</p>
      <p>{error_msg}</p>
      {players ? (
        players.map(player => {
          return player;
        })
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Room;
