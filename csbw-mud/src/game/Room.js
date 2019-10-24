import React from "react";

const Room = props => {
  //   const players = props.userData.players;
  const { title, description, name, players } = props.userData;
  //   const playersList = players.map(player => {
  //     return player;
  //   });
  console.log("players", players);
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      {props.userData.players ? (
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
