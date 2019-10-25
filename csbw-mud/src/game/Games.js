import React from 'react';
import Navigation from './Navigation';
import axios from 'axios';
import Room from './Room';

const CELL_SIZE = 54;
const WIDTH = 810;
const HEIGHT = 810;

class Cell extends React.Component {
  render() {
    const { x, y } = this.props;
    // console.log('cell state props', this.props.currentRoom);
    return (
      <div
        className='Cell'
        style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}
      />
      //   <p>{this.props.userData.currentRoom.id}</p>
      // </div>
    );
  }
}

class Currentcell extends React.Component {
  render() {
    const { x, y } = this.props;
    console.log('CURRENT CELL from props', { x, y });
    return (
      <div
        className='Current-cell'
        style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}
      />
    );
  }
}

const current_user_token = localStorage.token;
const headers = {
  Authorization: `Token ${current_user_token}`,
};

class Games extends React.Component {
  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;

    this.board = this.makeEmptyBoard();
  }

  state = {
    cells: [{ x: 0, y: 3 }, { x: 0, y: 0 }],
    rooms: [],
    neighbors: [{ x: 0, y: 0 }],
    currentRoom: [],
    navFlag: false,
    moveData: {},
    isLoading: false,
  };

  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }

    return board;
  }

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  }

  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }

  loadUser() {
    let currentRoomArr = [];

    console.log('inside load user', this.props.userData.current_room);
    let x = this.props.userData.current_room.x;
    let y = this.props.userData.current_room.y;
    currentRoomArr.push({ x, y });

    // let x = room.x;
    // let y = room.y;

    return this.setState({ currentRoom: currentRoomArr });
  }

  loadMove() {
    let newCurrentRoomArr = [];
    // this.setState({ navFlag: false });
    // console.log('inside load user', this.props.userData.current_room);
    // console.log('LOADMOVE', this.props.moveData.current_room);
    // console.log('inside load user', this.state.userData.current_room);
    // console.log('LOADMOVE', this.state.moveData.current_room);

    let x = this.state.moveData.current_room.x;
    let y = this.state.moveData.current_room.y;

    // let x = this.props.moveData.current_room.x;
    // let y = this.props.moveData.current_room.y;
    newCurrentRoomArr.push({ x, y });

    // let x = room.x;
    // let y = room.y;

    return this.setState({ currentRoom: newCurrentRoomArr });
  }

  loadCells() {
    let cellsArr = [];

    this.props.roomData.map(room => {
      console.log('CDM FIRED_________________>>>');
      let x = room.x;
      let y = room.y;
      cellsArr.push({ x, y });
    });
    return this.setState({ cells: cellsArr });
  }

  componentDidMount() {
    if (this.props.roomData.length && this.props.userData.length != 0) {
      this.loadCells();
      this.loadUser();
    }
  }

  // shouldComponentUpdate(nextProps){
  //   thenewroom = this.state.current
  // }

  //  CDU is not passing to fire LOADMOVE so the state is not getting updated to change cell COORDS
  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.navFlag === true
  //     // prevProps.moveData.title !== this.props.moveData.title
  //   ) {
  //     this.setState({ navFlag: false });
  //     this.loadMove();
  //   }
  // }
  //   if (this.props.moveData) {
  //     if (
  //       this.state.currentRoom !== prevState.currentRoom &&
  //       prevState.currentRoom.length !== 0
  //       // this.props.userData.current_room.id !== this.state.currentRoom.id
  //       // this.state.currentRoom !== prevState.currentRoom &&
  //       // this.props.moveData.current_room.length !== 0
  //       // this.props.userData.current_room.y !== prevState.currentRoom.y
  //     ) {
  //       this.loadMove();
  //     }
  //   }
  // }

  move = async (e, direction) => {
    e.preventDefault();
    this.setState({ isLoading: true });
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
        this.setState({ moveData: res.data });
        // this.setState({ navFlag: true });
        this.setState({ isLoading: false });
        console.log('Move Response', res.data);
      })

      .catch(err => {
        this.setState({ isLoading: false });
        console.log('CATCH from move', err);
      });
  };

  render() {
    const { cells, neighbors, currentRoom } = this.state;
    // console.log('GAMES props', this.props.roomData);
    // console.log('GAMES userdata:', this.props.userData.world_map.rooms[0]);
    // if (
    //   this.props.roomData.length &&
    //   this.props.userData.length &&
    //   this.props.moveData.length != 0
    // ) {
    //   console.log('games ROOMDATA___', this.props.roomData);
    //   console.log('games USERDATA___', this.props.userData);
    //   console.log('games moveData___', this.props.moveData);
    //   // console.log('games props', this.props.roomData[0].x);
    //   console.log('cells STATE___', this.state.currentRoom);
    //   console.log('moveData in GAMES______>>', this.props.moveData.length);
    // }

    // console.log('BIG BRAIN NAV FLAG____', this.state.navFlag);

    return (
      <div>
        {this.state.isLoading ? (
          <p>Is loading...</p>
        ) : (
          <Room moveData={this.state.moveData} />
        )}
        <div className='main-wrapper-app'>
          <h2>Navigation</h2>
          <button
            onClick={e => {
              this.move(e, 'n');
              // this.setState({ navFlag: true });
              // if (this.props.userData.currentRoom.id == )
              setTimeout(() => {
                this.loadMove();
              }, 500);
            }}>
            Move North
          </button>
          <button
            onClick={e => {
              this.move(e, 's');
              // this.setState({ navFlag: true });
              setTimeout(() => {
                this.loadMove();
              }, 500);
            }}>
            Move South
          </button>
          <button
            onClick={e => {
              this.move(e, 'e');
              // this.setState({ navFlag: true });
              setTimeout(() => {
                this.loadMove();
              }, 500);
            }}>
            Move East
          </button>
          <button
            onClick={e => {
              this.move(e, 'w');
              // this.setState({ navFlag: true });
              setTimeout(() => {
                this.loadMove();
              }, 500);
            }}>
            Move West
          </button>
        </div>
        <div
          className='Board'
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}>
          {cells.map(cell => (
            <Cell
              x={cell.x}
              y={cell.y}
              key={`${cell.x},${cell.y}`}
              // currentRoom={currentRoom}
            />
          ))}
          {/* {neighbors.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))} */}
          {currentRoom.map(cell => (
            <Currentcell
              x={cell.x}
              y={cell.y}
              key={`${cell.x},${cell.y}`}
              // userData={this.props.userData}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Games;
