import React, { useState, useEffect } from "react";
import axios from "axios";

const Game = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const current_user_token = localStorage.token;
  console.log("token var:", current_user_token);

  useEffect(() => {
    // const fetchData = async () => {
    // if (localStorage.getItem('token')) {
    //   try {
    //     let response = await
    setIsLoading(true);
    axios
      .get("https://lambda-mud-test.herokuapp.com/api/adv/init/", {
        headers: {
          Authorization: `Token ${current_user_token}`
        }
      })
      // console.log('res var:', res);
      // setUserData(res.data);
      // console.log('REGISTER DATA', res.data);
      .then(res => {
        setUserData({ name: res.data.name });
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
  return (
    <div>
      {/* We can render individual Game components from here
        maps, movement, room info, etc. from another main
        component */}
      <button onClick={localStorage.removeItem("token")}>Logout</button>
      <p>Game info</p>
      {/* <Map /> */}
    </div>
  );
};

export default Game;
