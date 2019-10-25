import React from "react";
import "../App.css";
import styled from "styled-components";

const Room = props => {
  //   const players = props.userData.players;
  const { title, description, name, players, error_msg } = props.moveData;
  //   const playersList = players.map(player => {
  //     return player;
  //   });
  //   console.log("players", players);
  return (
    <RoomWrapper>
      <InfoDiv>
        <h3>You are currently in: {title}</h3>
        <h3>About this room: {description}</h3>
        <h4>Status: {error_msg}</h4>
      </InfoDiv>

      <StatusDiv>
        {players ? <h3>Players in this same room:</h3> : null}
        {players ? (
          players.map(player => {
            return <li key={player.index}>{player}</li>;
          })
        ) : (
          <h3>No other players in the current room</h3>
        )}
      </StatusDiv>
    </RoomWrapper>
  );
};

const RoomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  h4 {
    color: red;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  align-items: center;
  h4 {
    color: red;
  }
`;
const StatusDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  margin: 0 auto;
  align-items: center;
`;

export default Room;
