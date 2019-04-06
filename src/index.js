import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//     render() {
//       return (
//         //v1
//         // <button className="square" onClick={function() { alert('click'); }}>

//         //v2
//         // <button className="square" onClick={() => alert('click') }>
//         // {this.props.value}
//         // </button>

//         //v3
//         // <button 
//         //     className="square" 
//         //     //v2.1 
//         //     // onClick={() => this.setState({value: 'X'})}
//         //     onClick={() => this.props.onClick()}
//         // >
//         //     //v2.1
//         //     {/* {this.state.value} */}
//         //     {this.props.value}
//         // </button>
//       );
//     }
//   }

  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
    );
  }
  
  class Board extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
          };
      }

    // //v1  
    // handleClick(i) {
    //     const squares = this.state.squares.slice();
    //     squares[i] = 'X';
    //     this.setState({squares: squares});
    // }  

    // //v2
    // handleClick(i) {
    //   const squares = this.state.squares.slice();
    //   squares[i] = this.state.xIsNext ? 'X' : 'O';
    //   this.setState({
    //     squares: squares,
    //     xIsNext: !this.state.xIsNext,
    //   });
    // }
    
    //v3
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }

    renderSquare(i) {
    //   return <Square value={i} />;
      return (
        <Square 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      // //v1
      // const status = 'Next player: X';

      // //v2
      // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

      //v3
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

//   class ShoppingList extends React.Component {
//     render() {
//         return (
//             <div className="shopping-list">
//                 <h1>Shopping List for {this.props.name}</h1>
//                     <ul>
//                         <li>Instagram</li>
//                         <li>WhatsApp</li>
//                         <li>Oculus</li>
//                     </ul>
//             </div>
//         );
//     }
//   }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    // <ShoppingList />,
    document.getElementById('root')
  );
  