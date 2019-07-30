import React, { Component } from "react";
import logo2 from "../images/logo2.png";

export default class Topbar extends Component {
  render() {
    return (
      <div class="topBar" style={{ opacity: this.props.opacity }}>
        <div class="d-flex align-items-center justify-content-center text-center">
          <img
            /*onClick={() =>
              this.props.changeStatusAndLoader(undefined, undefined)
            }*/
            src={logo2}
            alt="logo"
            width={45}
            style={{
              position: "absolute",
              top: "7px",
              left: "7px",
              margin: 0,
              padding: 0,
              //cursor: "pointer",
              opacity: this.props.opacity
            }}
          />
          {this.props.selectedCityTitle === "Predicamentor" ? (
            <p
              style={{
                margin: 0,
                padding: 0,
                fontSize: "12px",
                fontWeight: "bold",
                color: "transparent"
              }}
            >
              {this.props.selectedCityTitle}
            </p>
          ) : (
            <p
              style={{
                margin: 0,
                padding: 0,
                fontSize: "12px",
                fontWeight: "bold",
                color: "white"
              }}
            >
              {this.props.selectedCityTitle}
            </p>
          )}
        </div>
      </div>
    );
  }
}
