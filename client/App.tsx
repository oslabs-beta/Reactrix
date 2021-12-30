import * as React from 'react';
// import HomeContainer from './containers/HomeContainer.jsx';
// import Login from './components/Login.jsx';

// any allows the use of any value as the property & state object
// not useful in type checking, but appeases compiler
// export class App extends React.Component<any, any> {
// // class App extends Component {
//   constructor() {
//     super();
//   }

//   render() {
//     return(
//       <div className='background'>
//         <div>
//           <h1>App rendering</h1>
//           {/* <HomeContainer/> */}
//         </div>
//       </div>
//     );
//   }
// }

// // any allows the use of any value as the property or state object
// // not useful in type checking, but appeases compiler
// export class App extends React.Component<any, any>

export default function App(): JSX.Element {
  return (
    <div className='background'>
      <div>
        <h1>App rendering</h1>
          {/* <HomeContainer/> */}
      </div>
    </div>
  );
}

// export default App;