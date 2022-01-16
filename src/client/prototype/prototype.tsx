import React, { Component, Profiler } from 'react';
import { render } from 'react-dom';

export default function Prototype() {
  return (
    <Profiler id="Prototype" onRender={(
      id, // the "id" prop of the Profiler tree that has just committed
      phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
      actualDuration, // time spent rendering the committed update
      baseDuration, // estimated time to render the entire subtree without memoization
      startTime, // when React began rendering this update
      commitTime, // when React committed this update
      interactions // the Set of interactions belonging to this update
    ) => {
      // Aggregate or log render timings...
      console.log('this is id', id);
      console.log('this is phase', phase);
      console.log('this is actualDuration', actualDuration);
      console.log('this is baseDuration', baseDuration);
      console.log('this is startTime', startTime);
      console.log('this is commitTime', commitTime);
      console.log('this is interactions', interactions);
    }}>
    <div>
      <h1>Tic Tac Toe</h1>
      <BoardWrapper />
    </div>
    </Profiler>
  );
}

function BoardWrapper() {
  return(
    <div>
      <h5>Test</h5>
      <Board />
    </div>
  )
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
    }
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
    <button className="box" onClick={update}>
      {props.text}
    </button>
  );
}
