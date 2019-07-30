import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FadeIn from "react-fade-in";
import Topbar from "./topbar";
import Login from "./login";
import Predicamentor from "./predicamentor";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: undefined,
      loader: undefined
    };
  }
  render() {
    return (
      <div>
        {this.state.loader || this.state.status === "map" ? (
          <Topbar opacity={1} />
        ) : (
          <Topbar opacity={0} />
        )}
        {this.state.status !== "map" ? <Login /> : <Predicamentor />}
      </div>
    );
  }
}
