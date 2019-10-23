import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Game = props => {
  [userData, setUserData] = useState({});

  const current_user_token = localStorage.getItem('token');

  useEffect => () => {
    const fetchData = async () => {
      if (current_user_token) {
        try {
          axios
            .get(`https://lambda-mud-test.herokuapp.com/api/adv/init`, {
              Authorization: current_user_token,
            })
            .then(res => {
              setUserData(res.data);
              console.log('REGISTER DATA', res.data);
            });
        } catch {}
      }
    };
  },
    [current_user_token, set];

  return (
    <div>
      {/* We can render individual Game components from here
        maps, movement, room info, etc. from another main
        component */}
      <p>main Game container</p>
    </div>
  );
};

export default Game;
