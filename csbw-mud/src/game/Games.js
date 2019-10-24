import React from 'react';

const CELL_SIZE = 54;
const WIDTH = 810;
const HEIGHT = 810;

class Cell extends React.Component {
  render() {
    const { x, y } = this.props;
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
    );
  }
}

class Games extends React.Component {
  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;

    this.board = this.makeEmptyBoard();
  }

  state = {
    cells: [{ x: 0, y: 3 }, { x: 0, y: 0 }],
    isRunning: false,
    interval: 100,
    rooms: [],
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

  // handleClick = event => {
  //   const elemOffset = this.getElementOffset();
  //   const offsetX = event.clientX - elemOffset.x;
  //   const offsetY = event.clientY - elemOffset.y;

  //   const x = Math.floor(offsetX / CELL_SIZE);
  //   const y = Math.floor(offsetY / CELL_SIZE);

  //   if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
  //     this.board[y][x] = !this.board[y][x];
  //   }

  //   this.setState({ cells: this.makeCells() });
  // };

  loadCells() {
    let cellsArr = [];

    this.props.roomData.map(room => {
      console.log('inside cdm', room.x);
      let x = room.x;
      let y = room.y;
      cellsArr.push({ x, y });
    });
    return this.setState({ cells: cellsArr });
  }

  componentDidMount() {
    if (this.props.roomData.length != 0) {
      this.loadCells();
    }
  }

  render() {
    const { cells, interval, isRunning } = this.state;
    // console.log('GAMES props', this.props.roomData);
    // console.log('GAMES userdata:', this.props.userData.world_map.rooms[0]);
    if (this.props.roomData.length != 0) {
      console.log('games full props', this.props.roomData);
      console.log('games props', this.props.roomData[0].x);
      console.log('cells STATE', this.state.cells);
    }
    return (
      <div>
        <div
          className='Board'
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}>
          {/* {/* // onClick={this.handleClick}
          // ref={n => { 
          //   this.boardRef = n;
          // }} */}
          {/* if cell.x === room.x && cell.y === room.y {
            <Cell 
          } */}
          {cells.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </div>

        {/* <div className="controls">
          Update every{" "}
          <input
            value={this.state.interval}
            onChange={this.handleIntervalChange}
          />{" "}
          msec
          {isRunning ? (
            <button className="button" onClick={this.stopGame}>
              Stop
            </button>
          ) : (
            <button className="button" onClick={this.runGame}>
              Run
            </button>
          )}
          <button className="button" onClick={this.handleRandom}>
            Random
          </button>
          <button className="button" onClick={this.handleClear}>
            Clear
          </button>
        </div> */}
      </div>
    );
  }
}

export default Games;
