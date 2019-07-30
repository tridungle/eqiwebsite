import React, { Component } from "react";
import logo from "./logo.png";
import logo2 from "./logo2.png";
import "bootstrap/dist/css/bootstrap.css";
import FadeIn from "react-fade-in";
import ScrollAnimation from "react-animate-on-scroll";
import Lottie from "react-lottie";
import * as animationData from "./pulse.json";
import * as animationData2 from "./check.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: animationData2.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: undefined,
      loader: undefined
    };
  }
  render() {
    if (this.state.loader === "first") {
      setTimeout(
        function() {
          this.setState({ loader: "second" });
        }.bind(this),
        3000
      );
    }
    if (this.state.loader === "second") {
      setTimeout(
        function() {
          this.setState({ loader: undefined, status: "map" });
        }.bind(this),
        860
      );
    }
    return (
      <div>
        {this.state.loader || this.state.status === "map" ? (
          <FadeIn>
            <div class="topBar">
              <div class="d-flex align-items-center">
                <img
                  onClick={() =>
                    this.setState({ status: undefined, loader: undefined })
                  }
                  src={logo2}
                  alt="logo"
                  width={45}
                  style={{ margin: 0, padding: 0, cursor: "pointer" }}
                />
              </div>
            </div>
          </FadeIn>
        ) : (
          <div class="topBar" style={{ opacity: 0 }}>
            <div class="d-flex align-items-center">
              <img
                src={logo2}
                alt="logo"
                width={45}
                style={{ margin: 0, padding: 0, opacity: 0 }}
              />
            </div>
          </div>
        )}
        {this.state.status !== "map" ? (
          <div>
            <div class="content">
              <ScrollAnimation
                offset={500}
                duration={0.5}
                animateIn="fadeIn"
                animateOut="fadeOut"
              >
                <canvas id="3D-background-three-canvas5" />
                <div class="logo">
                  <FadeIn>
                    {!this.state.loader ? (
                      <div>
                        <img src={logo} alt="logo" />
                        <p class="mt-1">Early earthquake detection systems</p>
                      </div>
                    ) : null}
                    <div class="d-flex justify-content-center align-items-center text-center">
                      {this.state.status === "loading" ? (
                        <div>
                          <FadeIn>
                            <div
                              style={{ width: "250px" }}
                              class="d-flex justify-content-around align-items-center mt-4"
                            >
                              <h6
                                style={{
                                  color: "white",
                                  padding: 0,
                                  margin: 0
                                }}
                              >
                                Loading Predicamentor
                              </h6>
                              {this.state.loader === "first" ? (
                                <FadeIn>
                                  <Lottie options={defaultOptions} width={70} />
                                </FadeIn>
                              ) : (
                                <FadeIn>
                                  <Lottie
                                    options={defaultOptions2}
                                    width={70}
                                  />
                                </FadeIn>
                              )}
                            </div>
                          </FadeIn>
                        </div>
                      ) : (
                        <FadeIn>
                          <div class="mt-2">
                            <input
                              class="m-1 loginInput"
                              type="text"
                              placeholder="Username"
                            />
                            <br />
                            <input
                              class="m-1 loginInput"
                              type="text"
                              placeholder="Password"
                            />
                            <br />
                            <div
                              onClick={() =>
                                this.setState({
                                  status: "loading",
                                  loader: "first"
                                })
                              }
                              style={{
                                cursor: "pointer",
                                fontSize: "12px",
                                color: "white",
                                backgroundColor: "#c74740",
                                width: "200px",
                                padding: "5px !important"
                              }}
                              class="btn font-weight-bold mt-1"
                            >
                              Enter
                            </div>
                          </div>
                        </FadeIn>
                      )}
                    </div>
                  </FadeIn>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        ) : (
          <div style={{ color: "white" }} class="mt-5 text-center">
            <FadeIn>
              <h1>hello</h1>
            </FadeIn>
          </div>
        )}
      </div>
    );
  }
}
