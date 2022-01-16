import { withThemeCreator } from '@material-ui/styles';
import React, { Profiler } from 'react';
import { sendProfilerData } from '../helpers/helpers';

export default function Prototype() {
  return (
    <Profiler id="Prototype" onRender={sendProfilerData}>
      <div>
        <h1>Tic Tac Toe</h1>
        <BoardWrapper />
      </div>
    </Profiler>
  );
}

function BoardWrapper() {
  return (
    <Profiler id="BoardWrapper" onRender={sendProfilerData}>
      <div>
        <h5>Test</h5>
        <Board />
      </div>
    </Profiler>
  );
}

function Board(props: any) {
  const [text, setText] = React.useState([
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ]);
  const [turnX, setTurnX] = React.useState(true);

  const rows = text.map((text, i) => {
    return <Row key={i} rowNum={i} text={text} turnX={turnX} setText={setText} setTurnX={setTurnX} />;
  });

  React.useEffect(() => {
    const result = checkResults();
    if (result) {
      alert(result);
    }
  }, [text]);

  function checkResults() {
    const runs = [...text];
    for (let c = 0; c < 3; c++) {
      runs.push(text.map((row) => row[c]));
    }
    runs.push(text.map((row, i) => row[i]));
    runs.push(text.map((row, i) => row[2 - i]));
    for (let run of runs) {
      if (run.filter((x) => x === run[0]).length === 3) {
        if (run[0] === 'X') {
          return 'X wins';
        } else if (run[0] === 'O') {
          return 'O wins';
        }
      }
    }
    if (text.flat().filter((x) => x === '-').length === 0) {
      return 'Draw';
    };
    return;
  }

  return <div>{rows}</div>;
}

function Row(props: any) {
  const boxes = props.text.map((text: string, i: number) => <Box key={i} rowNum={props.rowNum} col={i} text={text} turnX={props.turnX} setText={props.setText} setTurnX={props.setTurnX} />);
  return <div>{boxes}</div>;
}

function Box(props: any) {
  const update = () => {
    if (props.text !== '-') {
      return;
    }
    let newChar = props.turnX ? 'X' : 'O';
    props.setTurnX(!props.turnX);
    props.setText((text: any) => {
      const newText = text.map((row: any) => [...row]);
      newText[props.rowNum][props.col] = newChar;
      return newText;
    });
  };
  return (
    <Profiler id='Box' onRender={sendProfilerData}>
      <button className="box" onClick={update}>
        {props.text}
      </button>
    </Profiler>
  );
}
