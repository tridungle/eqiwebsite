import React, { Component } from "react";
import logo2 from "../images/logo2.png";

export default class Topbar extends Component {
  render() {
    return (
      <div class="topBar" style={{ opacity: this.props.opacity }}>
        <div class="d-flex align-items-center">
          <img
            onClick={() =>
              this.props.changeStatusAndLoader(undefined, undefined)
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
    );
  }
}
