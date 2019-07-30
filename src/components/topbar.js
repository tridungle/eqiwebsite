import React, { Component } from "react";
import FadeIn from "react-fade-in";
import logo2 from "../images/logo2.png";

export default class Topbar extends Component {
  render() {
    return (
      <FadeIn>
        <div class="topBar" style={{ opacity: this.props.opacity }}>
          <div class="d-flex align-items-center">
            <img
              onClick={() =>
                this.setState({ status: undefined, loader: undefined })
              }
              src={logo2}
              alt="logo"
              width={45}
              style={{
                margin: 0,
                padding: 0,
                cursor: "pointer",
                opacity: this.props.opacity
              }}
            />
          </div>
        </div>
      </FadeIn>
    );
  }
}
