import React, { Component } from 'react';
// import HomeContainer from './containers/HomeContainer.jsx';
// import Login from './components/Login.jsx';
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className='background'>
        <div>
          <h1>App rendering</h1>
          {/* <HomeContainer/> */}
        </div>
      </div>
    );
  }
}

export default App;