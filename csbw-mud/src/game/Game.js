import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "./Map";
import Navigation from "./Navigation";
import Room from "./Room";
import Games from "./Games";

const Game = () => {
  const [userData, setUserData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const players = userData.players;
  const current_user_token = localStorage.token;
  console.log("token var:", current_user_token);

  const headers = {
    Authorization: `Token ${current_user_token}`
  };

  useEffect(() => {
    // const fetchData = async () => {
    // if (localStorage.getItem('token')) {
    //   try {
    //     let response = aw
    setIsLoading(true);
    axios
      .get("https://t-16-mud.herokuapp.com/api/adv/init/", {
        headers: {
          Authorization: `Token ${current_user_token}`
        }
      })
      // console.log('res var:', res);
      // setUserData(res.data);
      // console.log('REGISTER DATA', res.data);
      .then(res => {
        setUserData(res.data);
        setIsLoading(false);
        console.log("REGISTER DATA", res.data);
      })
      // .catch(err => {
      //   console.log(err);
      // });
      // }
      .catch(err => {
        console.log("CATCH from TRY", err);
        setIsLoading(false);
      });
  }, []);
  // fetchData();
  // current_user_token, userData

  console.log("userdata:", userData);

  const move = (e, direction) => {
    e.preventDefault();
    axios
      .post(
        "https://t-16-mud.herokuapp.com/api/adv/move/",
        {
          direction: direction
        },
        {
          headers: headers
        }
      )
      .then(res => {
        setUserData(res.data);
        setIsLoading(false);
        console.log("Move Response", res.data);
      })

      .catch(err => {
        console.log("CATCH from move", err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {/* We can render individual Game components from here
        maps, movement, room info, etc. from another main
        component */}
      {/* <button onClick={localStorage.removeItem("token")}>Logout</button> */}
      <Room userData={userData} />
      <Navigation move={move} />
      {/* <Map /> */}
      <Games />
    </div>
  );
};

export default Game;
