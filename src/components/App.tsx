import React, { Component } from 'react'
import {connect} from "react-redux";
import {handleInitialData} from "../actions/shared";
import Dashboard from "./Dashboard";

class App extends Component<{dispatch: any, loading:any}> {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const msgContent = this.props.loading ? "Loading" : "Loaded";
    const msg = <p>{msgContent}</p>;
    return (
      <div>
        {msg}
        <Dashboard></Dashboard>
      </div>
    )
  }
}

function mapStateToProps(state:any){
  return {
    loading: !state.authedUser
  }
}

export default connect(mapStateToProps)(App);