import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import NavMenu from "./components/NavMenu.jsx";
import Search from "./components/SearchBox.jsx";
import VodList from "./pages/VodList";
import Detail from './pages/Detail'
import Play from "./pages/Play";


class App extends Component {
  state = {
    VodList: []
  }
  render() {
    return (
      <div>
        {/* <NavMenu getVod={(list) => { this.setState({ VodList: list }) }}></NavMenu> */}
        <NavMenu></NavMenu>
        <Route path='/GreenBoyVideos/s' component={VodList}></Route>
        <Route path='/GreenBoyVideos/d' component={Detail}></Route>
        <Route path='/GreenBoyVideos/v' component={Play}></Route>
      </div>
    );
  }
}

export default App;