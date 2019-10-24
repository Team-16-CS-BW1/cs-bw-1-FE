import React, { useState } from "react";

// const Cell = () => {
//   const { x, y } = this.props;
//   return (
//     <div
//       className="Cell"
//       style={{
//         left: `${CELL_SIZE * x + 1}px`,
//         top: `${CELL_SIZE * y + 1}px`,
//         width: `${CELL_SIZE - 1}px`,
//         height: `${CELL_SIZE - 1}px`
//       }}
//     />
//   );
// };

const Map = props => {
  //   const [mapState, setMapState] = useState({
  //       cells = [],
  //       board = makeEmptyBoard(),

  //   })
  const rows = 15;
  const columns = 15;
  const CELL_SIZE = 54;
  const WIDTH = 810;
  const HEIGHT = 810;

  const makeEmptyBoard = () => {
    let board = [];
    for (let y = 0; y < rows; y++) {
      board[y] = [];
      for (let x = 0; x < columns; x++) {
        board[y][x] = false;
      }
    }

    return board;
  };

  //   const makeCells = () => {
  //     let cells = [];
  //     for (let y = 0; y < rows; y++) {
  //       for (let x = 0; x < columns; x++) {
  //         if (mapState.board[y][x]) {
  //           cells.push({ x, y });
  //         }
  //       }
  //     }

  //     return cells;
  //   };

  return (
    <div className="map-container">
      <h2>Map Component</h2>
      <div
        className="Board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
        }}
      ></div>
    </div>
  );
};

export default Map;
