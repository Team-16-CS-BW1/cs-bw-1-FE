import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import Navigation from './Navigation';
import Room from './Room';
import Games from './Games';

const Game = () => {
  const [userData, setUserData] = useState({});
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const players = userData.players;
  const current_user_token = localStorage.token;
  console.log('token var:', current_user_token);

  const headers = {
    Authorization: `Token ${current_user_token}`,
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://t-16-mud.herokuapp.com/api/adv/init/', {
        headers: {
          Authorization: `Token ${current_user_token}`,
        },
      })
      .then(res => {
        setUserData(res.data);
        setRoomData(res.data.world_map.rooms);
        setIsLoading(false);
        console.log('REGISTER DATA', res.data);
      })
      .catch(err => {
        console.log('CATCH from TRY', err);
        setIsLoading(false);
      });
  }, []);

  console.log('userdata:', userData);
  console.log('roomdata:', roomData);
  // console.log('roomdata:', roomData[1].id);
  // console.log('roomdata:', roomData[1]['id'][1]);

  const move = (e, direction) => {
    e.preventDefault();
    axios
      .post(
        'https://t-16-mud.herokuapp.com/api/adv/move/',
        {
          direction: direction,
        },
        {
          headers: headers,
        },
      )
      .then(res => {
        setUserData(res.data);
        setIsLoading(false);
        console.log('Move Response', res.data);
      })

      .catch(err => {
        console.log('CATCH from move', err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {/* {isLoading ? false : console.log('hello', roomData[0].id)} */}
      {/* We can render individual Game components from here
        maps, movement, room info, etc. from another main
        component */}
      {/* <button onClick={localStorage.removeItem("token")}>Logout</button> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Room userData={userData} />
          <Navigation move={move} />
          <Games roomData={roomData} />
        </div>
      )}
      {/* 
      <Room userData={userData} />
      <Navigation move={move} /> */}
      {/* <Map /> */}
      {/* <Games roomData={roomData} /> */}
    </div>
  );
};

export default Game;
